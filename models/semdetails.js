const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sem = new Schema({
    videos: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        desc: {
            type: String
        },
        teacherName: {
            type: String,
            required: true
        }
    }],
    notes: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        teacherName: {
            type: String,
            required: true
        }
    }],
    notices: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }],
    activities: [{
        title: {
            type: String,
            required: true
        },
        poster: {
            type: String
        },
        desc: {
            type: String,
            required: true
        }
    }],
    exams: [{
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    }]
})

module.exports = Sems = mongoose.model('sems', sem)