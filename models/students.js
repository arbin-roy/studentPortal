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
    },
    phone: {
        type: Number,
        required: true
    },
    results:[
        {
            examination_name:{
                type: String,
                required:true
            },
            subject:{
                type:String,
                required:true
            },
            full_marks:{
                type:String,
                required:true
            },
            marks_obtained:{
                type:String,
                required:true
            }
        }
    ]

})

module.exports = mongoose.model('students', student)