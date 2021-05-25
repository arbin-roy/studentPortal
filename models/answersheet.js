const mongoose = require("mongoose")
const Schema = mongoose.Schema

const answerSheet = new Schema({
    studentName:{
        type:String,
        required: true
    },
    studentRoll:{
        type:String,
        required: true
    },
    subjectCode:{
        type:String,
        required: true
    },
    subjectName:{
        type:String,
        required: true
    },
    sem:{
        type:Number,
        required: true
    },
    dept:{
        type:String,
        required: true
    },
    examinationName: {
        type: String,
        required: true
    },
    mcqAnswers:[{
        question_num:{
            type:String,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        marks:{
            type:Number,
            default:0
        }
    }],
    normalAnswers:[{
        question_number:{
            type:String,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String
        },
        max_marks:{
            type:Number,
            required:true
        },
        marks_alloted:{
            type:Number,
            default:0
        }
    }]
})

module.exports = mongoose.model('answersheets', answerSheet)