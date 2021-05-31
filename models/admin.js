const mongoose = require("mongoose")
const Schema = mongoose.Schema

const admin = new Schema({
    name: {
        type: String,
        required: true
    },
    adminid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

module.exports = Admin = mongoose.model('admin', admin)