import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WACIElement, WACIElementProps } from '../../src';

const meta: Meta = {
  title: 'WACI/Button/Large',
  component: WACIElement,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['button'],
      },
    },
    buttonProps: {
      type: {
        required: true,
      },
    },
    qrOptions: {
      type: {
        required: false,
      },
    },
  },
};

export default meta;

const Template: Story<WACIElementProps> = (args) => <WACIElement {...args} />;

export const LogIn = Template.bind({});

const LogInArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'lg',
    type: 'log-in',
  },
};

LogIn.args = LogInArgs;

export const SignUp = Template.bind({});

const SignUpArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'lg',
    type: 'sign-up',
  },
};

SignUp.args = SignUpArgs;

export const Connect = Template.bind({});

const ConnectArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'lg',
    type: 'connect',
  },
};

Connect.args = ConnectArgs;

export const Bloom = Template.bind({});

const BloomArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'lg',
    type: 'bloom',
  },
};

Bloom.args = BloomArgs;

export const Verify = Template.bind({});

const VerifyArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'lg',
    type: 'verify',
  },
};

Verify.args = VerifyArgs;
