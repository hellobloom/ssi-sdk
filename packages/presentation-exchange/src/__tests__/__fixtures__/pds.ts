export const fromAll = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    { name: 'Contact Information', purpose: 'We need you to provide all forms of contact information.', rule: 'all', from: 'A' },
  ],
}

export const fromPickCount = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide a single piece of contact information.',
      rule: 'pick',
      count: 1,
      from: 'A',
    },
  ],
}

export const fromPickMin = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    { name: 'Contact Information', purpose: 'We need you to provide at least two forms of contact.', rule: 'pick', min: 2, from: 'A' },
  ],
}

export const fromPickMax = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    { name: 'Contact Information', purpose: 'We need you to provide no more than 3 forms of contact.', rule: 'pick', max: 3, from: 'A' },
  ],
}

export const fromPickMinMax = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide some contact information, at least one but no more than 3.',
      rule: 'pick',
      min: 1,
      max: 3,
      from: 'A',
    },
  ],
}

export const fromNestedAll = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['B'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide some contact information, one physical and two electronic.',
      rule: 'all',
      from_nested: [
        {
          name: 'Electronic Contact Information',
          purpose: 'We need two pieces of electronic contact information.',
          rule: 'pick',
          count: 2,
          from: 'A',
        },
        {
          name: 'Physical Contact Information',
          purpose: 'We need one piece of phyical contact information.',
          rule: 'pick',
          count: 1,
          from: 'B',
        },
      ],
    },
  ],
}

export const fromNestedPickCount = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['B'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide some contact information, either one physical or two electronic.',
      rule: 'pick',
      count: 1,
      from_nested: [
        {
          name: 'Electronic Contact Information',
          purpose: 'We need two pieces of electronic contact information.',
          rule: 'pick',
          count: 2,
          from: 'A',
        },
        {
          name: 'Physical Contact Information',
          purpose: 'We need one piece of phyical contact information.',
          rule: 'pick',
          count: 1,
          from: 'B',
        },
      ],
    },
  ],
}

export const fromNestedPickMin = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['B'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['C'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['D'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide at least two groups of contact information.',
      rule: 'pick',
      min: 2,
      from_nested: [
        { name: 'Email Address', purpose: 'We need all email information.', rule: 'all', from: 'A' },
        { name: 'Phone Number', purpose: 'We need all phone number information.', rule: 'all', from: 'B' },
        { name: 'Address', purpose: 'We need all address information.', rule: 'all', from: 'C' },
        { name: 'Google Account', purpose: 'We need all google account information.', rule: 'all', from: 'D' },
      ],
    },
  ],
}

export const fromNestedPickMax = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['B'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['C'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['D'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide no more than three groups of contact information.',
      rule: 'pick',
      max: 3,
      from_nested: [
        { name: 'Email Address', purpose: 'We need all email information.', rule: 'all', from: 'A' },
        { name: 'Phone Number', purpose: 'We need all phone number information.', rule: 'all', from: 'B' },
        { name: 'Address', purpose: 'We need all address information.', rule: 'all', from: 'C' },
        { name: 'Google Account', purpose: 'We need all google account information.', rule: 'all', from: 'D' },
      ],
    },
  ],
}

export const fromNestedPickMinMax = {
  id: '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors: [
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/EmailCredentialPersonV1' }],
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type EmailCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'EmailCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'email_input',
      schema: [{ uri: 'https://schema.bloom.co/PhoneCredentialPersonV1' }],
      group: ['B'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type PhoneCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'PhoneCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'address_input',
      schema: [{ uri: 'https://schema.bloom.co/AddressCredentialPersonV1' }],
      group: ['C'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AddressCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AddressCredentialPersonV1' } },
          },
        ],
      },
    },
    {
      id: 'google_account_input',
      schema: [{ uri: 'https://schema.bloom.co/AccountCredentialPersonV1' }],
      group: ['D'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Credential must be of type AccountCredentialPersonV1',
            filter: { type: 'array', items: { type: 'string' }, contains: { const: 'AccountCredentialPersonV1' } },
          },
          {
            path: ['$.credentialSubject.data.hasAccount.organization.name'],
            purpose: 'This account credential must be for a Google account',
            filter: { type: 'string', const: 'Google' },
          },
        ],
      },
    },
  ],
  submission_requirements: [
    {
      name: 'Contact Information',
      purpose: 'We need you to provide at least one but no more than three groups of contact information.',
      rule: 'pick',
      min: 1,
      max: 3,
      from_nested: [
        { name: 'Email Address', purpose: 'We need all email information.', rule: 'all', from: 'A' },
        { name: 'Phone Number', purpose: 'We need all phone number information.', rule: 'all', from: 'B' },
        { name: 'Address', purpose: 'We need all address information.', rule: 'all', from: 'C' },
        { name: 'Google Account', purpose: 'We need all google account information.', rule: 'all', from: 'D' },
      ],
    },
  ],
}
