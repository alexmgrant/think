import { FormEvent } from 'react';

export const getEventValue = (event: FormEvent<HTMLInputElement>): string =>
  (event.target as HTMLInputElement).value;
