import { VC } from '@bloomprotocol/vc'
import { JSONPath } from 'jsonpath-plus'

import { ErrorObject, BaseResult, isSubmissionRequirementFrom, satisfiesInputDescriptor, SatisfiesInputDescriptorError } from './shared'
import {
  DescriptorMapItem,
  InputDescriptor,
  PresentationDefinition,
  PresentationSubmission,
  SubmissionRequirement,
  SubmissionRequirementFrom,
  SubmissionRequirementFromNested,
} from './types'

type ProcessPathError =
  | ErrorObject<'invalidFormat', { id: string; expected: 'ldp*'; recieved: string }>
  | ErrorObject<'notFound', { id: string }>
  | ErrorObject<'unknown', { error: string }>

type ProcessPathResult = BaseResult<{ vc: VC }, { error: ProcessPathError }>

const processPath = (item: DescriptorMapItem, json: Record<string, unknown>): ProcessPathResult => {
  if (['jwt', 'jwt_vc', 'jwt_vp'].indexOf(item.format) > 0) {
    return {
      success: false,
      error: {
        type: 'invalidFormat',
        id: item.id,
        expected: 'ldp*',
        recieved: item.format,
      },
    }
  }

  const result = JSONPath({ path: item.path, json })
  if (!Array.isArray(result)) {
    return {
      success: false,
      error: {
        type: 'unknown',
        error: 'Expected JSONPath result to be an array',
      },
    }
  }

  if (result.length < 0) {
    return {
      success: false,
      error: {
        type: 'notFound',
        id: item.id,
      },
    }
  }

  if (item.path_nested) {
    const [nestedJson] = result
    return processPath(item.path_nested, nestedJson)
  }

  return {
    success: true,
    vc: result[0],
  }
}

type ProcessDescriptorMapItemError =
  | ErrorObject<'notFound', {}>
  | ErrorObject<'path', { error: ProcessPathError }>
  | ErrorObject<'inputDescriptor', { error: SatisfiesInputDescriptorError }>

type ProcessDescriptorMapResult = BaseResult<
  { configs: { vc: VC; id: string }[] },
  { errors: { id: string; error: ProcessDescriptorMapItemError }[] }
>

const processDescriptorMap = (
  presentationSubmission: PresentationSubmission,
  presentationDefinition: PresentationDefinition,
): ProcessDescriptorMapResult => {
  const failed: { id: string; error: ProcessDescriptorMapItemError }[] = []
  const success: { id: string; vc: VC }[] = []

  presentationSubmission.presentation_submission.descriptor_map.forEach((item) => {
    const inputDescriptor = presentationDefinition.input_descriptors.find(({ id }) => id === item.id)

    if (!inputDescriptor) {
      return failed.push({
        id: item.id,
        error: {
          type: 'notFound',
        },
      })
    }

    const processPathResult = processPath(item, presentationSubmission)

    if (!processPathResult.success) {
      return failed.push({
        id: item.id,
        error: {
          type: 'path',
          error: processPathResult.error,
        },
      })
    }

    const { vc } = processPathResult

    const satisfiesInputDescriptorResult = satisfiesInputDescriptor(inputDescriptor, vc)

    if (!satisfiesInputDescriptorResult.success) {
      return failed.push({
        id: item.id,
        error: {
          type: 'inputDescriptor',
          error: satisfiesInputDescriptorResult.error,
        },
      })
    }

    return success.push({
      id: item.id,
      vc,
    })
  })

  if (failed.length > 0) {
    return {
      success: false,
      errors: failed,
    }
  }

  return {
    success: true,
    configs: success,
  }
}

type SatisfiesSubmissionRequirementFromError =
  | ErrorObject<
      'all',
      {
        missing: string[]
      }
    >
  | ErrorObject<
      'pick',
      | { subtype: 'count'; expected: number; recieved: number }
      | { subtype: 'min'; minExpected: number; recieved: number }
      | { subtype: 'max'; maxExpected: number; recieved: number }
    >

type SatisfiesSubmissionRequirementFromResult = BaseResult<{}, { error: SatisfiesSubmissionRequirementFromError }>

const satisfiesSubmissionRequirementFrom = (
  submissionRequirement: SubmissionRequirementFrom,
  inputDescriptors: InputDescriptor[],
  configs: { vc: VC; id: string }[],
): SatisfiesSubmissionRequirementFromResult => {
  const { from } = submissionRequirement
  const idsForSr = inputDescriptors.filter(({ group }) => group?.includes(from))

  const result = idsForSr.filter(({ id }) => configs.findIndex((config) => id === config.id) >= 0)

  if (submissionRequirement.rule === 'all') {
    if (result.length < idsForSr.length) {
      const missing = idsForSr.filter(({ id }) => configs.findIndex((config) => config.id === id) < 0).map(({ id }) => id)

      return {
        success: false,
        error: {
          type: 'all',
          missing,
        },
      }
    }
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement

    if (count && count !== result.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'count',
          expected: count,
          recieved: result.length,
        },
      }
    }

    if (min && min > result.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'min',
          minExpected: min,
          recieved: result.length,
        },
      }
    }

    if (max && max < result.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'max',
          maxExpected: max,
          recieved: result.length,
        },
      }
    }
  }

  return { success: true }
}

