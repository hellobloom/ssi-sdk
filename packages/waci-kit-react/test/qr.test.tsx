import React from 'react';
import { render } from '@testing-library/react';

import * as QR from '../stories/QR/QR.stories';

const getArgs = <
  T extends {
    data: { challengeTokenUrl: string; version: '1' };
    qrProps?: any;
  }
>(
  args: T
) => ({
  ...args,
  qrProps: {
    ...args.qrProps,
    id: 'custom-id',
  },
});

describe('QR', () => {
  it('default', () => {
    const { asFragment } = render(
      <QR.Default {...getArgs(QR.Default.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('ec level', () => {
    const { asFragment } = render(
      <QR.ECLevel {...getArgs(QR.ECLevel.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('color', () => {
    const { asFragment } = render(
      <QR.Color {...getArgs(QR.Color.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('hide logo', () => {
    const { asFragment } = render(
      <QR.HideLogo {...getArgs(QR.HideLogo.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('logo opacity', () => {
    const { asFragment } = render(
      <QR.LogoOpacity {...getArgs(QR.LogoOpacity.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('custom logo', () => {
    const { asFragment } = render(
      <QR.LogoOpacity {...getArgs(QR.LogoOpacity.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('custom props', () => {
    const { asFragment } = render(
      <QR.CustomProps {...getArgs(QR.CustomProps.args as any)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
