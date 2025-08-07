import { hello } from '../src/index';

describe('hello', () => {
  it('应该返回正确的问候语', () => {
    expect(hello('World')).toBe('Hello from utils, World!');
    expect(hello('IMTP')).toBe('Hello from utils, IMTP!');
  });
});
