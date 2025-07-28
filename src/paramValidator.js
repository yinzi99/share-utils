const { allowedStockSort, allowedFundSort, validOrders, defaultStockSort, defaultFundSort, defaultOrder, defaultLimit, defaultPage} = require('./constant.js');


function validateOfGetAll(req, type) {
  if (type === 'stock') {
    return validateOfGetAllStock(req);
  } else if (type === 'fund') {
    return validateOfGetAllFund(req);
  }
}

function validateOfGetAllStock(req) {
  const { page = defaultPage, limit = defaultLimit, sort = defaultStockSort, order = defaultOrder } = req.query;
  return {
    page: validatePage(page),
    limit: validateLimit(limit),
    sort: validateSort(sort, allowedStockSort),
    order: validateOrder(order)
  };
}

function validateOfGetAllFund(req) {
  const { page = defaultPage, limit = defaultLimit, sort = defaultFundSort, order = defaultOrder } = req.query; 
  return {
    page: validatePage(page),
    limit: validateLimit(limit),
    sort: validateSort(sort, allowedFundSort),
    order: validateOrder(order)
  };
}

function validatePage(page) {
  const pageNumber = Number(page);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return defaultPage; // 默认页码为1
  }
  return pageNumber;
}

function validateLimit(limit) {
  const limitNumber = Number(limit);
  if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 1000) {
    return defaultLimit; // 默认每页显示20条记录
  }
  return limitNumber;
}

function validateSort(sort, allowedSort) {
  if (!allowedSort.includes(sort)) {
    return allowedSort[0]; // 默认排序为第一个允许的排序字段
  }
  return sort;
}

function validateOrder(order) {
  if (!validOrders.includes(order.toUpperCase())) {
    return validOrders[0]; // 默认排序为降序
  }
  return order.toUpperCase();
}

function validateCode(code) {
  if (isNaN(code) || code.length !== 6) {
    throw new Error('Invalid stock code');
  }
  return code;
}

module.exports = {
    validateOfGetAll,
    validateOfGetAllStock,
    validateOfGetAllFund,
    validatePage,
    validateLimit,
    validateSort,
    validateOrder,
    validateCode,
    allowedFundSort,
    allowedStockSort
};
