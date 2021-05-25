const router = require("express").Router()
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;
const multer = require("multer")
const upload = multer()
const validateRegister = require("../validation/student/user-registration");
const validateLogin = require("../validation/student/user-login");
const validateUpdate = require("../validation/student/user-update");
const validateSeekQuestion = require("../validation/student/seekQuestion");
const validateTakeExam = require("../validation/student/takeExam");
const validateSeeMarks = require("../validation/student/seeMarks");

const Student = require("../models/students")
const Question = require("../models/questions")
const AnswerSheet = require("../models/answerSheets")
const Result = require("../models/results")
const Video = require("../models/videos")
const Notes= require("../models/notes")

router.post('/login', (req, res, next) => {
    
    Student.findOne({roll: req.body.roll, password: req.body.password})
    .then(stu => {
        if(!stu){
            return res.status(404).json({
                "success": false,
                "errors": "No student found"
            })
        }
        const payload = {
            name: stu.name,
            id: stu.id
        }
        jwt.sign(payload, jwtKey, {expiresIn:60*60*3}, (err, token) => {
            if (err) return next;
            return res.status(200).json({
                "success": true,
                "data": stu,
                "token": "Bearer " + token
            })
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

router.put("/update", passport.authenticate('jwt-student', {session: false}), (req, res, next) => {
    const { isValid, errors } = validateUpdate(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            "errors": errors
        })
    }
    
    const object = {
        name: req.user.name,
        dept: req.user.dept,
        sem: req.user.sem,
        roll: req.user.roll,
        password: req.user.password,
        results: req.user.results,
        email: req.body.email,
        phone: req.body.phone
    }
    Student.updateOne({_id: req.user.id}, {$set: object}, {new: true})
    .then(stu => {
        if(stu.nModified == 1){
            res.json({
                "success": true,
                "message": "Profile successfully updated"
            })
        }else{
            errors.unknown = "Something went wrong!"
            res.status(500).json({
                "success": false,
                errors
            })
        }
    }).catch(next)
})

router.post("/seekQuestion", passport.authenticate("jwt-student", {session:false}), (req, res, next)=>{
    const { errors, isValid } = validateSeekQuestion(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }

    Question.findOne({dept: req.user.dept, sem: req.user.sem, subjectCode: req.body.subjectCode, examinationName: req.body.examinationName, subjectName: req.body.subjectName})
    .then(question=>{
        if(!question){
            errors.exam = "Please give the exam details properly"
            return res.status(404).json({
                "success":false,
                errors
            })
        }
        res.json({
            "success": true,
            "data": question
        })
    }).catch(next)
})

router.post("/takeExam", passport.authenticate("jwt-student", {session:false}), (req, res, next)=>{
    const { errors, isValid } = validateTakeExam(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }

    AnswerSheet.findOne({dept: req.user.dept, sem: req.user.sem, subjectCode: req.body.subjectCode, examinationName:req.body.examinationName, studentRoll: req.user.roll})
    .then(answersheet => {
        if(!answersheet){
            if(req.body.question_num){
                var marks
                Question.findOne({subjectCode: req.body.subjectCode, examinationName: req.body.examinationName, "mcqQuestions.question_num": req.body.question_num}, {_id: 0, "mcqQuestions.$": 1})
                .then(question=>{
                    if (question.mcqQuestions[0].correct_option === req.body.answer){
                        marks = question.mcqQuestions[0].marks_alloted
                    }
                    else{
                        marks = 0
                    }
                    const mcq = {
                        question_num: req.body.question_num,
                        question: req.body.question,
                        answer: req.body.answer,
                        marks: marks
                    }
                    const answerSheet = {
                        studentName: req.user.name,
                        studentRoll: req.user.roll,
                        subjectCode: req.body.subjectCode,
                        subjectName: req.body.subjectName,
                        sem: req.user.sem,
                        dept: req.user.dept,
                        examinationName: req.body.examinationName,
                        mcqAnswers: mcq
                    }
                    AnswerSheet.insertMany(answerSheet)
                    .then(_ => {
                        res.json({
                            "success": true,
                            "message": "Ans added"
                        })
                    }).catch(next)
                }).catch(next)
            }
            else if(req.body.question_number){
                const normalanswer = {
                    question_number: req.body.question_number,
                    question: req.body.question,
                    answer: req.body.answer,
                    max_marks: req.body.max_marks
                }
                const answerSheet = {
                    studentName: req.user.name,
                    studentRoll: req.user.roll,
                    subjectCode: req.body.subjectCode,
                    subjectName: req.body.subjectName,
                    sem: req.user.sem,
                    dept :req.user.dept,
                    examinationName: req.body.examinationName,
                    normalAnswers: normalanswer
                }
                AnswerSheet.insertMany(answerSheet)
                .then(_ => {
                    res.json({
                        "success": true,
                        "message": "Ans added"
                    })
                }).catch(next)
            }else{
                errors.question = "No question received"
                return res.status(404).json({
                    "success": false,
                    errors
                })
            }
        }
        else{
            if(req.body.question_num){
                var marks
                Question.findOne({subjectCode:req.body.subjectCode, examinationName:req.body.examinationName, "mcqQuestions.question_num":req.body.question_num}, {_id: 0, "mcqQuestions.$": 1})
                .then(question=>{
                    if (question.mcqQuestions[0].correct_option === req.body.answer){
                        marks = question.mcqQuestions[0].marks_alloted
                    }
                    else{
                        marks = 0
                    }
                    const mcq = {
                        question_num: req.body.question_num,
                        question: req.body.question,
                        answer: req.body.answer,
                        marks: marks
                    }
                    answersheet.mcqAnswers.push(mcq)
                    answersheet.save()
                    .then( _ => {
                        res.json({
                            "success": true,
                            "message": "Ans successfully added"
                        })
                    }).catch(next)
                }).catch(next)
            }
            else if(req.body.question_number){
                const normalanswer = {
                    question_number: req.body.question_number,
                    question: req.body.question,
                    answer: req.body.answer,
                    max_marks: req.body.max_marks
                }
                answersheet.normalAnswers.push(normalanswer)
                answersheet.save()
                .then( _=>{
                    res.json({
                        "success": true,
                        "message": "Ans successfully added"
                    })
                }).catch(next)
            }else{
                errors.question = "No question received"
                return res.status(404).json({
                    "success": false,
                    errors
                })
            }
        }
    }).catch(next)
})

router.get("/resultsPublished", passport.authenticate("jwt-student", {session:false}),(req, res, next)=>{
    Result.find({studentRoll: req.user.roll, dept: req.user.dept, sem: req.user.sem})
    .then(result=>{
        console.log(result, req.user)
        if (result === null){
            return res.status(404).json({
                "success":false,
                "error":"no results published yet"
            })
        }
        var subjects=[]
        console.log(result)
        for (subject of result){
            subjects.push(subject.subjectCode)
        }
        res.json({
            "success": true,
            "data": subjects
        })
    }).catch(next)
})

router.post("/seeMarks", passport.authenticate("jwt-student", {session:false}), (req, res,next)=>{
    const { errors, isValid } = validateSeeMarks(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }
    
    Result.findOne({studentRoll: req.user.roll, subjectCode: req.body.subjectCode, examinationName: req.body.examinationName, dept: req.user.dept})
    .then(result => {
        if(!result){
            errors.result = "No result found"
            return res.status(404).json({
                "success":false,
                errors
            })
        }
        const data = {
            mcqmarks: result.mcqMarks,
            normalQuestionMarks: result.normalQuestionMarks,
            totalMarks: result.totalMarks
        }
        res.json({
            "success": true,
            "message": data
        })
    }).catch(next)
})

module.exports = router