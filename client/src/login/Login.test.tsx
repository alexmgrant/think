import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import Login from './Login';

let container: Element | null = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  (container as Element).remove();
  container = null;
});

it('should render Login', () => {
  act(() => render(<Login setJwt={() => {}} />, container));

  expect(pretty((container as Element).innerHTML)).toMatchSnapshot();
});
