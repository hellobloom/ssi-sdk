import Bowser from 'bowser';

export type CommonWACIElementProps = {
  data: {
    challengeTokenUrl: string;
    version: '1';
  };
};

export type SmallButtonType =
  | 'square'
  | 'rounded-square'
  | 'circle'
  | 'squircle';

export type MediumButtonType =
  | 'log-in'
  | 'sign-up'
  | 'connect'
  | 'bloom'
  | 'verify';

export type LargeButtonType =
  | 'log-in'
  | 'sign-up'
  | 'connect'
  | 'bloom'
  | 'verify';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type SmallButtonOptions = {
  size: 'sm';
  type: SmallButtonType;
  invert?: boolean;
};

export type MediumButtonOptions = {
  size: 'md';
  type: MediumButtonType;
};

export type LargeButtonOptions = {
  size: 'lg';
  type: LargeButtonType;
};

export type ButtonOptions =
  | SmallButtonOptions
  | MediumButtonOptions
  | LargeButtonOptions;

export type ModeFn = (
  parsedResult: Bowser.Parser.ParsedResult
) => 'qr' | 'button';
