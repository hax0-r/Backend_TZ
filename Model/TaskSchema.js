const mongoose = require("mongoose");
const schema = mongoose.Schema({
    title: {
        type: String,
        reruired: true
    },
    description: {
        type: String,
        reruired: true,
    },
    status: {
        type: String,
        reruired: true,
    },
    date: {
        type: Date
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model("user", schema)

module.exports = userModel 