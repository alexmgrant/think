import { hasPayload, isNumber, isNegativeNumber } from '../lib/utils.js';

describe('utils', () => {
  describe('hasPayload', () => {
    it('handles missing body', () => {
      const test = hasPayload(undefined);
      expect(test).toBe(false);
    });
    it('handles body', () => {
      const test = hasPayload({});
      expect(test).toBe(true);
    });
  });

  describe('isNumber', () => {
    test.each([
      [10, true],
      [2.392, true],
      [-212.392, true],
      ['10', false],
      [undefined, false],
      [{}, false],
      [[], false],
    ])('isNumber(%s) = %s', (input, result) => {
      const test = isNumber(input);

      expect(test).toBe(result);
    });
  });

  describe('isNegativeNumber', () => {
    test.each([
      [undefined, false],
      [{}, false],
      ['-1', false],
      [[], false],
      [10, false],
      [10000000000, false],
      [1223.129244, false],
      [-19292, true],
      [-2.3291, true],
      [-10000000000, true],
    ])('isNegativeNumber(%s) = %s', (input, result) => {
      const test = isNegativeNumber(input);

      expect(test).toBe(result);
    });
  });
});
