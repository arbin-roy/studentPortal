const router = require("express").Router()
const Student = require("../models/students")
const multer = require("multer")
const upload = multer()

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

module.exports = router