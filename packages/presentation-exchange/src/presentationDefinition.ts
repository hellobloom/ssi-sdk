import { VC } from '@bloomprotocol/vc'

import { InputDescriptor, SubmissionRequirement, SubmissionRequirementFrom, SubmissionRequirementFromNested } from './types'

import { satisfiesInputDescriptor, isSubmissionRequirementFrom } from './shared'

export const findVCsForInputDescriptor = (inputDescriptor: InputDescriptor, vcs: VC[]) => {
  return vcs.filter((vc) => satisfiesInputDescriptor(inputDescriptor, vc).success)
}

type SatisfiedBy = {
  inputDescriptor: InputDescriptor
  vcs: VC[]
}

type FindVCsForSubmissionRequirementFromResult = {
  submissionRequirement: SubmissionRequirementFrom
  satisfiedBy: SatisfiedBy[]
}

const findVCsForSubmissionRequirementFrom = (
  submissionRequirement: SubmissionRequirementFrom,
  inputDescriptors: InputDescriptor[],
  vcs: VC[],
): FindVCsForSubmissionRequirementFromResult => {
  const { from } = submissionRequirement

  return {
    submissionRequirement,
    satisfiedBy: inputDescriptors
      .filter((inputDescriptor) => inputDescriptor.group?.includes(from))
      .map((inputDescriptor) => {
        const vcsForInputDescriptor = findVCsForInputDescriptor(inputDescriptor, vcs)

        return { inputDescriptor, vcs: vcsForInputDescriptor }
      }),
  }
}

type FindVCsForSubmissionRequirementFromNestedResult = {
  submissionRequirement: SubmissionRequirementFromNested
  satisfiedBy: (FindVCsForSubmissionRequirementFromResult | FindVCsForSubmissionRequirementFromNestedResult)[]
}

const findVCsForSubmissionRequirementFromNested = (
  submissionRequirement: SubmissionRequirementFromNested,
  inputDescriptors: InputDescriptor[],
  vcs: VC[],
): FindVCsForSubmissionRequirementFromNestedResult => {
  return {
    submissionRequirement,
    satisfiedBy: submissionRequirement.from_nested.map((sr) => {
      if (isSubmissionRequirementFrom(sr)) {
        return findVCsForSubmissionRequirementFrom(sr, inputDescriptors, vcs)
      }

      return findVCsForSubmissionRequirementFromNested(sr, inputDescriptors, vcs)
    }),
  }
}

export const isFindVCsForSubmissionRequirementFromResult = (result: any): result is FindVCsForSubmissionRequirementFromResult => {
  return Array.isArray(result.satisfiedBy) && Array.isArray(result.satisfiedBy[0].vcs)
}

export const isFindVCsForSubmissionRequirementFromNestedResult = (
  result: any,
): result is FindVCsForSubmissionRequirementFromNestedResult => {
  return Array.isArray(result.satisfiedBy) && Array.isArray(result.satisfiedBy[0].satisfiedBy)
}

export type FindVCsForSubmissionRequirementResult =
  | FindVCsForSubmissionRequirementFromNestedResult
  | FindVCsForSubmissionRequirementFromResult

export const findVCsForSubmissionRequirement = ({
  submissionRequirement,
  inputDescriptors,
  vcs,
}: {
  submissionRequirement: SubmissionRequirement
  inputDescriptors: InputDescriptor[]
  vcs: VC[]
}): FindVCsForSubmissionRequirementResult => {
  if (isSubmissionRequirementFrom(submissionRequirement)) {
    return findVCsForSubmissionRequirementFrom(submissionRequirement, inputDescriptors, vcs)
  }

  return {
    submissionRequirement,
    satisfiedBy: submissionRequirement.from_nested.map((sr) => {
      if (isSubmissionRequirementFrom(sr)) {
        return findVCsForSubmissionRequirementFrom(sr, inputDescriptors, vcs)
      }

      return findVCsForSubmissionRequirementFromNested(sr, inputDescriptors, vcs)
    }),
  }
}
