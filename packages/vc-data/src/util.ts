import { L, O } from 'ts-toolbelt'
import { VC, VCSubject, RemoveIndex } from '@bloomprotocol/vc'

export type SimpleThing = { '@type': string | string[] }
export type SimpleThingString = { '@type': string }

// Helpers For Creating Types

export type CreateThing<Type extends string, D extends Record<any, any> = Record<any, any>> = D & {
  '@type': Type
}

export type FlattenType<Extension extends SimpleThingString, Base extends SimpleThing> = L.Flatten<
  L.Concat<[Base['@type']], [Extension['@type']]>
>

export type ExpandType<Obj extends SimpleThing> = O.MergeUp<
  {
    '@type': Obj['@type'] extends string[] ? L.Concat<Obj['@type'], string[]> : Obj['@type'] | L.Concat<[Obj['@type']], string[]>
  },
  Obj
>

export type AddKeyPairs<Obj extends Record<string, any>> = Obj & {
  [key: string]: any
}

export type ExtendThing<Extension extends SimpleThingString, Base extends SimpleThing> = {
  '@type': FlattenType<Extension, Base>
} & MergeAndOmitType<Extension, Base>

export type ExpandThing<Thing extends SimpleThing> = AddKeyPairs<ExpandType<Thing>>

export type CreateExpandedThing<Type extends string, D extends Record<any, any> = Record<any, any>> = ExpandThing<CreateThing<Type, D>>

// Helpers For Creating Context

export const combineContextEntries = ({ entries }: { entries: Record<string, any>[] }) => {
  const combined: Record<string, any> = {}
  entries.forEach((entry) => {
    Object.keys(entry).forEach((type) => {
      const entryValue = entry[type]

      if (combined[type]) throw new Error(`Type ${type} is already defined in this context`)

      combined[type] = entryValue
    })
  })

  return combined
}

const vocabs = {
  schema: 'https://schema.org/',
  bloomSchema: 'https://schema.bloom.co/',
  fhir: 'http://hl7.org/fhir/',
}

type Vocab = keyof typeof vocabs

export const createContextEntry = <Extension extends SimpleThingString, Base extends Record<string, any> = SimpleThing>({
  type,
  typeIdBase,
  fields,
  vocab,
}: {
  type: Extension['@type']
  typeIdBase: Vocab
  fields: {
    [key in keyof ExcludeAndOmitType<Extension, Base>]-?: Vocab
  }
  vocab?: Vocab
}) => {
  const entry: Record<string, any> = {
    [type]: {
      '@id': `${vocabs[typeIdBase]}${type}`,
      '@context': {
        '@version': 1.1,
        '@protected': true,
        '@vocab': typeof vocab === 'undefined' ? null : vocabs[vocab],
      },
    },
  }

  if (Object.keys(fields).length > 0) {
    Object.keys(fields).forEach((_key) => {
      const key = _key as keyof ExcludeAndOmitType<Extension, Base>
      entry[type]['@context'][key] = `${vocabs[fields[key]]}${key}`
    })
  }

  return entry
}

export const createVCContextEntry = <V extends VC & { type: ['VerifiableCredential', string, ...string[]] }>({
  type,
  typeIdBase,
  vocab,
  entries,
}: {
  type: V['type'][1]
  typeIdBase: Vocab
  vocab?: Vocab
  entries: Record<string, any>[]
}) => {
  const entry: Record<string, any> = {
    [type]: {
      '@id': `${vocabs[typeIdBase]}${type}`,
      '@context': {
        '@version': 1.1,
        '@protected': true,
      },
    },
    data: {
      '@id': `${vocabs.bloomSchema}data`,
      '@context': [
        null,
        {
          '@version': 1.1,
          '@protected': true,
          '@vocab': typeof vocab === 'undefined' ? null : vocabs[vocab],

          ...combineContextEntries({ entries }),
        },
      ],
    },
  }

  return entry
}

// General Helpers

export type OneOrMore<Value> = Value | Value[]

export type ExtendableVCSubject<Data extends Record<string, any>> = VCSubject & {
  data: Data
}

type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [K in keyof T]: infer U }
  ? U
  : never

export type RemoveIndex2<T extends Record<any, any>> = Pick<T, KnownKeys<T>>

type RemoveIndex3<T> = {
  [P in keyof Required<T> as string extends P ? never : number extends P ? never : P]: T[P]
}

export type ExtendableVC2<Subject extends VCSubject | VCSubject[], Type extends string> = O.MergeUp<
  O.Exclude<RemoveIndex3<VC>, { type: any; credentialSubject: any }>,
  {
    type: ['VerifiableCredential', Type, ...string[]]
    credentialSubject: Subject extends any[] ? Subject : Subject | Subject[]
    [key: string]: unknown
  }
>

export type ExtendableVC<Subject extends VCSubject | VCSubject[], Type extends string> = Omit<
  RemoveIndex3<VC>,
  'credentialSubject' | 'type'
> & {
  type: ['VerifiableCredential', Type, ...string[]]
  credentialSubject: Subject extends any[] ? Subject : Subject | Subject[]
  [key: string]: unknown
}

export type OmitType<O0 extends Record<any, any>> = O.Exclude<O0, { '@type': any }>

export type MergeAndOmitType<O0 extends Record<any, any>, O1 extends Record<any, any>> = O.MergeUp<OmitType<O0>, OmitType<O1>>

export type ExcludeAndOmitType<O0 extends Record<any, any>, O1 extends Record<any, any>> = OmitType<
  O.Exclude<RemoveIndex<O0>, RemoveIndex<O1>>
>
