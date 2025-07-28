const { BusinessError } = require('./errors');
const { errorResponse } = require('./responseFormatter');

const errorHandler = (err, req, res, next) => {
  // 已知业务错误
  if (err instanceof BusinessError) {
    return errorResponse(res, err.message);
  }

  // 未知错误（隐藏细节，返回通用消息）
  console.error("Unexpected error:", err);
  return errorResponse(res, "Internal server error");
};


module.exports = {
  errorHandler
};
    