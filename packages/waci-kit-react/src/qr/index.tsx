import React from 'react';
import { FC } from 'react-forward-props';
import { QR, QRProps } from '@bloomprotocol/qr-react';

import { useId } from '../utils';
import { CommonWACIElementProps } from '../types';

export type WACIQRElementProps = CommonWACIElementProps & QRProps;

export const WACIQRElement: FC<'svg', WACIQRElementProps> = (props) => {
  const id = useId(props.id);

  return <QR {...props} id={id} />;
};
