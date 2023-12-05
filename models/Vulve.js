const mongoose  = require("mongoose");

const VulveSchema = new mongoose.Schema({
    userId : {
        type: String,
    },
    vulveName : {
        type: String,
        require : true
    },
    nickName:{
        type:String
    },
    vulveIp : {
        type : String,
        default: ""
    },
    type : {
        type: Number,
    },
    flowValue : {
        type : Number,
        default : 0
    },
    is_online : {
        type: Boolean,
        require : true
    },
    s_user_id:{
        type:String
    }
})

const Vulve = mongoose.model("Vulve" , VulveSchema);

module.exports = Vulve ;