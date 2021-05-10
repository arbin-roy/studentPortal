const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sem = new Schema({
    dept: {
        type: String,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
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

module.exports = Sems = mongoose.model('semesters', sem)