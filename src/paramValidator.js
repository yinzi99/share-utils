const { allowedStockSort, allowedFundSort, validOrders, defaultStockSort, defaultFundSort, defaultOrder, defaultLimit, defaultPage} = require('./constant.js');
const { BusinessError } = require('./errors');

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
    throw new BusinessError('Invalid page number'); 
  }
  return pageNumber;
}

function validateLimit(limit) {
  const limitNumber = Number(limit);
  if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 1000) {
    throw new BusinessError('Invalid limit number'); 
  }
  return limitNumber;
}

function validateSort(sort, allowedSort) {
  if (!allowedSort.includes(sort)) {
    throw new BusinessError(`Invalid sort parameter. Allowed values are: ${allowedSort.join(', ')}`);
  }
  return sort;
}

function validateOrder(order) {
  if (!validOrders.includes(order.toUpperCase())) {
    throw new BusinessError(`Invalid order parameter. Allowed values are: ${validOrders.join(', ')}`);
  }
  return order.toUpperCase();
}

function validateCode(code) {
  if ( typeof code !== 'string' || !/^\d{6}$/.test(code)) {
    throw new BusinessError('Invalid stock code. It must be a 6-digit number');
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
