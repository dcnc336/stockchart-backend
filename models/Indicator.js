const mongoose  = require("mongoose");

const IndicatorSchema = new mongoose.Schema({
    type:{
        type: String,
        required : true
    },
    name: {
        type:String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    likes:{
        type: Number,
        required: true,
        default:0
    }
});

const Indicator = mongoose.model('Indicator',IndicatorSchema);

module.exports = Indicator;