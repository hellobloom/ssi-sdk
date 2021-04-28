import React from 'react';
import { render } from '@testing-library/react';

import * as Default from '../stories/Default.stories';

type Args = {
  data: { challengeTokenUrl: string; version: '1' };
  buttonProps?: any;
  qrProps?: any;
};

const getArgs = <T extends Args>(args: T) => ({
  ...args,
  buttonProps: {
    ...args.buttonProps,
    id: 'custom-id',
  },
  qrProps: {
    ...args.qrProps,
    id: 'custom-id',
  },
});

describe('WACIElement', () => {
  let prevUserAgent: string;

  beforeEach(() => {
    prevUserAgent = window.navigator.userAgent;
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: prevUserAgent,
      writable: false,
    });
  });

  describe('renders a canvas', () => {
    it('when mode is set to "qr"', () => {
      const { container } = render(
        <Default.Default {...getArgs(Default.Default.args as any)} mode="qr" />
      );
      const svg = container.querySelector('svg#custom-id');

      expect(svg).toBeDefined();
    });

    it('when mode is not set and the user agent is non-mobile', () => {
      const { container } = render(
        <Default.Default
          {...(getArgs(Default.Default.args as any) as any)}
          mode={undefined}
        />
      );
      const svg = container.querySelector('svg#custom-id');

      expect(svg).toBeDefined();
    });

    it('when mode returns "qr"', () => {
      const { container } = render(
        <Default.Default
          {...(getArgs(Default.Default.args as any) as any)}
          mode={() => 'qr'}
        />
      );
      const svg = container.querySelector('svg#custom-id');

      expect(svg).toBeDefined();
    });
  });

  describe('renders an anchor', () => {
    it('when mode is set to "button"', () => {
      const { container } = render(
        <Default.Default
          {...(getArgs(Default.Default.args as any) as any)}
          mode="button"
        />
      );
      const anchor = container.querySelector('a#custom-id');

      expect(anchor).toBeDefined();
    });

    it('when mode is not set and the user agent is non-mobile', () => {
      const { container } = render(
        <Default.Default
          {...(getArgs(Default.Default.args as any) as any)}
          mode={undefined}
        />
      );
      const anchor = container.querySelector('a#custom-id');

      expect(anchor).toBeDefined();
    });

    it('when mode returns "qr"', () => {
      const { container } = render(
        <Default.Default
          {...(getArgs(Default.Default.args as any) as any)}
          mode={() => 'button'}
        />
      );
      const anchor = container.querySelector('a#custom-id');

      expect(anchor).toBeDefined();
    });
  });
});
