const allowedStockSort = ['market_cap', 'change_percent', "turnover_rate", "pe_ratio", "pb_ratio", "ps_ratio"]; 
const allowedFundSort = ['fund_size', 'change_percent'];
const validOrders = ['ASC', 'DESC'];
const defaultStockSort = allowedStockSort[0];
const defaultFundSort = allowedFundSort[0];
const defaultOrder = validOrders[1];
const defaultPage = 1;
const defaultLimit = 20;


module.exports = {
    allowedStockSort,
    allowedFundSort,
    validOrders,
    defaultStockSort,
    defaultFundSort,
    defaultOrder,
    defaultPage,
    defaultLimit
}