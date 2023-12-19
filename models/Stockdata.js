const mongoose  = require("mongoose");

const StockdataSchema = new mongoose.Schema({
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

const Stockdata = mongoose.model('Stockdata',StockdataSchema);

module.exports = Stockdata;