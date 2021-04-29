const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('students', student)