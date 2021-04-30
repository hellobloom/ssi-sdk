export type DocumentLoaderResult = {
  document: null | Record<string, unknown>
  documentUrl: string
}

export type DocumentLoader = (url: string) => Promise<DocumentLoaderResult> | DocumentLoaderResult
