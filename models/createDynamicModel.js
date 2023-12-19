const mongoose  = require("mongoose");

const createDynamicModel = (modelName) => {
    const StockdataSchema = new mongoose.Schema({
        type: {
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
    const Dynamicdata = mongoose.model(modelName,StockdataSchema);
    return Dynamicdata;
}

module.exports = createDynamicModel;