import React from 'react';
import { render } from '@testing-library/react';

import * as LargeButton from '../stories/Button/Large.stories';
import * as MediumButton from '../stories/Button/Medium.stories';
import * as SmallButton from '../stories/Button/Small.stories';
import * as SmallInvertedButton from '../stories/Button/SmallInverted.stories';

const getArgs = <
  T extends {
    data: { challengeTokenUrl: string; version: '1' };
    buttonProps?: any;
  }
>(
  args: T
) => ({
  ...args,
  buttonProps: {
    ...args.buttonProps,
    id: 'custom-id',
  },
});

describe('Button', () => {
  describe('large', () => {
    it('log-in', () => {
      const { asFragment } = render(
        <LargeButton.LogIn {...getArgs(LargeButton.LogIn.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('sign-up', () => {
      const { asFragment } = render(
        <LargeButton.SignUp {...getArgs(LargeButton.SignUp.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('connect', () => {
      const { asFragment } = render(
        <LargeButton.Connect {...getArgs(LargeButton.Connect.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('bloom', () => {
      const { asFragment } = render(
        <LargeButton.Bloom {...getArgs(LargeButton.Bloom.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('verify', () => {
      const { asFragment } = render(
        <LargeButton.Verify {...getArgs(LargeButton.Verify.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('medium', () => {
    it('log-in', () => {
      const { asFragment } = render(
        <MediumButton.LogIn {...getArgs(MediumButton.LogIn.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('sign-up', () => {
      const { asFragment } = render(
        <MediumButton.SignUp {...getArgs(MediumButton.SignUp.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('connect', () => {
      const { asFragment } = render(
        <MediumButton.Connect {...getArgs(MediumButton.Connect.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('bloom', () => {
      const { asFragment } = render(
        <MediumButton.Bloom {...getArgs(MediumButton.Bloom.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('verify', () => {
      const { asFragment } = render(
        <MediumButton.Verify {...getArgs(MediumButton.Verify.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('small', () => {
    it('square', () => {
      const { asFragment } = render(
        <SmallButton.Square {...getArgs(SmallButton.Square.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('rounded-square', () => {
      const { asFragment } = render(
        <SmallButton.RoundedSquare
          {...getArgs(SmallButton.RoundedSquare.args as any)}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('circle', () => {
      const { asFragment } = render(
        <SmallButton.Circle {...getArgs(SmallButton.Circle.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('squircle', () => {
      const { asFragment } = render(
        <SmallButton.Squircle {...getArgs(SmallButton.Squircle.args as any)} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    describe('inverted', () => {
      it('square', () => {
        const { asFragment } = render(
          <SmallInvertedButton.Square
            {...getArgs(SmallInvertedButton.Square.args as any)}
          />
        );
        expect(asFragment()).toMatchSnapshot();
      });

      it('rounded-square', () => {
        const { asFragment } = render(
          <SmallInvertedButton.RoundedSquare
            {...getArgs(SmallInvertedButton.RoundedSquare.args as any)}
          />
        );
        expect(asFragment()).toMatchSnapshot();
      });

      it('circle', () => {
        const { asFragment } = render(
          <SmallInvertedButton.Circle
            {...getArgs(SmallInvertedButton.Circle.args as any)}
          />
        );
        expect(asFragment()).toMatchSnapshot();
      });

      it('squircle', () => {
        const { asFragment } = render(
          <SmallInvertedButton.Squircle
            {...getArgs(SmallInvertedButton.Squircle.args as any)}
          />
        );
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
