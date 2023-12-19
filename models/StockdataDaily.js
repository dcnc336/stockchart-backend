const mongoose  = require("mongoose");

const StockdataDailySchema = new mongoose.Schema({
    period_id:{
        type: String,
        required : true
    },
    date : {
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    high: {
        type: String,
        required: true
    },
    low: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    }
});

const StockdataDaily = mongoose.model('StockdataDaily',StockdataDailySchema);

module.exports = StockdataDaily;