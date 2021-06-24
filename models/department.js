const mongoose = require("mongoose")
const Schema = mongoose.Schema

const department = new Schema({
    dept:[
        {
            type:String,
            required:true
        }
    ],
    subjects:[{
        subjectCode:{
            type:String,
            required:true
        },
        subjectName:{
            type:String,
            required:true
        }
    }]
})
module.exports = Departments = mongoose.model('departments', department)