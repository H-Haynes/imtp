import { describe, it, expect } from 'vitest';
import { hello } from '../src/index';

describe('test-package', () => {
  it('should export hello function', () => {
    expect(typeof hello).toBe('function');
  });

  it('should return correct greeting message', () => {
    const result = hello('World');
    expect(result).toBe('Hello from test-package, World!');
  });

  it('should work with different names', () => {
    const result = hello('Test');
    expect(result).toBe('Hello from test-package, Test!');
  });
});
