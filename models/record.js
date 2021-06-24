const mongoose = require("mongoose")
const Schema = require(mongoose.Schema)

const records = new Schema({
    teacherName:{
        type:String,
        required:true
    },
    teacherId:{
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
    subject:[{
        subjectName:{
            type:String,
            required:true
        },
        subjectCode:{
            type:String,
            required:true
        }
    }],
    platformUsed:{
        type:String,
        required:true
    },
    topicCovered:{
        type:String,
        required:true
    },
    whether_recorded: {
        type:String,
        required:true
    },
    start: {
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    date_time: {
        type:String,
        required:true
    },
    duration: {
        type:String,
        required:true
    },
    students_attended: {
        type:Number,
        required:true
    },
    total_students: {
        type:Number,
        required:true
    },
    notes: {
        type:String,
        required:true
    },
    assignment_given: {
        type:String,
        required:true
    },
    assignment_submitted: {
        type:String,
        required:true
    },
    test_conducted:{
        type:String,
        required:true
    },
    remarks: {
        type:String,
        required:true
    },
    
})

/* addRecord = new FormGroup({
    sem: new FormControl(''),
    course: new FormControl(''),
    subject: new FormControl({}),
    topic_covered:new FormControl(''),
    platform_used: new FormControl(''),
    whether_recorded: new FormControl(''),
    start: new FormControl(),
    end: new FormControl(),
    date_time: new FormControl(''),
    duration: new FormControl(),
    students_attended: new FormControl(''),
    total_students: new FormControl(''),
    notes: new FormControl(''),
    assignment_given: new FormControl(''),
    assignment_submitted: new FormControl(''),
    test_conducted: new FormControl(''),
    remarks: new FormControl(''),
  }); */