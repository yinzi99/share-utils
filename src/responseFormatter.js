// 成功响应格式化
const successResponse = (res, data) => {
  res.status(200).json({
   data
  });
};

// 错误响应格式化
const errorResponse = (res, data) => {
  res.status(400).json({
    data
  });
};

module.exports = { successResponse, errorResponse };
    