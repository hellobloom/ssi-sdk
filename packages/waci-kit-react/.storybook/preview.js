export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['qr', 'button', undefined]
      },
    },
    data: {
      control: {
        type: 'object',
      },
    },
    qrProps: {
      control: {
        type: 'object',
      },
    },
    buttonProps: {
      control: {
        type: 'object',
      },
    },
  },
  options: {
    storySort: {
      order: ['WACI', ['Default']]
    }
  }
};
