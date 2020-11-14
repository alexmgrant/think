import { FormEvent } from 'react';

export const getEventValue = (event: FormEvent<HTMLInputElement>): string =>
  (event.target as HTMLInputElement).value;

export const curry = (fn: Function) => (...args: any) => {
  if (args.length >= fn.length) {
    return fn.apply(null, args);
  }
  return fn.bind(null, ...args);
};

export const emptyString = (string: string): boolean =>
  !!string && string === '';
