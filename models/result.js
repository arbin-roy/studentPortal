const mongoose = require("mongoose")
const Schema = mongoose.Schema

const result = new Schema({
    studentName:{
        type:String,
        required:true
    },
    studentRoll:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    subjectName:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    sem:{
        type:Number,
        required:true
    },
    examinationName:{
        type:String,
        required:true
    },
    mcqMarks:{
        type:Number,
        required:true
    },
    normalQuestionMarks:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model('results', result)