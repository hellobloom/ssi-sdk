import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WACIElement, WACIElementProps } from '../../src';

const meta: Meta = {
  title: 'WACI/Button/Small/Inverted',
  component: WACIElement,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
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
    qrProps: {
      type: {
        required: false,
      },
    },
  },
};

export default meta;

const Template: Story<WACIElementProps> = (args) => <WACIElement {...args} />;

export const Square = Template.bind({});

const SquareArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'sm',
    invert: true,
    type: 'square',
  },
};

Square.args = SquareArgs;

export const RoundedSquare = Template.bind({});

const RoundedSquareArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'sm',
    invert: true,
    type: 'rounded-square',
  },
};

RoundedSquare.args = RoundedSquareArgs;

export const Circle = Template.bind({});

const CircleArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'sm',
    invert: true,
    type: 'circle',
  },
};

Circle.args = CircleArgs;

export const Squircle = Template.bind({});

const SquircleArgs: WACIElementProps = {
  mode: 'button',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  buttonProps: {
    size: 'sm',
    invert: true,
    type: 'squircle',
  },
};

Squircle.args = SquircleArgs;
