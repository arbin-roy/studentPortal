const router = require("express").Router()
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;
const passport = require("passport")

const Admin = require("../models/admin")
const Teacher = require("../models/teacher")

router.post('/login', (req, res, next) => {
    console.log(req.body.roll, req.body.password)
    Admin.findOne({adminid: req.body.roll, password: req.body.password})
    .then(admin => {
        if(!admin){
            return res.status(404).json({
                "success": false,
                "errors": "No admin found"
            })
        }
        const payload = {
            name: admin.name,
            id: admin.id
        }
        jwt.sign(payload, jwtKey, {expiresIn:60*60*3}, (err, token) => {
            if (err) return next;
            return res.status(200).json({
                "success": true,
                "data": admin,
                "token": "Bearer " + token
            })
        })
    }).catch(next)
})

router.post('/addTeacher', passport.authenticate('jwt-admin',{session:false}), (req, res, next)=>{
    Teacher.findOne({teacherId: req.body.teacherId, dept: req.body.dept})
    .then(teacher => {
        if(teacher){
            return res.status(409).json({
                success:"false",
                error:"Teacher already present"
            })
        }
        else{
            const newteacher = {
                name: req.body.name,
                teacherId: req.body.teacherId,
                dept: req.body.dept,
                password: req.body.password,
                subjects: req.body.subjects
            }
            Teacher.insertMany(newteacher)
            .then(()=>{res.status(200).json({
                success:"true",
                message:req.body.name+" added to teachers"
            })
          })   
        } 
    }).catch(next)
})

module.exports = router