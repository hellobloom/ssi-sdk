import {
  SignOfferChallengeJWT,
  SignOfferResponseJWT,
  offerResponseJwtVerify,
  SignRequestChallengeJWT,
  SignRequestResponseJWT,
  requestResponseJwtVerify,
} from '.'
import { createSecretKey } from 'crypto'

const verifiablePresentation = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
  type: ['VerifiablePresentation', 'PresentationSubmission'],
  presentation_submission: {},
  verifiableCredential: [],
  proof: {},
}

const presentationDefinition = {
  input_descriptors: [
    {
      id: 'banking_input',
      name: 'Bank Account Information',
      purpose: 'We need your bank and account information.',
      schema: [
        {
          uri: 'https://bank-standards.com/customer.json',
        },
      ],
      constraints: {
        limit_disclosure: true,
        fields: [
          {
            path: ['$.issuer', '$.vc.issuer', '$.iss'],
            purpose: 'The claim must be from one of the specified issuers',
            filter: {
              type: 'string',
              pattern: 'did:example:123|did:example:456',
            },
          },
        ],
      },
    },
    {
      id: 'citizenship_input',
      name: 'US Passport',
      schema: [
        {
          uri: 'hub://did:foo:123/Collections/schema.us.gov/passport.json',
        },
      ],
      constraints: {
        fields: [
          {
            path: ['$.credentialSubject.birth_date', '$.vc.credentialSubject.birth_date', '$.birth_date'],
            filter: {
              type: 'string',
              format: 'date',
              minimum: '1999-5-16',
            },
          },
        ],
      },
    },
  ],
}

const credentialManifest = {
  locale: 'en-US',
  issuer: {
    id: 'did:example:123',
    name: 'Washington State Government',
    styles: {
      thumbnail: {
        uri: 'https://dol.wa.com/logo.png',
        alt: 'Washington State Seal',
      },
      hero: {
        uri: 'https://dol.wa.com/people-working.png',
        alt: 'People working on serious things',
      },
      background: {
        color: '#ff0000',
      },
      text: {
        color: '#d4d400',
      },
    },
  },
  output_descriptors: [
    {
      id: 'output_1',
      schema: {
        uri: 'https://schema.org/EducationalOccupationalCredential',
      },
      display: {
        title: {
          text: 'Washington State Driver License',
        },
        subtitle: {
          text: 'Class A, Commercial',
        },
        description: {
          text: 'License to operate a vehicle with a gross combined weight rating (GCWR) of 26,001 or more pounds, as long as the GVWR of the vehicle(s) being towed is over 10,000 pounds.',
        },
        properties: [
          {
            label: 'Organ Donor',
          },
        ],
      },
      styles: {
        thumbnail: {
          uri: 'https://dol.wa.com/logo.png',
          alt: 'Washington State Seal',
        },
        hero: {
          uri: 'https://dol.wa.com/happy-people-driving.png',
          alt: 'Happy people driving',
        },
        background: {
          color: '#ff0000',
        },
        text: {
          color: '#d4d400',
        },
      },
    },
  ],
  presentation_definition: presentationDefinition,
}

const callbackUrl = 'https://example.com'

const relyingPartySecret = new Uint8Array(32)
const relyingPartySecretKL = createSecretKey(relyingPartySecret)
const userSecret = new Uint8Array(32)
const userSecretKL = createSecretKey(userSecret)

const relyingPartyId = 'urn:example:relying-party'
const userId = 'urn:example:user'

test('Offer Flow', async () => {
  const challengeString = await new SignOfferChallengeJWT({
    callbackUrl,
    credential_manifest: credentialManifest,
    version: '1',
  })
    .setJti('1234')
    .setIssuer(relyingPartyId)
    .setAudience(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(relyingPartySecretKL)

  const responseString = await new SignOfferResponseJWT({
    challenge: challengeString,
    verifiable_presentation: verifiablePresentation,
  })
    .setIssuer(userId)
    .setAudience(relyingPartyId)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(userSecretKL)

  const { response, challenge } = await offerResponseJwtVerify(
    responseString,
    {
      key: userSecret,
    },
    {
      key: relyingPartySecret,
    },
  )

  expect('purpose' in challenge.payload).toBeTruthy()
  expect(challenge.payload.purpose).toEqual('offer')

  expect('callbackUrl' in challenge.payload).toBeTruthy()
  expect(challenge.payload.callbackUrl).toEqual(callbackUrl)

  expect('credential_manifest' in challenge.payload).toBeTruthy()
  expect(challenge.payload.credential_manifest).toEqual(credentialManifest)

  expect('challenge' in response.payload).toBeTruthy()
  expect(response.payload.challenge).toEqual(challengeString)
})

test('Request Flow', async () => {
  const challengeString = await new SignRequestChallengeJWT({
    callbackUrl,
    presentation_definition: presentationDefinition,
    version: '1',
  })
    .setJti('1234')
    .setIssuer(relyingPartyId)
    .setAudience(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(relyingPartySecretKL)

  const responseString = await new SignRequestResponseJWT({
    challenge: challengeString,
    verifiable_presentation: verifiablePresentation,
  })
    .setIssuer(userId)
    .setAudience(relyingPartyId)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(userSecretKL)

  const { response, challenge } = await requestResponseJwtVerify(
    responseString,
    {
      key: userSecret,
    },
    {
      key: relyingPartySecret,
    },
  )

  expect('purpose' in challenge.payload).toBeTruthy()
  expect(challenge.payload.purpose).toEqual('request')

  expect('callbackUrl' in challenge.payload).toBeTruthy()
  expect(challenge.payload.callbackUrl).toEqual(callbackUrl)

  expect('presentation_definition' in challenge.payload).toBeTruthy()
  expect(challenge.payload.presentation_definition).toEqual(presentationDefinition)

  expect('challenge' in response.payload).toBeTruthy()
  expect(response.payload.challenge).toEqual(challengeString)
})
