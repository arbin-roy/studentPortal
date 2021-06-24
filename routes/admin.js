const router = require("express").Router()
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;
const passport = require("passport")

const Admin = require("../models/admin")
const Teacher = require("../models/teacher")
const SemDetails = require("../models/semdetails")
const Department = require("../models/department")

router.post('/login', (req, res, next) => {
    console.log(req.body.roll, req.body.password)
    Admin.findOne({adminId: req.body.roll, password: req.body.password})
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
                depts: req.body.dept,
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

router.post("/addsub", passport.authenticate("jwt-admin",{session:false}), (req,res,next)=>{
    SemDetails.findOne({dept:req.body.dept,sem:Number(req.body.sem)})
    .then(dept=>{
        if(dept){
            for(x of req.body.subject){
                dept.subjects.push(x)
            }
            dept.save()
            .then(_=>{
                res.status(200).json({
                    "success":true,
                    "message":"Subjects added successfully"
                })

            })
            Department.find()
            .then(result=>{
                console.log(result.dept)
                if(!result){
                    const newdept ={
                        dept:[req.body.dept],
                        subjects:req.body.subject
                    }
                    console.log(newdept)
                    Department.insertMany(newdept)
                }
                else{
                    console.log(result.dept)
                    var count=0
                    for(x of result.dept){
                        if(x==req.body.dept){
                            count=count+1;
                            break
                        }
                    }
                    if(count==0){
                        result.dept.push(req.body.dept)
                    }
                    for(x of req.body.subject){
                        result.subjects.push(x)
                    }
                    result.save()
                    .then(_=>{})
                }
            }).catch(next)
        }   
        else{
            const newdept = {
                dept:req.body.dept,
                sem:Number(req.body.sem),
                subjects:req.body.subject
            }
            SemDetails.insertMany(newdept)
            Department.find()
            .then(result=>{
                if(!result){
                    const newdept ={
                        dept:[req.body.dept],
                        subjects:req.body.subject
                    }
                    console.log(newdept)
                    Department.insertMany(newdept)
                }
                else{
                    console.log(result.dept)
                    var count=0
                    for(x of result.dept){
                        if(x==req.body.dept){
                            count=count+1;
                            break
                        }
                    }
                    if(count==0){
                        result.dept.push(req.body.dept)
                    }
                    for(x of req.body.subject){
                        result.subjects.push(x)
                    }
                    result.save()
                    .then(_=>{}).catch(next)
                }

               
            }).catch(next)
        }
    })
})

router.get("/getsub", passport.authenticate("jwt-admin",{session:false}), (req,res)=>{
    Department.find()
    .then(result=>{
        if(result.length==0){
            return res.json({
                "success":false,
                "error":"No subjects found"
            })
        }
        else{
            return res.json({
                "success":true,
                "data":result
            })
        }
    })
})

module.exports = router