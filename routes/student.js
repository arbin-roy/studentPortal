const router = require("express").Router()
const Student = require("../models/students")
const multer = require("multer")
const upload = multer()

const Video = require("../models/videos")
const Notes= require("../models/notes")

router.post('/login', upload.none(), (req, res, next) => {
    Student.findOne({roll: req.body.roll, password: req.body.password})
    .then(stu => {
        if(!stu){
            return res.status(404).json({
                "success": false,
                "errors": "No student found"
            })
        }

        return res.status(200).json({
            "success": true,
            "data": stu
        })
    }).catch(next)
})

router.post('/videos', upload.none(), (req, res, next) => {
    Video.find({ sem: req.body.sem, dept: req.body.dept })
    .then(videos => {
        if(videos){
            return res.json({
                "seccess": true,
                "data": videos
            })
        }
        return res.status(404).json({
            "success": false,
            "error": "No videos found for your department and semester"
        })
    }).catch(next)
})

router.post('/notes', upload.none(), (req, res, next) => {
    Notes.find({ sem: req.body.sem, dept: req.body.dept })
    .then(Notes => {
        if(notes){
            return res.json({
                "seccess": true,
                "data": notes
            })
        }
        return res.status(404).json({
            "success": false,
            "error": "No notes found for your department and semester"
        })
    }).catch(next)
})

module.exports = router