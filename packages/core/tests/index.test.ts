import { describe, it, expect } from 'vitest';
import { VERSION, PACKAGE_NAME, CORE_INFO, coreManager } from '../src/index';
import {
  isString,
  isNumber,
  capitalize,
  unique,
  pick,
  omit,
} from '../src/utils';
import { ENV, HTTP_STATUS, REGEX } from '../src/constants';

describe('@imtp/core', () => {
  it('should export correct version and package name', () => {
    expect(VERSION).toBe('1.0.0');
    expect(PACKAGE_NAME).toBe('@imtp/core');
  });

  it('should export correct package info', () => {
    expect(CORE_INFO).toEqual({
      name: '@imtp/core',
      version: '1.0.0',
      description: 'IMTP core functionality package',
      exports: {
        types: '核心类型定义',
        utils: '核心工具函数',
        constants: '核心常量定义',
      },
    });
  });

  describe('CoreManager', () => {
    it('should be a singleton', () => {
      const instance1 = coreManager;
      const instance2 = coreManager;
      expect(instance1).toBe(instance2);
    });

    it('should manage configuration', () => {
      coreManager.setConfig('test', 'value');
      expect(coreManager.getConfig('test')).toBe('value');

      const allConfig = coreManager.getAllConfig();
      expect(allConfig).toHaveProperty('test', 'value');

      coreManager.clearConfig();
      expect(coreManager.getConfig('test')).toBeUndefined();
    });
  });

  describe('Utils', () => {
    describe('Type checks', () => {
      it('should check string type', () => {
        expect(isString('hello')).toBe(true);
        expect(isString(123)).toBe(false);
        expect(isString(null)).toBe(false);
      });

      it('should check number type', () => {
        expect(isNumber(123)).toBe(true);
        expect(isNumber('123')).toBe(false);
        expect(isNumber(NaN)).toBe(false);
      });
    });

    describe('String utils', () => {
      it('should capitalize string', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('world')).toBe('World');
      });
    });

    describe('Array utils', () => {
      it('should remove duplicates', () => {
        expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      });
    });

    describe('Object utils', () => {
      const obj = { a: 1, b: 2, c: 3 };

      it('should pick properties', () => {
        expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
      });

      it('should omit properties', () => {
        expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
      });
    });
  });

  describe('Constants', () => {
    it('should export environment constants', () => {
      expect(ENV.DEVELOPMENT).toBe('development');
      expect(ENV.PRODUCTION).toBe('production');
      expect(ENV.TEST).toBe('test');
    });

    it('should export HTTP status codes', () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500);
    });

    it('should export regex patterns', () => {
      expect(REGEX.EMAIL.test('test@example.com')).toBe(true);
      expect(REGEX.EMAIL.test('invalid-email')).toBe(false);
    });
  });
});
