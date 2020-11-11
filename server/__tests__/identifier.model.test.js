import {
  getNextIdentifier,
  getIdentifier,
  updateIdentifier,
} from '../models/identifier.model.js';

describe('Identifier model', () => {
  test.each([
    ['getNextIdentifier', 1],
    ['getNextIdentifier', 2],
    ['getNextIdentifier', 3],
  ])('%s returns next Identifier %s', (nextIdentifier, result) => {
    const identifier = getNextIdentifier();

    expect(identifier).toBe(result);
  });

  it('updates and returns next Identifier', () => {
    updateIdentifier(101);
    const identifier = getNextIdentifier();

    expect(identifier).toBe(102);
  });

  it('updates and returns current identifier', () => {
    updateIdentifier(1001);
    const identifier = getIdentifier();

    expect(identifier).toBe(1001);
  });
});
