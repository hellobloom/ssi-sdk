## 0.1.6

- Create a new V2 pattern for defining VC types and constructing their contexts
  - The goal is to have building blocks of subjects and VC types to build dynamic VCs
  - For example instead of having a `PhoneAndEmailCredentialPersonVX` you can combine `PhoneCredentialPersonV2` and `EmailCredentialPersonV2`
- Add V2 of the following VC types
  - account
  - address
  - aml
  - dob
  - email
  - gender
  - iddocument
  - name
  - phone
  - identity

## 0.1.4

- Add optional availableValue property in MonetaryAmountRV1 to distinguish available vs. current balance in [@bloomprotocol/vc-data](https://www.npmjs.com/package/@bloomprotocol/vc-data) and add context entry for MonetaryAmount

## 0.1.3

- Upgrade to latest [@bloomprotocol/vc](https://www.npmjs.com/package/@bloomprotocol/vc)

## 0.1.2

- Upgrade to latest [@bloomprotocol/vc](https://www.npmjs.com/package/@bloomprotocol/vc)
  - Includes a fix for `RemoveIndex`

## 0.1.1

- `AMLPersonV1.hasAMLSearch` can now be a single search or an array searches

## 0.1.0

- Update to use [@bloomprotocol/vc](https://www.npmjs.com/package/@bloomprotocol/vc) as the backing VC model
  - Some TS types might be breaking but in general it should be a fairly simple upgrade

## 0.0.1

- Initial release
