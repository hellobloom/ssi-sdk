import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WACIElement, WACIElementProps } from '../../src';

const meta: Meta = {
  title: 'WACI/QR',
  component: WACIElement,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['qr'],
      },
    },
    buttonProps: {
      type: {
        required: false,
      },
    },
  },
};

export default meta;

const Template: Story<WACIElementProps> = (args) => <WACIElement {...args} />;

export const Default = Template.bind({});

const DefaultArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    width: 256,
    height: 256,
  },
};

Default.args = DefaultArgs;

export const ECLevel = Template.bind({});

const ECLevelArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    width: 256,
    height: 256,
    ecLevel: 'Q',
  },
};

ECLevel.args = ECLevelArgs;

export const Color = Template.bind({});

const ColorArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    bgColor: '#c84c57',
    fgColor: '#ecbf58',
    width: 256,
    height: 256,
  },
};

Color.args = ColorArgs;

export const HideLogo = Template.bind({});

const HideLogoArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    logo: {
      hide: true,
    },
    width: 256,
    height: 256,
  },
};

HideLogo.args = HideLogoArgs;

export const LogoOpacity = Template.bind({});

const LogoOpacityArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    logo: {
      opacity: 0.3,
    },
    width: 256,
    height: 256,
  },
};

LogoOpacity.args = LogoOpacityArgs;

export const CustomLogo = Template.bind({});

const CustomLogoArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    logo: {
      image: 'https://placekitten.com/200/200',
    },
    width: 256,
    height: 256,
  },
};

CustomLogo.args = CustomLogoArgs;

export const CustomProps = Template.bind({});

const CustomPropsArgs: WACIElementProps = {
  mode: 'qr',
  data: {
    challengeTokenUrl:
      'https://example.com/api/v1/waci-challenge/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    version: '1',
  },
  qrProps: {
    width: 256,
    height: 256,
    onClick: () => {
      alert('Clicked!');
    },
    style: {
      margin: '25px',
    },
  },
};

CustomProps.args = CustomPropsArgs;
