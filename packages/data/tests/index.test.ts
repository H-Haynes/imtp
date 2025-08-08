import { describe, it, expect } from 'vitest';
import { VERSION, PACKAGE_NAME, DATA_INFO } from '../src/index';
import { validator, ValidationResult } from '../src/validators';
import { transformer } from '../src/transformers';

describe('@imtp/data', () => {
  it('should export correct version and package name', () => {
    expect(VERSION).toBe('1.0.0');
    expect(PACKAGE_NAME).toBe('@imtp/data');
  });

  it('should export correct package info', () => {
    expect(DATA_INFO).toEqual({
      name: '@imtp/data',
      version: '1.0.0',
      description: 'IMTP data processing package',
      exports: {
        validators: '数据验证器',
        transformers: '数据转换器',
      },
    });
  });

  describe('Validator', () => {
    beforeEach(() => {
      validator.clearErrors();
    });

    describe('Email validation', () => {
      it('should validate correct email', () => {
        expect(validator.validateEmail('test@example.com')).toBe(true);
        expect(validator.getErrors()).toHaveLength(0);
      });

      it('should reject invalid email', () => {
        expect(validator.validateEmail('invalid-email')).toBe(false);
        expect(validator.getErrors()).toContain('邮箱格式不正确');
      });

      it('should reject empty email', () => {
        expect(validator.validateEmail('')).toBe(false);
        expect(validator.getErrors()).toContain('邮箱不能为空');
      });
    });

    describe('Password validation', () => {
      it('should validate correct password', () => {
        expect(validator.validatePassword('Password123')).toBe(true);
        expect(validator.getErrors()).toHaveLength(0);
      });

      it('should reject weak password', () => {
        expect(validator.validatePassword('weak')).toBe(false);
        expect(validator.getErrors()).toContain('密码长度至少8位');
      });

      it('should reject password without required characters', () => {
        expect(validator.validatePassword('password123')).toBe(false);
        expect(validator.getErrors()).toContain('密码必须包含大小写字母和数字');
      });
    });

    describe('Required field validation', () => {
      it('should validate non-empty values', () => {
        expect(validator.validateRequired('value', 'field')).toBe(true);
        expect(validator.validateRequired(123, 'field')).toBe(true);
        expect(validator.validateRequired(0, 'field')).toBe(true);
        expect(validator.getErrors()).toHaveLength(0);
      });

      it('should reject empty values', () => {
        expect(validator.validateRequired('', 'field')).toBe(false);
        expect(validator.validateRequired(null, 'field')).toBe(false);
        expect(validator.validateRequired(undefined, 'field')).toBe(false);
        expect(validator.getErrors()).toContain('field不能为空');
      });
    });

    describe('Length validation', () => {
      it('should validate string length', () => {
        expect(validator.validateLength('test', 1, 10, 'field')).toBe(true);
        expect(validator.getErrors()).toHaveLength(0);
      });

      it('should reject too short string', () => {
        expect(validator.validateLength('a', 2, 10, 'field')).toBe(false);
        expect(validator.getErrors()).toContain('field长度不能少于2个字符');
      });

      it('should reject too long string', () => {
        expect(
          validator.validateLength('very long string', 1, 5, 'field')
        ).toBe(false);
        expect(validator.getErrors()).toContain('field长度不能超过5个字符');
      });
    });

    describe('Validation result', () => {
      it('should return correct validation result', () => {
        validator.validateEmail('test@example.com');
        const result = validator.getResult();

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should return errors in validation result', () => {
        validator.validateEmail('invalid');
        const result = validator.getResult();

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('邮箱格式不正确');
      });
    });
  });

  describe('DataTransformer', () => {
    describe('Date formatting', () => {
      it('should format date correctly', () => {
        const date = new Date('2023-01-15');
        expect(transformer.formatDate(date, 'YYYY-MM-DD')).toBe('2023-01-15');
      });

      it('should format date string', () => {
        expect(transformer.formatDate('2023-01-15', 'YYYY-MM-DD')).toBe(
          '2023-01-15'
        );
      });
    });

    describe('Number formatting', () => {
      it('should format number correctly', () => {
        expect(transformer.formatNumber(1234.56)).toBe('1,234.56');
      });

      it('should format currency correctly', () => {
        expect(transformer.formatCurrency(1234.56)).toContain('¥1,234.56');
      });
    });

    describe('File size formatting', () => {
      it('should format file size correctly', () => {
        expect(transformer.formatFileSize(1024)).toBe('1 KB');
        expect(transformer.formatFileSize(1024 * 1024)).toBe('1 MB');
        expect(transformer.formatFileSize(0)).toBe('0 B');
      });
    });

    describe('Object transformation', () => {
      const testObj = { user_name: 'john', email_address: 'john@example.com' };

      it('should convert to camel case', () => {
        const result = transformer.toCamelCase(testObj);
        expect(result).toEqual({
          userName: 'john',
          emailAddress: 'john@example.com',
        });
      });

      it('should convert to snake case', () => {
        const camelObj = { userName: 'john', emailAddress: 'john@example.com' };
        const result = transformer.toSnakeCase(camelObj);
        expect(result).toEqual({
          user_name: 'john',
          email_address: 'john@example.com',
        });
      });

      it('should remove empty values', () => {
        const obj = { name: 'john', email: '', age: null, city: undefined };
        const result = transformer.removeEmptyValues(obj);
        expect(result).toEqual({ name: 'john' });
      });
    });
  });
});
