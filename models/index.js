const User = require('./User');
const Stockdata = require('./Stockdata');
const StockdataDaily = require('./StockdataDaily');
const Stocktype = require('./Stocktype');
const Stockperiod = require('./Stockperiod');
const createDynamicModel = require('./createDynamicModel');

module.exports = {
    User,
    Stockdata,
    StockdataDaily,
    Stocktype,
    Stockperiod,
    createDynamicModel
}