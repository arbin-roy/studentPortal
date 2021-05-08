const router = require("express").Router()
const multerConfig = require("../config/multer")
const multer = require("multer")
const upload = multer(multerConfig)
const normalize = require("normalize-path")

const Teacher = require("../models/teacher")
const Sem = require("../models/semdetails")

router.post('/uploadVideo', upload.single('video'), (req, res, next) => {
    Sem.findOne({ sem: req.body.sem, dept: req.body.dept })
    .then(sem => {
        if(sem){
            const video = {
                title: req.body.title,
                link: normalize(req.file.path),
                teacherName: req.body.name
            }
            if(req.body.desc) video.desc = req.body.desc
            sem.videos.push(video)
            Teacher.findOne({name: req.body.name})
            .then(teacher => {
                teacher.uploadedVideos.push({
                    title: req.body.title,
                    link: video.link
                })
                teacher.save().catch(next)
            })
            sem.save().then(_ => {
                res.json({
                    "success": true,
                    "message": "Video uploaded successfully"
                })
            }).catch(next)
        }
    }).catch(next)
})

module.exports = router