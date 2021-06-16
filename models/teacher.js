const mongoose = require("mongoose")
const Schema = mongoose.Schema

const teacher = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherId:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    uploadedVideos: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        desc: {
            type: String,
        }
    }],
    uploadedNotes: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        desc: {
            type: String,
        }
    }],
    uploadedLinks: [{
        link: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required:true
        }
    }],
    subjects: [{
        subjectCode: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }]
})

module.exports = Teacher = mongoose.model('teachers', teacher)