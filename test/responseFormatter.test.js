const { successResponse, errorResponse } = require('../src/responseFormatter');
const { describe, expect, test, beforeEach } = require('@jest/globals'); // 从@jest/globals导入jest



// 正确模拟 Express 响应对象（确保 status 和 json 是函数并返回自身）
const mockRes = () => {
  const res = {};
  // 关键修复：使用 jest.fn 定义 status 方法，且调用后返回 res 自身（链式调用）
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockImplementation(() => res);
  return res;
};

describe('Response Handlers', () => {
  let res;

  // 每次测试前重置模拟对象
  beforeEach(() => {
    res = mockRes();
    jest.clearAllMocks();
  });

  test('successResponse 应返回正确的成功响应', () => {
    const mockData = { data: 1234};
  
    successResponse(res, mockData);

    // 验证 status 被调用且参数为 200
    expect(res.status).toHaveBeenCalledWith(200);
    // 验证 json 被调用且返回正确格式
    expect(res.json).toHaveBeenCalledWith({
      data: mockData
    });
  });

  test('errorResponse 应返回正确的错误响应', () => {
    const mockMessage = '参数错误';

    errorResponse(res, mockMessage);

    // 验证 status 被调用且参数为 400
    expect(res.status).toHaveBeenCalledWith(400);
    // 验证 json 被调用且返回正确格式
    expect(res.json).toHaveBeenCalledWith({
      message: mockMessage
    });
  });
});