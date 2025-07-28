const { describe, it, expect } = require('@jest/globals');
const paramValidator = require("../src/paramValidator");
const { BusinessError } = require('../src/errors'); // 导入错误类

// 从paramValidator获取常量
const allowedFundSort = paramValidator.allowedFundSort;
const allowedStockSort = paramValidator.allowedStockSort;

// 测试用例数据
const req_stock = { query: { page: 1, limit: 20, sort: 'pe_ratio', order: 'desc' } };
const req_fund = { query: { page: 1, limit: 20, sort: 'change_percent', order: 'desc' } };

describe("sort validater", () => {
  it("should return the real stock sort parameters", () => {
    expect(paramValidator.validateSort(req_stock.query.sort, allowedStockSort)).toBe('pe_ratio');
  });

  it("should return the real fund sort parameters", () => {
    expect(paramValidator.validateSort(req_fund.query.sort, allowedFundSort)).toBe('change_percent');
  });

  it("should throw error when stock sort is empty", () => {
    expect(() => paramValidator.validateSort("", allowedStockSort)).toThrow(BusinessError);
  });

  it("should throw error when stock sort is invalid", () => {
    expect(() => paramValidator.validateSort("abc", allowedStockSort)).toThrow(BusinessError);
  });

  it("should throw error when Fund sort is invalid", () => {
    expect(() => paramValidator.validateSort('abc', allowedFundSort)).toThrow(BusinessError);
  });
});

describe("page and limit validater", () => {
  it("should return the real page number", () => {
    expect(paramValidator.validatePage(2)).toBe(2);
    expect(paramValidator.validatePage('3')).toBe(3); // 支持字符串数字
  });

  it("should throw error when page is invalid", () => {
    expect(() => paramValidator.validatePage(-1)).toThrow(BusinessError);
    expect(() => paramValidator.validatePage(0)).toThrow(BusinessError);
    expect(() => paramValidator.validatePage('abc')).toThrow(BusinessError);
  });

  it("should return the real limit number", () => {
    expect(paramValidator.validateLimit(50)).toBe(50);
    expect(paramValidator.validateLimit('100')).toBe(100); // 支持字符串数字
  });

  it("should throw error when limit is invalid", () => {
    expect(() => paramValidator.validateLimit(-10)).toThrow(BusinessError);
    expect(() => paramValidator.validateLimit(0)).toThrow(BusinessError);
    expect(() => paramValidator.validateLimit('abc')).toThrow(BusinessError);
    expect(() => paramValidator.validateLimit(2000)).toThrow(BusinessError);
  });
});

describe("order validater", () => {
  it("should return the real order (uppercase)", () => {
    expect(paramValidator.validateOrder('ASC')).toBe('ASC');
    expect(paramValidator.validateOrder('desc')).toBe('DESC');
  });

  it("should throw error when order is invalid", () => {
    expect(() => paramValidator.validateOrder('abc')).toThrow(BusinessError);
    expect(() => paramValidator.validateOrder('')).toThrow(BusinessError);
  });
});

describe("code validater", () => {
  it("should return the real code", () => {
    expect(paramValidator.validateCode('123456')).toBe('123456');
  });

  it("should throw error when code is invalid", () => {
    expect(() => paramValidator.validateCode('abc')).toThrow(BusinessError);
    expect(() => paramValidator.validateCode('12345')).toThrow(BusinessError);
    expect(() => paramValidator.validateCode('1234567')).toThrow(BusinessError);
  });
});

describe("validateOfGetAllStock", () => {
  it("should validate stock parameters correctly", () => {
    const req = { query: { page: 2, limit: 50, sort: 'market_cap', order: 'ASC' } };
    const result = paramValidator.validateOfGetAllStock(req);
    expect(result).toEqual({
      page: 2,
      limit: 50,
      sort: 'market_cap',
      order: 'ASC'
    });
  });

  it("should throw error when stock parameters are invalid", () => {
    const req = { query: { page: -1, limit: 2000, sort: 'invalid_sort', order: 'invalid_order' } };
    expect(() => paramValidator.validateOfGetAllStock(req)).toThrow(BusinessError);
  });
});