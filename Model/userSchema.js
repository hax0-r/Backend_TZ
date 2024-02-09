const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name:{
        type:String,
        reruired:true
    },
    email:{
        type:String,
        reruired:true,
        unique:true
    },
    password:{
        type:String,
        reruired:true,
    },
    phone:{
        type:Number,
        reruired:true,
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
})

const userModel = mongoose.model("user",schema)

module.exports = userModel 