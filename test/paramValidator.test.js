const { describe, it, expect } = require('@jest/globals');
const  paramValidator = require("../src/paramValidator");


 console.log(paramValidator);
 let allowedFundSort = paramValidator.allowedFundSort;
 let allowedStockSort = paramValidator.allowedStockSort;
 let req_stock= {page: 1, limit: 20, sort: 'pe_ratio', order: 'desc'};
 let req_fund = {page: 1, limit: 20, sort: 'change_percent', order: 'desc'};

describe("sort validater", () => {
 
  it("should return the real stock sort parameters", () => {
    expect(paramValidator.validateSort(req_stock.sort, allowedStockSort)).toBe('pe_ratio');
  });

  it("should return the real fund sort parameters", () => {
    expect(paramValidator.validateSort(req_fund.sort, allowedFundSort)).toBe('change_percent');
  });

  it("should validate the stock sort is empty, return the default sort", () => {
    expect(paramValidator.validateSort("", allowedStockSort)).toBe(allowedStockSort[0]);
  });

  it("should validate the stock sort is invalid, return the default sort", () => {
    expect(paramValidator.validateSort("abc", allowedStockSort)).toBe(allowedStockSort[0]);
  });

  it("should validate the Fund sort is invalid, return the default sort", () => {
    expect(paramValidator.validateSort('abc', allowedFundSort)).toBe(allowedFundSort[0]);
  });
});



describe("page and limit validater", () => {
  
  it("should return the real page number", () => {
    expect(paramValidator.validatePage(2)).toBe(2);
  });

  it("should return the default page number when page is invalid", () => {
    expect(paramValidator.validatePage(-1)).toBe(1);
    expect(paramValidator.validatePage(0)).toBe(1);
    expect(paramValidator.validatePage('abc')).toBe(1);
  });

  it("should return the real limit number", () => {
    expect(paramValidator.validateLimit(50)).toBe(50);
  });

  it("should return the default limit number when limit is invalid", () => {
    expect(paramValidator.validateLimit(-10)).toBe(20);
    expect(paramValidator.validateLimit(0)).toBe(20);
    expect(paramValidator.validateLimit('abc')).toBe(20);
    expect(paramValidator.validateLimit(2000)).toBe(20); // assuming max limit is 1000
  });
});

describe("order validater", () => {
  it("should return the real order", () => {
    expect(paramValidator.validateOrder('ASC')).toBe('ASC');
    expect(paramValidator.validateOrder('DESC')).toBe('DESC');
  });

  it("should return the default order when order is invalid", () => {
    expect(paramValidator.validateOrder('abc')).toBe('ASC');
    expect(paramValidator.validateOrder('')).toBe('ASC');
  });
});

describe("code validater", () => {
  it("should return the real code", () => {
    expect(paramValidator.validateCode('123456')).toBe('123456');
  });

  it("should throw an error when code is invalid", () => {
    expect(() => paramValidator.validateCode('abc')).toThrow('Invalid stock code');
    expect(() => paramValidator.validateCode('12345')).toThrow('Invalid stock code');
    expect(() => paramValidator.validateCode('1234567')).toThrow('Invalid stock code');
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

  it("should return default values for invalid stock parameters", () => {
    const req = { query: { page: -1, limit: 2000, sort: 'invalid_sort', order: 'invalid_order' } };
    const result = paramValidator.validateOfGetAllStock(req);
    expect(result).toEqual({
      page: 1,
      limit: 20,
      sort: allowedStockSort[0],
      order: 'ASC'
    });
  });
});