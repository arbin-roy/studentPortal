const mongoose = require("mongoose")
const Schema = mongoose.Schema

const teacher = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
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
        }
    }]
})

module.exports = Teacher = mongoose.model('teachers', teacher)