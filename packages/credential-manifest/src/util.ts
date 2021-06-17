import { JSONPath } from 'jsonpath-plus'

import { DisplayMappingObject } from '.'

type ParsedDisplayMappingObjectValue = string | number | boolean | undefined

export const parseDisplayMappingObject = (dmo: DisplayMappingObject, vc: any) => {
  let value: ParsedDisplayMappingObjectValue

  if (dmo.path) {
    for (let i = 0; i < dmo.path.length; i += 1) {
      const path = dmo.path[i]

      const result = JSONPath<unknown[]>({ path, json: vc })

      if (result.length === 1) {
        const item = result[0]
        if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
          value = item
          break
        }
      }
    }
  }

  if (typeof value === 'undefined' && dmo.text) {
    value = dmo.text
  }

  return value
}
