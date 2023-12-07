const mongoose  = require("mongoose");

const StockperiodSchema = new mongoose.Schema({
    period_name:{
        type: String,
        required : true
    }
});

const Stockperiod = mongoose.model('Stockperiod',StockperiodSchema);

module.exports = Stockperiod;