import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WACIElement, WACIElementProps } from '../src';

const meta: Meta = {
  title: 'WACI/Default',
  component: WACIElement,
};

export default meta;

const Template: Story<WACIElementProps> = (args) => <WACIElement {...args} />;

export const Default = Template.bind({});

const DefaultArgs: WACIElementProps = {
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    width: 256,
    height: 256,
  },
  buttonProps: {
    size: 'lg',
    type: 'bloom',
  },
};

Default.args = DefaultArgs;
