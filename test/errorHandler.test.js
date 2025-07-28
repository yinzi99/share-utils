const { describe, it, expect, beforeEach } = require('@jest/globals');
const { errorHandler } = require('../src/errorHandler');
const { BusinessError } = require('../src/errors');
const { errorResponse } = require('../src/responseFormatter');

// 模拟Express响应对象
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// 模拟errorResponse
jest.mock('../src/responseFormatter', () => ({
  errorResponse: jest.fn().mockReturnValue({})
}));

describe('errorHandler', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = mockRes();
    jest.clearAllMocks(); // 清空模拟函数调用记录
  });

  it('应该正确处理BusinessError', () => {
    // 准备测试数据
    const errorMsg = '余额不足，无法购买';
    const err = new BusinessError(errorMsg);

    // 执行测试
    errorHandler(err, req, res);

    // 验证结果
    expect(errorResponse).toHaveBeenCalledWith(res, errorMsg);
  });

  it('应该正确处理未知错误', () => {
    // 准备测试数据
    const unknownErr = new Error('数据库连接超时');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // 执行测试
    errorHandler(unknownErr, req, res);

    // 验证结果
    expect(consoleSpy).toHaveBeenCalledWith('Unexpected error:', unknownErr);
    expect(errorResponse).toHaveBeenCalledWith(res, 'Internal server error');

    // 恢复console
    consoleSpy.mockRestore();
  });
});