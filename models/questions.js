const mongoose = require("mongoose")
const Schema = mongoose.Schema

const question = new Schema({
    subjectName:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    sem:{
        type:Number,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    examinationName:{
        type:String,
        required:true
    },
    examinationTime: [{
        date: {
            type: String
        },
        time: {
            type: String
        }
    }],
    fullMarks: {
        type: Number
        //required: true
    },
    mcqQuestions:[{
        question_num:{
            type:Number,
            required:true
        },
        mcq_question:{
            type:String,
            required:true
        },
        options: [String],
        correct_option:{
            type:String,
            required:true
        },
        marks_alloted:{
            type:Number,
            required:true
        }
    }],
    normalQuestions:[{
        question_number:{
            type:Number,
            required:true
        },
        nor_question:{
            type:String,
            required:true
        },
        total_marks:{
            type:Number,
            required:true
        }
    }]
})

module.exports = mongoose.model("questions", question)