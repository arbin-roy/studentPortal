const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notes = new Schema({
    sem: {
        type: Number,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    notes: [{
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
    }]
})

module.exports = Notes = mongoose.model('notes', notes)