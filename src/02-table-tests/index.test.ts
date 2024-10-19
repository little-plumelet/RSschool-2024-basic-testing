// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 5, action: Action.Add, expected: 7 },
  { a: -2, b: -5, action: Action.Add, expected: -7 },
  { a: 2, b: 5, action: Action.Subtract, expected: -3 },
  { a: -2, b: -5, action: Action.Subtract, expected: 3 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: -2, b: -5, action: Action.Multiply, expected: 10 },
  { a: 27, b: 3, action: Action.Divide, expected: 9 },
  { a: -15, b: 5, action: Action.Divide, expected: -3 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: -5, b: 4, action: Action.Exponentiate, expected: 625 },
  { a: 27, b: 3, action: '&', expected: null },
  { a: 'a', b: 3, action: Action.Divide, expected: null },
  { a: 0, b: [2], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
