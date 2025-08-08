// 数据验证器

import { REGEX } from '@imtp/core';

// 验证结果类型
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// 基础验证器
export class Validator {
  private errors: string[] = [];

  // 验证邮箱
  validateEmail(email: string): boolean {
    if (!email) {
      this.errors.push('邮箱不能为空');
      return false;
    }
    if (!REGEX.EMAIL.test(email)) {
      this.errors.push('邮箱格式不正确');
      return false;
    }
    return true;
  }

  // 验证手机号
  validatePhone(phone: string): boolean {
    if (!phone) {
      this.errors.push('手机号不能为空');
      return false;
    }
    if (!REGEX.PHONE.test(phone)) {
      this.errors.push('手机号格式不正确');
      return false;
    }
    return true;
  }

  // 验证密码
  validatePassword(password: string): boolean {
    if (!password) {
      this.errors.push('密码不能为空');
      return false;
    }
    if (password.length < 8) {
      this.errors.push('密码长度至少8位');
      return false;
    }
    if (!REGEX.PASSWORD.test(password)) {
      this.errors.push('密码必须包含大小写字母和数字');
      return false;
    }
    return true;
  }

  // 验证URL
  validateUrl(url: string): boolean {
    if (!url) {
      this.errors.push('URL不能为空');
      return false;
    }
    if (!REGEX.URL.test(url)) {
      this.errors.push('URL格式不正确');
      return false;
    }
    return true;
  }

  // 验证必填字段
  validateRequired(value: any, fieldName: string): boolean {
    if (value === null || value === undefined || value === '') {
      this.errors.push(`${fieldName}不能为空`);
      return false;
    }
    return true;
  }

  // 验证字符串长度
  validateLength(
    value: string,
    min: number,
    max: number,
    fieldName: string
  ): boolean {
    if (value.length < min) {
      this.errors.push(`${fieldName}长度不能少于${min}个字符`);
      return false;
    }
    if (value.length > max) {
      this.errors.push(`${fieldName}长度不能超过${max}个字符`);
      return false;
    }
    return true;
  }

  // 验证数字范围
  validateNumberRange(
    value: number,
    min: number,
    max: number,
    fieldName: string
  ): boolean {
    if (value < min) {
      this.errors.push(`${fieldName}不能小于${min}`);
      return false;
    }
    if (value > max) {
      this.errors.push(`${fieldName}不能大于${max}`);
      return false;
    }
    return true;
  }

  // 获取错误信息
  getErrors(): string[] {
    return [...this.errors];
  }

  // 清除错误信息
  clearErrors(): void {
    this.errors = [];
  }

  // 获取验证结果
  getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: this.getErrors(),
    };
  }
}

// 创建验证器实例
export const validator = new Validator();
