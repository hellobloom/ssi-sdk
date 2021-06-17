import { VC } from '@bloomprotocol/vc'
import { JSONPath } from 'jsonpath-plus'

import { isSubmissionRequirementFrom, satisfiesInputDescriptor } from './shared'
import {
  DescriptorMapItem,
  InputDescriptor,
  PresentationDefinition,
  PresentationSubmission,
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

  return result[0]
}

type ProcessDescriptorMapItemResult = BaseResult<{ id: string; vc: VC; inputDescriptor: InputDescriptor }, { id: string; error: string }>

type ProcessDescriptorMapResult = BaseResult<
  { submittedVCs: { id: string; vc: VC; inputDescriptor: InputDescriptor }[] },
  { errors: { id: string; error: string }[] }
>

const processDescriptorMap = (
  presentationSubmission: PresentationSubmission,
  presentationDefintion: PresentationDefinition,
): ProcessDescriptorMapResult => {
  const result = presentationSubmission.presentation_submission.descriptor_map.map<ProcessDescriptorMapItemResult>((item) => {
    const inputDescriptor = presentationDefintion.input_descriptors.find(({ id }) => id === item.id)

    if (!inputDescriptor) {
      return {
        success: false,
        id: item.id,
        error: 'Could not find Input Descriptor for item',
      }
    }

    const result = processPath(item, presentationSubmission)

    if (!result.success) {
      return {
        success: false,
        id: item.id,
        error: result.error,
      }
    }

    const { vc } = result

    if (!satisfiesInputDescriptor(inputDescriptor, vc)) {
      return {
        success: false,
        id: item.id,
        error: 'VC does not satisfy input descriptor',
      }
    }

    return {
      success: true,
      id: item.id,
      inputDescriptor,
      vc,
    }
  })

  const failed: { id: string; error: string }[] = []
  const success: { id: string; vc: VC; inputDescriptor: InputDescriptor }[] = []

  result.forEach((item) => {
    if (item.success) {
      success.push(item)
    } else {
      failed.push(item)
    }
  })

  if (failed.length > 0) {
    return {
      success: false,
      errors: failed.map(({ id, error }) => ({ id, error })),
    }
  }

  return {
    success: true,
    submittedVCs: success.map(({ id, inputDescriptor, vc }) => ({ id, inputDescriptor, vc })),
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

  if (submissionRequirement.rule === 'all') {
    const result = idsForSr.every(({ id }) => {
      const found = submittedVCs.findIndex(({ inputDescriptor }) => id === inputDescriptor.id)
      return found >= 0
    })

    if (!result) {
      return {
        success: false,
        error: 'Not all submission requirements are met',
      }
    }
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement
    const result = idsForSr.filter(({ id }) => submittedVCs.findIndex(({ inputDescriptor }) => id === inputDescriptor.id) >= 0)

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

  const found = fromNested.filter((sr) => {
    if (isSubmissionRequirementFrom(sr)) {
      return satisfiesSubmissionRequirementFrom(sr, inputDescriptors, submittedVCs).success
    }

    return satisfiesSubmissionRequirementFromNested(sr, inputDescriptors, submittedVCs).success
  })

  if (submissionRequirement.rule === 'all') {
    if (fromNested.length !== found.length) throw new Error('')
  } else if (submissionRequirement.rule === 'pick') {
    const { count, min, max } = submissionRequirement
    if (count && count !== found.length) {
      return {
        success: false,
        error: `Expected ${count}, recieved ${found.length}`,
      }
    }

    if (min && min > found.length) {
      return {
        success: false,
        error: `Expected at least ${min}, recieved ${found.length}`,
      }
    }

    if (max && max < found.length) {
      return {
        success: false,
        error: `Expected no more than ${max}, recieved ${found.length}`,
      }
    }
  }

  return { success: true }
}

type SatisfiesPresentationDefinitionResult = BaseResult<{}, { decriptorMapItemErrors?: { id: string; error: string }[]; error?: string[] }>

export const satisfiesPresentationDefinition = ({
  presentationSubmission,
  presentationDefintion,
}: {
  presentationSubmission: PresentationSubmission
  presentationDefintion: PresentationDefinition
}): SatisfiesPresentationDefinitionResult => {
  if (presentationDefintion.id !== presentationSubmission.presentation_submission.definition_id) {
    return {
      success: false,
      error: [''],
    }
  }

  const processDescriptorMapResult = processDescriptorMap(presentationSubmission, presentationDefintion)

  if (!processDescriptorMapResult.success) {
    return {
      success: false,
      error: [''],
    }
  }

  if (presentationDefintion.submission_requirements) {
    const { submittedVCs } = processDescriptorMapResult
    const { input_descriptors: inputDescriptors } = presentationDefintion
    const result = presentationDefintion.submission_requirements.every((submissionRequirement) => {
      if (isSubmissionRequirementFrom(submissionRequirement)) {
        return satisfiesSubmissionRequirementFrom(submissionRequirement, inputDescriptors, submittedVCs).success
      }
      return satisfiesSubmissionRequirementFromNested(submissionRequirement, inputDescriptors, submittedVCs).success
    })

    if (!result) {
      return {
        success: false,
        error: [''],
      }
    }
  }

  return {
    success: true,
  }
}
