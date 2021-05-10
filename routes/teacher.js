const router = require("express").Router()
const multerVideo = require("../config/multer")
const multer = require("multer")
const uploadVideo = multer(multerVideo)
const normalize = require("normalize-path")

const Teacher = require("../models/teacher")
const Sem = require("../models/semdetails")
const Video = require("../models/videos")

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

module.exports = router