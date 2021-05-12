import React, { FC, useMemo } from 'react';
import Bowser from 'bowser';
import { ComponentProps } from 'react-forward-props';
import { QROptions } from '@bloomprotocol/qr-react';

import { ButtonOptions, CommonWACIElementProps, ModeFn } from './types';
import { WACIQRElement } from './qr';
import { WACIButtonElement } from './button';

type AlwaysButtonWACIElementProp = CommonWACIElementProps & {
  mode: 'button';
  buttonProps: ComponentProps<'a', ButtonOptions>;
};

type AlwaysQRWACIElementProp = CommonWACIElementProps & {
  mode: 'qr';
  qrProps?: ComponentProps<'svg', QROptions>;
};

type DetectionWACIElementProp = CommonWACIElementProps & {
  mode?: ModeFn;
  qrProps?: ComponentProps<'svg', QROptions>;
  buttonProps: ComponentProps<'a', ButtonOptions>;
};

export type WACIElementProps =
  | AlwaysButtonWACIElementProp
  | AlwaysQRWACIElementProp
  | DetectionWACIElementProp;

export const WACIElement: FC<WACIElementProps> = ({
  mode: _mode,
  ...props
}) => {
  const mode = useMemo<'qr' | 'button'>(() => {
    if (typeof _mode === 'string') {
      return _mode;
    } else if (typeof _mode === 'function') {
      return _mode(Bowser.parse(window.navigator.userAgent));
    } else {
      const parsedResult = Bowser.parse(window.navigator.userAgent);

      const isMobilePlatform =
        parsedResult.platform.type === 'mobile' ||
        parsedResult.platform.type === 'tablet';
      const isMobileOS =
        parsedResult.os.name === 'iOS' || parsedResult.os.name === 'Android';

      return isMobilePlatform && isMobileOS ? 'button' : 'qr';
    }
  }, [_mode]);

  switch (mode) {
    case 'qr': {
      const { data, qrProps } = props as AlwaysQRWACIElementProp;
      return <WACIQRElement data={data} {...qrProps} />;
    }
    case 'button': {
      const { data, buttonProps } = props as AlwaysButtonWACIElementProp;
      return <WACIButtonElement data={data} {...buttonProps} />;
    }
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
};
