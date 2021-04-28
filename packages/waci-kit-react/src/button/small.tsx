import React, { FC, useMemo } from 'react';
import { oneLine, stripIndents } from 'common-tags';

import { SmallButtonType } from '../types';
import { BloomLogo } from './shared';

const Style: FC<{
  baseId: string;
  type: SmallButtonType;
  invert?: boolean;
}> = ({ baseId, type, invert }) => {
  const styleText = useMemo(() => {
    let borderRadius: string;

    switch (type) {
      case 'circle':
        borderRadius = '100%';
        break;
      case 'squircle':
        borderRadius = '8px';
        break;
      case 'rounded-square':
        borderRadius = '4px';
        break;
      case 'square':
        borderRadius = '0';
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    let text = stripIndents(oneLine)`
      #${baseId} {
        background-color: ${invert ? '#fff' : '#6262F6'};
        color: ${invert ? '#6262F6' : '#fff'};
        border-radius: ${borderRadius};
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 34px;
        width: 34px;
      }

      #${baseId}-logo {
        width: 20px;
      }
    `;

    return text;
  }, [baseId, type, invert]);

  return <style dangerouslySetInnerHTML={{ __html: styleText }} />;
};

export const SmallButtonContent: FC<{
  baseId: string;
  type: SmallButtonType;
  invert: boolean | undefined;
}> = (props) => {
  return (
    <>
      <Style baseId={props.baseId} type={props.type} invert={props.invert} />
      <BloomLogo baseId={props.baseId} />
    </>
  );
};
