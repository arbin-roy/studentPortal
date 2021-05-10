const mongoose = require("mongoose")
const Schema = mongoose.Schema

const video = new Schema({
    subject: {
        type: String,
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
        }
    }],
})

module.exports = Video = mongoose.model('videos', video)