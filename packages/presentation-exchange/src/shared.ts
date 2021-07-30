import { VC } from '@bloomprotocol/vc'
import { JSONPath } from 'jsonpath-plus'
import Ajv, { ErrorObject as AjvErrorObject } from 'ajv'

import { Constraints, Field, InputDescriptor, Schema, SubmissionRequirementFrom, SubmissionRequirementFromNested } from './types'

export type ErrorObject<Type extends string, Data> = Data & {
  type: Type
}

type BaseResultSuccess<T> = T & {
  success: true
}

type BaseResultFailure<T> = T & {
  success: false
}

export type BaseResult<S, F> = BaseResultSuccess<S> | BaseResultFailure<F>

export type SatisfiesFieldError = ErrorObject<'notFound', {}> | ErrorObject<'filter', { errors?: null | AjvErrorObject[] }>

export type SatisfiesFieldResult = BaseResult<{}, { error: SatisfiesFieldError }>

const satisfiesField = (field: Field, vc: VC): SatisfiesFieldResult => {
  const path = field.path.find((path) => {
    const result = JSONPath({ path, json: vc })
    return Array.isArray(result) && result.length > 0
  })
  if (typeof path !== 'string') {
    return {
      success: false,
      error: {
        type: 'notFound',
      },
    }
  }

  if (field.filter) {
    const value = JSONPath({ path, json: vc })[0]

    const validate = new Ajv().compile(field.filter)

    if (!validate(value)) {
      return {
        success: false,
        error: {
          type: 'filter',
          errors: validate.errors,
        },
      }
    }
  }

  return {
    success: true,
  }
}

export type SatisfiesConstraintsError =
  | ErrorObject<'fields', { errors: { field: Field; error: SatisfiesFieldError }[] }>
  | ErrorObject<'unsupported', { property: string }>

export type SatisfiesConstraintsResult = BaseResult<{}, { error: SatisfiesConstraintsError }>

const satisfiesConstraints = (constraints: Constraints, vc: VC): SatisfiesConstraintsResult => {
  if (constraints.fields) {
    const failed: { field: Field; error: SatisfiesFieldError }[] = []

    constraints.fields.forEach((field) => {
      const result = satisfiesField(field, vc)

      if (!result.success) {
        failed.push({ field, error: result.error })
      }
    })

    if (failed.length > 0) {
      return {
        success: false,
        error: {
          type: 'fields',
          errors: failed,
        },
      }
    }
  }

  if (constraints.is_holder) {
    return {
      success: false,
      error: {
        type: 'unsupported',
        property: 'is_holder',
      },
    }
  }

  if (constraints.same_subject) {
    return {
      success: false,
      error: {
        type: 'unsupported',
        property: 'same_subject',
      },
    }
  }

  if (constraints.subject_is_issuer) {
    return {
      success: false,
      error: {
        type: 'unsupported',
        property: 'subject_is_issuer',
      },
    }
  }

  if (constraints.limit_disclosure) {
    return {
      success: false,
      error: {
        type: 'unsupported',
        property: 'limit_disclosure',
      },
    }
  }

  if (constraints.statuses) {
    return {
      success: false,
      error: {
        type: 'unsupported',
        property: 'statuses',
      },
    }
  }

  return {
    success: true,
  }
}

export type SatisfiesSchemaError = ErrorObject<'noSchema', {}> | ErrorObject<'noMatch', {}>

export type SatisfiesSchemaResult = BaseResult<{}, { error: SatisfiesSchemaError }>

export const satisfiesSchema = (schema: Schema, vc: VC): SatisfiesSchemaResult => {
  if (vc.credentialSchema) {
    const credentialSchema = Array.isArray(vc.credentialSchema) ? vc.credentialSchema : [vc.credentialSchema]

    const found = credentialSchema.some(({ id }) => id === schema.uri)

    if (!found && schema.required) {
      return { success: false, error: { type: 'noMatch' } }
    }

    return { success: true }
  }

  if (schema.required) {
    return { success: false, error: { type: 'noSchema' } }
  }

  return { success: true }
}

export type SatisfiesInputDescriptorError =
  | ErrorObject<'constraints', { error: SatisfiesConstraintsError }>
  | ErrorObject<'schema', { errors: { schema: Schema; error: SatisfiesSchemaError }[] }>

export type SatisfiesInputDescriptorResult = BaseResult<{}, { error: SatisfiesInputDescriptorError }>

export const satisfiesInputDescriptor = (inputDescriptor: InputDescriptor, vc: VC): SatisfiesInputDescriptorResult => {
  if (inputDescriptor.constraints) {
    const result = satisfiesConstraints(inputDescriptor.constraints, vc)

    if (!result.success) {
      return {
        success: false,
        error: {
          type: 'constraints',
          error: result.error,
        },
      }
    }
  }

  if (inputDescriptor.schema) {
    const failed: { schema: Schema; error: SatisfiesSchemaError }[] = []

    inputDescriptor.schema.forEach((schema) => {
      const result = satisfiesSchema(schema, vc)

      if (!result.success) {
        failed.push({ schema, error: result.error })
      }
    })

    if (failed.length > 0) {
      return {
        success: false,
        error: {
          type: 'schema',
          errors: failed,
        },
      }
    }
  }

  return {
    success: true,
  }
}

export const isSubmissionRequirementFrom = (sr: any): sr is SubmissionRequirementFrom => {
  return typeof sr.from === 'string'
}

export const isSubmissionRequirementFromNested = (sr: any): sr is SubmissionRequirementFromNested => {
  return typeof sr.from_nested === 'string'
}
