const mongoose  = require("mongoose");

const StockperiodSchema = new mongoose.Schema({
    symbol_id: {
        type: String,
        required: true
    },
    period_name:{
        type: String,
        required : true
    },
    last_date:{
        type: String
    }
});

const Stockperiod = mongoose.model('Stockperiod',StockperiodSchema);

module.exports = Stockperiod;