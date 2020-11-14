import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import Identifier from './Identifier';

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

it('should render Identifier', () => {
  act(() => render(<Identifier />, container));

  expect(pretty((container as Element).innerHTML)).toMatchSnapshot();
});
