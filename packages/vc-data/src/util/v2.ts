import { VC, RemoveIndex } from '@bloomprotocol/vc'
import { L, O } from 'ts-toolbelt'

export type OneOrMore<Value> = Value | Value[]

export type SimpleThing = { '@type': string | string[] }

export type SimpleThingString = { '@type': string }

type FilterShared<L0 extends ReadonlyArray<string>, L1 extends ReadonlyArray<string>> = L.Filter<L0, O.Keys<O.Invert<L.ObjectOf<L1>>>>

type RemoveAndPrependSharedTypes<
  First extends ReadonlyArray<string>,
  Second extends ReadonlyArray<string>,
  Shared extends ReadonlyArray<string>,
> = L.Flatten<L.Prepend<L.Concat<FilterShared<First, Shared>, FilterShared<Second, Shared>>, Shared>>

type ArrayifyType<T extends SimpleThing> = L.Flatten<L.Concat<[T['@type']], []>>

type Inner<First extends ReadonlyArray<string>, Second extends ReadonlyArray<string>> = RemoveAndPrependSharedTypes<
  First,
  Second,
  L.Intersect<First, Second, 'equals'>
>

type FlattenAndDedupeType<First extends SimpleThing, Second extends SimpleThing> = Inner<ArrayifyType<First>, ArrayifyType<Second>>

type OmitType<O0 extends Record<string, unknown>> = O.Omit<O0, '@type'>

export type MergeSubjects<S1 extends SimpleThing, S2 extends SimpleThing> = {
  '@type': FlattenAndDedupeType<S1, S2>
} & O.MergeUp<OmitType<S1>, OmitType<S2>>

export type PartialSubject<S extends SimpleThing> = {
  '@type': S['@type']
} & Partial<OmitType<S>>

export type CreateVCType<Types extends string[], S extends SimpleThing> = Omit<RemoveIndex<VC>, 'type' | 'credentialSubject'> & {
  type: ['VerifiableCredential', ...Types]
  credentialSubject: OneOrMore<{ data: S }>
  [key: string]: unknown
}

const compareSubjects = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  if (a['@id'] !== b['@id']) return false
  if (Object.keys(a).length !== Object.keys(b).length) return false

  const aContext: Record<string, unknown> = a['@context'] as any
  const bContext: Record<string, unknown> = b['@context'] as any
  if (!Object.keys(aContext).every((key) => Object.prototype.hasOwnProperty.call(bContext, key) && aContext[key] === bContext[key])) {
    return false
  }

  return true
}

const bases = {
  schema: 'https://schema.org/',
  bloomSchema: 'https://schema.bloom.co/',
  fhir: 'http://hl7.org/fhir/',
}

type Base = keyof typeof bases

export const createSubjectContext = <S extends SimpleThingString>({
  type,
  base,
  properties,
}: {
  type: S['@type']
  base: Base
  properties: { [key in O.Keys<OmitType<S>>]-?: Base }
}) => {
  const mappedProperties: Record<string, string> = {}
  Object.keys(properties).forEach((key) => {
    mappedProperties[key] = `${bases[properties[key as keyof OmitType<S>] as Base]}${key}`
  })

  return {
    [type]: {
      '@id': `${bases[base]}${type}`,
      '@context': {
        '@version': 1.1,
        '@protected': true,

        ...mappedProperties,
      },
    },
  }
}

export const createContextConfig = <T extends string>({
  type,
  subjects,
}: {
  type: T
  subjects: Record<string, Record<string, unknown>>[]
}) => {
  const mergedSubjects: Record<string, Record<string, unknown>> = {}

  subjects.forEach((subject) => {
    Object.keys(subject).forEach((type) => {
      const entryValue = subject[type]

      if (mergedSubjects[type] && !compareSubjects(mergedSubjects[type], entryValue)) {
        throw new Error(`Type ${type} is already defined in this context`)
      }

      mergedSubjects[type] = entryValue
    })
  })

  return {
    vc: {
      [type]: {
        '@id': `https://schema.bloom.co/${type}`,
        '@context': {
          '@version': 1.1,
          '@protected': true,
        },
      },
    },
    subject: mergedSubjects,
  }
}

export const createContext = (
  ...entires: { vc: Record<string, Record<string, unknown>>; subject: Record<string, Record<string, unknown>> }[]
) => {
  const subjects: Record<string, Record<string, unknown>> = {}
  const vcs: Record<string, Record<string, unknown>> = {}

  entires.forEach(({ subject, vc }) => {
    Object.keys(subject).forEach((type) => {
      const entryValue = subject[type]

      if (subjects[type] && !compareSubjects(subjects[type], entryValue)) {
        throw new Error(`Type ${type} is already defined in this context`)
      }

      subjects[type] = entryValue
    })

    Object.keys(vc).forEach((type) => {
      const entryValue = vc[type]

      if (vcs[type]) throw new Error(`Type ${type} is already defined in this context`)

      vcs[type] = entryValue
    })
  })

  return {
    ...vcs,
    data: {
      '@id': 'https://schema.bloom.co/data',
      '@context': [
        null,
        {
          '@version': 1.1,
          '@protected': true,

          ...subjects,
        },
      ],
    },
  }
}
