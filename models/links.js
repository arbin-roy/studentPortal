const mongoose = require("mongoose")
const Schema = mongoose.Schema

const link = new Schema({
    subjectCode: {
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
    links: [{
        link: {
            type: String,
            required: true
        },
        desc: {
            type: String
        }
    }],
})

module.exports = Link = mongoose.model('links', link)