type SatisfiesSubmissionRequirementFromNestedError =
  | ErrorObject<
      'all',
      {
        missing: {
          submissionRequirement: SubmissionRequirement
          error: SatisfiesSubmissionRequirementFromError | SatisfiesSubmissionRequirementFromNestedError
        }[]
      }
    >
  | ErrorObject<
      'pick',
      | { subtype: 'count'; expected: number; recieved: number }
      | { subtype: 'min'; minExpected: number; recieved: number }
      | { subtype: 'max'; maxExpected: number; recieved: number }
    >

type SatisfiesSubmissionRequirementFromNestedResult = BaseResult<{}, { error: SatisfiesSubmissionRequirementFromNestedError }>

const satisfiesSubmissionRequirementFromNested = (
  submissionRequirement: SubmissionRequirementFromNested,
  inputDescriptors: InputDescriptor[],
  configs: { vc: VC; id: string }[],
): SatisfiesSubmissionRequirementFromNestedResult => {
  const { from_nested: fromNested } = submissionRequirement

  const failed: {
    submissionRequirement: SubmissionRequirement
    error: SatisfiesSubmissionRequirementFromError | SatisfiesSubmissionRequirementFromNestedError
  }[] = []
  const success: { submissionRequirement: SubmissionRequirement }[] = []

  fromNested.forEach((sr: SubmissionRequirement) => {
    if (isSubmissionRequirementFrom(sr)) {
      const result = satisfiesSubmissionRequirementFrom(sr, inputDescriptors, configs)

      if (result.success) {
        success.push({ submissionRequirement: sr })
      } else {
        failed.push({ submissionRequirement: sr, error: result.error })
      }
    } else {
      const result = satisfiesSubmissionRequirementFromNested(sr, inputDescriptors, configs)

      if (result.success) {
        success.push({ submissionRequirement: sr })
      } else {
        failed.push({ submissionRequirement: sr, error: result.error })
      }
    }
  })

  if (submissionRequirement.rule === 'all') {
    if (success.length !== fromNested.length) {
      return {
        success: false,
        error: {
          type: 'all',
          missing: failed,
        },
      }
    }
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement

    if (count && count !== success.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'count',
          expected: count,
          recieved: success.length,
        },
      }
    }

    if (min && min > success.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'min',
          minExpected: min,
          recieved: success.length,
        },
      }
    }

    if (max && max < success.length) {
      return {
        success: false,
        error: {
          type: 'pick',
          subtype: 'max',
          maxExpected: max,
          recieved: success.length,
        },
      }
    }
  }

  return { success: true }
}

export type SatisfiesPresentationDefinitionError =
  | ErrorObject<'definitionIdMismatch', { expected: string; recieved: string }>
  | ErrorObject<'inputDescriptors', { missing: string[] }>
  | ErrorObject<'descriptorMap', { errors: { id: string; error: ProcessDescriptorMapItemError }[] }>
  | ErrorObject<
      'submissionRequirements',
      {
        errors: {
          submissionRequirement: SubmissionRequirement
          error: SatisfiesSubmissionRequirementFromError | SatisfiesSubmissionRequirementFromNestedError
        }[]
      }
    >

export type SatisfiesPresentationDefinitionResult = BaseResult<{}, { error: SatisfiesPresentationDefinitionError }>

export const satisfiesPresentationDefinition = ({
  presentationSubmission,
  presentationDefinition,
}: {
  presentationSubmission: PresentationSubmission
  presentationDefinition: PresentationDefinition
}): SatisfiesPresentationDefinitionResult => {
  if (presentationDefinition.id !== presentationSubmission.presentation_submission.definition_id) {
    return {
      success: false,
      error: {
        type: 'definitionIdMismatch',
        expected: presentationDefinition.id,
        recieved: presentationSubmission.presentation_submission.definition_id,
      },
    }
  }

  const processDescriptorMapResult = processDescriptorMap(presentationSubmission, presentationDefinition)

  if (!processDescriptorMapResult.success) {
    return {
      success: false,
      error: {
        type: 'descriptorMap',
        errors: processDescriptorMapResult.errors,
      },
    }
  }

  if (presentationDefinition.submission_requirements) {
    const { configs } = processDescriptorMapResult
    const { input_descriptors: inputDescriptors } = presentationDefinition

    const submissionRequirementErrors: {
      submissionRequirement: SubmissionRequirement
      error: SatisfiesSubmissionRequirementFromError | SatisfiesSubmissionRequirementFromNestedError
    }[] = []

    presentationDefinition.submission_requirements.forEach((submissionRequirement) => {
      let result

      if (isSubmissionRequirementFrom(submissionRequirement)) {
        result = satisfiesSubmissionRequirementFrom(submissionRequirement, inputDescriptors, configs)
      } else {
        result = satisfiesSubmissionRequirementFromNested(submissionRequirement, inputDescriptors, configs)
      }

      if (!result.success) submissionRequirementErrors.push({ submissionRequirement, error: result.error })
    })

    if (submissionRequirementErrors.length > 0) {
      return {
        success: false,
        error: {
          type: 'submissionRequirements',
          errors: submissionRequirementErrors,
        },
      }
    }
  } else {
    const { configs } = processDescriptorMapResult
    const { input_descriptors: inputDescriptors } = presentationDefinition

    if (configs.length !== inputDescriptors.length) {
      const missing = inputDescriptors.filter(({ id }) => configs.findIndex((config) => config.id === id) < 0).map(({ id }) => id)

      return {
        success: false,
        error: {
          type: 'inputDescriptors',
          missing,
        },
      }
    }
  }

  return {
    success: true,
  }
}
