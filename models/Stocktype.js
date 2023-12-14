const mongoose  = require("mongoose");

const StocktypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    icon: {
        type: String
    }
});

const Stocktype = mongoose.model('Stocktype',StocktypeSchema);

module.exports = Stocktype;