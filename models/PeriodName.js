const mongoose  = require("mongoose");

const PeriodNameSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    label: {
        type:String,
        required: true
    }

});

const PeriodName = mongoose.model('PeriodName',PeriodNameSchema);

module.exports = PeriodName;