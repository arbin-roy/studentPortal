const router = require("express").Router()
const multerVideo = require("../config/multervideos")
const multerNote = require("../config/multernotes")
const multer = require("multer")
const uploadVideo = multer(multerVideo)
const uploadNote = multer(multerNote)
const normalize = require("normalize-path")

const Teacher = require("../models/teacher")
const Sem = require("../models/semdetails")
const Video = require("../models/videos")
const Note = require("../models/notes")

router.post('/uploadVideo', uploadVideo.single('video'), (req, res, next) => {
    Video.findOne({ sem: req.body.sem, dept: req.body.dept, subject: req.body.subject })
    .then(vid => {
        if(vid){
            const video = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) video.desc = req.body.desc
            vid.videos.push(video)
            Teacher.findOne({name: req.body.name})
            .then(teacher => {
                teacher.uploadedVideos.push({
                    title: req.body.title,
                    link: video.link
                })
                teacher.save().catch(next)
            })
            vid.save().then(_ => {
                res.json({
                    "success": true,
                    "message": video.title + " uploaded successfully"
                })
            }).catch(next)
        }else{
            const video = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) video.desc = req.body.desc
            const newVideoDocument = {
                sem: req.body.sem,
                dept: req.body.dept,
                subject: req.body.subject,
                videos: [video]
            }
            Teacher.findOne({name: req.body.name})
            .then(teacher => {
                teacher.uploadedVideos.push({
                    title: req.body.title,
                    link: video.link
                })
                teacher.save().catch(next)
            })
            Video.insertMany(newVideoDocument)
            .then(_ => {
                res.json({
                    "success": true,
                    "message": video.title + " uploaded successfully"
                })
            }).catch(next)
        }
    }).catch(next)
})

router.post('/uploadNote', uploadNote.single('note'), (req, res, next) => {
    Note.findOne({ sem: req.body.sem, dept: req.body.dept, subject: req.body.subject })
    .then(note => {
        if(note){
            const notes = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) notes.desc = req.body.desc
            note.notes.push(notes)
            Teacher.findOne({name: req.body.name})
            .then(teacher => {
                teacher.uploadedNotes.push({
                    title: req.body.title,
                    link: notes.link
                })
                teacher.save().catch(next)
            })
            note.save().then(_ => {
                res.json({
                    "success": true,
                    "message": notes.title + " uploaded successfully"
                })
            }).catch(next)
        }else{
            const note = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) video.desc = req.body.desc
            const newNoteDocument = {
                sem: req.body.sem,
                dept: req.body.dept,
                subject: req.body.subject,
                notes: [note]
            }
            Teacher.findOne({name: req.body.name})
            .then(teacher => {
                teacher.uploadedNotes.push({
                    title: req.body.title,
                    link: note.link
                })
                teacher.save().catch(next)
            })
            Note.insertMany(newNoteDocument)
            .then(_ => {
                res.json({
                    "success": true,
                    "message": note.title + " uploaded successfully"
                })
            }).catch(next)
        }
    }).catch(next)
})

module.exports = router