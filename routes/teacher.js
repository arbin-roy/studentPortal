const router = require("express").Router()
const multerVideo = require("../config/multervideos")
const multerNote = require("../config/multernotes")
const multer = require("multer")
const uploadVideo = multer(multerVideo)
const uploadNote = multer(multerNote)
const normalize = require("normalize-path")
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;

const Teacher = require("../models/teacher")
const Sem = require("../models/semdetails")
const Video = require("../models/videos")
const Note = require("../models/notes")
const passport = require("passport")


router.post('/login', (req, res, next) => {
    Teacher.findOne({name: req.body.roll, password: req.body.password})
    .then(teacher => {
        if(!teacher){
            return res.status(404).json({
                "success": false,
                "errors": "No Teacher found"
            })
        }
        const payload = {
            name: teacher.name,
            id: teacher.id
        }
        jwt.sign(payload, jwtKey, (err, token) => {
            if (err) return next;
            return res.status(200).json({
                "success": true,
                "data": teacher,
                "token": "Bearer " + token
            })
        })
    }).catch(next)
})

router.post('/uploadVideo', passport.authenticate('jwt-teacher', {session: false}), uploadVideo.single('video'), (req, res, next) => {
    Video.findOne({ sem: Number(req.body.sem), dept: req.user.dept, subjectCode: req.body.subjectCode })
    .then(vid => {
        if(vid){
            const video = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) video.desc = req.body.desc
            vid.videos.push(video)
            Teacher.findById(req.user.id)
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
                dept: req.user.dept,
                subjectCode: req.body.subject,
                videos: [video]
            }
            Teacher.findById(req.user.id)
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