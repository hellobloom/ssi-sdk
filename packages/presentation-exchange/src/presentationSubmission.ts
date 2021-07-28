import { VC } from '@bloomprotocol/vc'
import { JSONPath } from 'jsonpath-plus'

import { isSubmissionRequirementFrom, satisfiesInputDescriptor } from './shared'
import {
  DescriptorMapItem,
  InputDescriptor,
  PresentationDefinition,
  PresentationSubmission,
  SubmissionRequirement,
  SubmissionRequirementFrom,
  SubmissionRequirementFromNested,
} from './types'

type BaseResultSuccess<T> = T & {
  success: true
}

type BaseResultFailure<T> = T & {
  success: false
}

type BaseResult<S, F> = BaseResultSuccess<S> | BaseResultFailure<F>

type ProcessPathResult = BaseResult<{ vc: VC }, { error: string }>

const processPath = (item: DescriptorMapItem, json: Record<string, unknown>): ProcessPathResult => {
  if (['jwt', 'jwt_vc', 'jwt_vp'].indexOf(item.format) > 0) {
    return {
      success: false,
      error: 'Only ldp* items are supported',
    }
  }

  const result = JSONPath({ path: item.path, json })
  if (!Array.isArray(result)) {
    return {
      success: false,
      error: 'Expected JSONPath result to be an array',
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

type ProcessDescriptorMapResult = BaseResult<
  { submittedVCs: { id: string; vc: VC; inputDescriptor: InputDescriptor }[] },
  { errors: { id: string; error: string }[] }
>

const processDescriptorMap = (
  presentationSubmission: PresentationSubmission,
  presentationDefinition: PresentationDefinition,
): ProcessDescriptorMapResult => {
  const failed: { id: string; error: string }[] = []
  const success: { id: string; vc: VC; inputDescriptor: InputDescriptor }[] = []

  presentationSubmission.presentation_submission.descriptor_map.forEach((item) => {
    const inputDescriptor = presentationDefinition.input_descriptors.find(({ id }) => id === item.id)

    if (!inputDescriptor) {
      return failed.push({
        id: item.id,
        error: 'Could not find Input Descriptor for item',
      })
    }

    const result = processPath(item, presentationSubmission)

    if (!result.success) {
      return failed.push({
        id: item.id,
        error: result.error,
      })
    }

    const { vc } = result

    if (!satisfiesInputDescriptor(inputDescriptor, vc)) {
      return failed.push({
        id: item.id,
        error: 'VC does not satisfy input descriptor',
      })
    }

    return success.push({
      id: item.id,
      inputDescriptor,
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
    submittedVCs: success,
  }
}

type SatisfiesSubmissionRequirementFromResult = BaseResult<{}, { error: string }>

const satisfiesSubmissionRequirementFrom = (
  submissionRequirement: SubmissionRequirementFrom,
  inputDescriptors: InputDescriptor[],
  submittedVCs: { vc: VC; inputDescriptor: InputDescriptor }[],
): SatisfiesSubmissionRequirementFromResult => {
  const { from } = submissionRequirement
  const idsForSr = inputDescriptors.filter(({ group }) => group?.includes(from))

  const result = idsForSr.filter(({ id }) => submittedVCs.findIndex(({ inputDescriptor }) => id === inputDescriptor.id) >= 0)

  if (submissionRequirement.rule === 'all') {
    if (result.length < idsForSr.length) {
      return {
        success: false,
        error: 'Not all submission requirements are met',
      }
    }
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement

    if (count && count !== result.length) {
      return {
        success: false,
        error: `Expected ${count}, recieved ${result.length}`,
      }
    }

    if (min && min > result.length) {
      return {
        success: false,
        error: `Expected at least ${min}, recieved ${result.length}`,
      }
    }

    if (max && max < result.length) {
      return {
        success: false,
        error: `Expected no more than ${max}, recieved ${result.length}`,
      }
    }
  }

  return { success: true }
}

type SatisfiesSubmissionRequirementFromNestedResult = BaseResult<{}, { error: string }>

const satisfiesSubmissionRequirementFromNested = (
  submissionRequirement: SubmissionRequirementFromNested,
  inputDescriptors: InputDescriptor[],
  submittedVCs: { vc: VC; inputDescriptor: InputDescriptor }[],
): SatisfiesSubmissionRequirementFromNestedResult => {
  const { from_nested: fromNested } = submissionRequirement

  const result = fromNested.filter((sr: SubmissionRequirement) => {
    if (isSubmissionRequirementFrom(sr)) {
      return satisfiesSubmissionRequirementFrom(sr, inputDescriptors, submittedVCs).success
    }

    return satisfiesSubmissionRequirementFromNested(sr, inputDescriptors, submittedVCs).success
  })

  if (submissionRequirement.rule === 'all') {
    if (result.length !== fromNested.length) {
      return {
        success: false,
        error: 'Not all submission requirements are met',
      }
    }
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement

    if (count && count !== result.length) {
      return {
        success: false,
        error: `Expected ${count}, recieved ${result.length}`,
      }
    }

    if (min && min > result.length) {
      return {
        success: false,
        error: `Expected at least ${min}, recieved ${result.length}`,
      }
    }

    if (max && max < result.length) {
      return {
        success: false,
        error: `Expected no more than ${max}, recieved ${result.length}`,
      }
    }
  }

  return { success: true }
}

type SatisfiesPresentationDefinitionResult = BaseResult<
  {},
  {
    error?: string
    missingInputDescriptorError?: { id: string }[]
    decriptorMapItemErrors?: { id: string; error: string }[]
    submissionRequirementErrors?: string[]
  }
>

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
      error: `Mismatched Presentation Definition IDs. Expected: ${presentationDefinition.id}, recieved: ${presentationSubmission.presentation_submission.definition_id}`,
    }
  }

  const processDescriptorMapResult = processDescriptorMap(presentationSubmission, presentationDefinition)

  if (!processDescriptorMapResult.success) {
    return {
      success: false,
      decriptorMapItemErrors: processDescriptorMapResult.errors,
    }
  }

  if (presentationDefinition.submission_requirements) {
    const { submittedVCs } = processDescriptorMapResult
    const { input_descriptors: inputDescriptors } = presentationDefinition

    const submissionRequirementErrors: string[] = []

    presentationDefinition.submission_requirements.forEach((submissionRequirement) => {
      let result

      if (isSubmissionRequirementFrom(submissionRequirement)) {
        result = satisfiesSubmissionRequirementFrom(submissionRequirement, inputDescriptors, submittedVCs)
      } else {
        result = satisfiesSubmissionRequirementFromNested(submissionRequirement, inputDescriptors, submittedVCs)
      }

      if (!result.success) submissionRequirementErrors.push(result.error)
    })

    if (submissionRequirementErrors.length > 0) {
      return {
        success: false,
        submissionRequirementErrors,
      }
    }
  } else {
    const { submittedVCs } = processDescriptorMapResult
    const { input_descriptors: inputDescriptors } = presentationDefinition

    if (submittedVCs.length !== inputDescriptors.length) {
      const missing = inputDescriptors
        .filter(({ id }) => submittedVCs.findIndex((submittedVC) => submittedVC.id === id) < 0)
        .map(({ id }) => ({ id }))

      return {
        success: false,
        missingInputDescriptorError: missing,
      }
    }
  }

  return {
    success: true,
  }
}
