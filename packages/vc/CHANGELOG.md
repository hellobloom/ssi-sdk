## 0.1.4

- Add the optional "credentialSchema" property to VC
## 0.1.3

- Loosen schema for "type" arrays
  - Now allows "VerifiableCredential"/"VerifiablePresentation" anywhere in the array instead of enforcing it as the first item

## 0.1.2

- Improve the `RemoveIndex` utility type
- Switch to `yarn` and add `resolutions` to package.json for some build dependencies

## 0.1.1

- Export a helper type `RemoveIndex`
  - This removes the extra index signature (`{[key: string]: unknown}`) type from a given type
- Make `VCSubject` a single item
  - `VC.credentialSubject` is still `VCSubject | VCSubject[]`

## 0.1.0

- Initial release
