import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WACIElement, WACIElementProps } from '../../src';

const meta: Meta = {
  title: 'WACI/Button/Small',
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
    type: 'squircle',
  },
};

Squircle.args = SquircleArgs;
