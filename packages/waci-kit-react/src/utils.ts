import { useState } from 'react';

const generateId = () => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return `bloom-waci-element-${rand}`;
};

export const useId = (givenId: string | undefined) => {
  const [generatedId] = useState(() => {
    return generateId();
  });

  return givenId || generatedId;
};
