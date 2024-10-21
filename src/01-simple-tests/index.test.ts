// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 5, action: Action.Add });
    expect(result).toBe(7);

    const result_2 = simpleCalculator({ a: -2, b: -5, action: Action.Add });
    expect(result_2).toBe(-7);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 5, action: Action.Subtract });
    expect(result).toBe(-3);

    const result_2 = simpleCalculator({
      a: -2,
      b: -5,
      action: Action.Subtract,
    });
    expect(result_2).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 5, action: Action.Multiply });
    expect(result).toBe(10);

    const result_2 = simpleCalculator({
      a: -2,
      b: -5,
      action: Action.Multiply,
    });
    expect(result_2).toBe(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 27, b: 3, action: Action.Divide });
    expect(result).toBe(9);

    const result_2 = simpleCalculator({
      a: -15,
      b: 5,
      action: Action.Divide,
    });
    expect(result_2).toBe(-3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(27);

    const result_2 = simpleCalculator({
      a: -5,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result_2).toBe(625);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 27, b: 3, action: '&' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'a', b: 3, action: Action.Divide });
    expect(result).toBe(null);

    const result_2 = simpleCalculator({
      a: 0,
      b: [2],
      action: Action.Add,
    });
    expect(result_2).toBe(null);
  });
});
