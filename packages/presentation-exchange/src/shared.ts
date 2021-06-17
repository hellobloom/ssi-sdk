import { VC } from '@bloomprotocol/vc'
import { JSONPath } from 'jsonpath-plus'
import Ajv from 'ajv'

import { Constraints, Field, InputDescriptor, Schema, SubmissionRequirementFrom } from './types'

const satisfiesField = (field: Field, vc: VC) => {
  let pathValues = field.path.map((path) => {
    const result = JSONPath({ path, json: vc })
    if (!Array.isArray(result)) throw new Error('Expected JSONPath result to be an array.')
    return result[0]
  })

  if (field.filter) {
    const validate = new Ajv().compile(field.filter)

    pathValues = pathValues.filter((value) => validate(value))
  }

  if (pathValues.length <= 0) return false

  return true
}

const satisfiesConstraints = (constraints: Constraints, vc: VC) => {
  if (constraints.fields) {
    const result = constraints.fields.every((field) => satisfiesField(field, vc))

    if (!result) return false
  }

  if (constraints.is_holder) {
    throw new Error('constraints.is_holder is not supported')
  }

  if (constraints.same_subject) {
    throw new Error('constraints.same_subject is not supported')
  }

  if (constraints.subject_is_issuer) {
    throw new Error('constraints.subject_is_issuer is not supported')
  }

  if (constraints.limit_disclosure) {
    throw new Error('constraints.limit_disclosure is not supported')
  }

  if (constraints.statuses) {
    throw new Error('constraints.statuses is not supported')
  }

  return true
}

export const satisfiesSchema = (schema: Schema, vc: VC) => {
  if (vc.credentialSchema) {
    const credentialSchema = Array.isArray(vc.credentialSchema) ? vc.credentialSchema : [vc.credentialSchema]

    const found = credentialSchema.some(({ id }) => id === schema.uri)

    if (!found && schema.required) return false

    return true
  }

  if (schema.required) return false

  return true
}

export const satisfiesInputDescriptor = (inputDescriptor: InputDescriptor, vc: VC) => {
  if (inputDescriptor.constraints) {
    const result = satisfiesConstraints(inputDescriptor.constraints, vc)

    if (!result) return false
  }

  if (inputDescriptor.schema) {
    const result = inputDescriptor.schema.every((schema) => satisfiesSchema(schema, vc))

    if (!result) return false
  }

  return true
}

export const isSubmissionRequirementFrom = (sr: any): sr is SubmissionRequirementFrom => {
  return typeof sr.from === 'string'
}
