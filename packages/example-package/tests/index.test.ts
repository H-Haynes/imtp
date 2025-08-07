import { greet, Calculator } from '../src/index';

describe('greet', () => {
  it('应该返回正确的问候语', () => {
    expect(greet('World')).toBe('Hello, World!');
    expect(greet('IMTP')).toBe('Hello, IMTP!');
  });
});

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('应该正确计算加法', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0, 0)).toBe(0);
    });
  });

  describe('subtract', () => {
    it('应该正确计算减法', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(1, 1)).toBe(0);
      expect(calculator.subtract(0, 5)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('应该正确计算乘法', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(0, 5)).toBe(0);
    });
  });

  describe('divide', () => {
    it('应该正确计算除法', () => {
      expect(calculator.divide(6, 2)).toBe(3);
      expect(calculator.divide(5, 2)).toBe(2.5);
      expect(calculator.divide(0, 5)).toBe(0);
    });

    it('应该抛出除零错误', () => {
      expect(() => calculator.divide(5, 0)).toThrow(
        'Division by zero is not allowed'
      );
    });
  });
});
