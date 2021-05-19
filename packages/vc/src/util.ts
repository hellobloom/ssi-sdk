type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U }
  ? U
  : never

export type RemoveIndex<T extends Record<any, any>> = Pick<T, KnownKeys<T>>
