const router = require("express").Router()
const multerVideo = require("../config/multervideos")
const multerNote = require("../config/multernotes")
const multer = require("multer")
const uploadVideo = multer(multerVideo)
const uploadNote = multer(multerNote)
const normalize = require("normalize-path")
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;

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
        jwt.sign(payload, jwtKey, {expiresIn:60*60*3}, (err, token) => {
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

router.post('/uploadVideo', passport.authenticate('jwt-teacher', {session: false}), uploadNote.single('note'), (req, res, next) => {
    Note.findOne({ sem: Number(req.body.sem), dept: req.user.dept, subjectCode: req.body.subjectCode })
    .then(notes => {
        if(notes){
            const note = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) note.desc = req.body.desc
            notes.notes.push(note)
            Teacher.findById(req.user.id)
            .then(teacher => {
                teacher.uploadedVideos.push({
                    title: req.body.title,
                    link: note.link
                })
                teacher.save().catch(next)
            })
            notes.save().then(_ => {
                res.json({
                    "success": true,
                    "message": note.title + " uploaded successfully"
                })
            }).catch(next)
        }else{
            const note = {
                title: req.body.title,
                link: normalize(req.file.path)
            }
            if(req.body.desc) note.desc = req.body.desc
            const newNoteDoc = {
                sem: req.body.sem,
                dept: req.user.dept,
                subjectCode: req.body.subject,
                notes: [note]
            }
            Teacher.findById(req.user.id)
            .then(teacher => {
                teacher.uploadedVideos.push({
                    title: req.body.title,
                    link: note.link
                })
                teacher.save().catch(next)
            })
            Note.insertMany(newNoteDoc)
            .then(_ => {
                res.json({
                    "success": true,
                    "message": note.title + " uploaded successfully"
                })
            }).catch(next)
        }
    }).catch(next)
})

router.get("/uploadedvideos", passport.authenticate("jwt-teacher",{session:false}), (req,res,next)=>{
    return res.status(200).json({
        "success": true,
        "data": req.user.uploadedVideos
    })
})
router.get("/uploadednotes", passport.authenticate("jwt-teacher",{session:false}), (req,res,next)=>{
    return res.status(200).json({
        "success": true,
        "data": req.user.uploadedNotes
    })
})

router.get("/getsubjects", passport.authenticate("jwt-teacher",{session:false}), (req,res,next)=>{
    return res.status(200).json({
        "success": true,
        "data": req.user.subjects
    })
})

//examination system starts here:
router.post("/setQuestionPaper", passport.authenticate('jwt-teacher', {session: false}), (req, res, next) => {
    const { errors, isValid } = validateQuestion(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }

    Question.findOne({subjectCode: req.body.subjectCode, examinationName: req.body.examinationName})
    .then(paper => {
        if(!paper){
            if(req.body.mcq_question){
                const question = new Question({
                    subjectName: req.body.subjectName,
                    subjectCode: req.body.subjectCode,
                    sem: req.body.sem,
                    dept: req.body.dept,
                    examinationName: req.body.examinationName
                })
            
                const optionArray = req.body.options.split(',')
                const options = []
                for(option of optionArray){
                    options.push(option)
                }
            
                const mcq = {
                    question_num:req.body.question_num,
                    mcq_question: req.body.mcq_question,
                    options: options,
                    correct_option: req.body.correct_option,
                    marks_alloted: req.body.marks_alloted
                }
            
                question.mcqQuestions = [mcq]
                
                question.save()
                .then(mquestion => {
                    res.json({
                        "success": true,
                        "message": "MCQ successfully added"
                    })
                }).catch(next)
            }else if(req.body.nor_question){
                const question = new Question({
                    subjectName: req.body.subjectName,
                    subjectCode: req.body.subjectCode,
                    sem: req.body.sem,
                    dept: req.body.dept,
                    examinationName: req.body.examinationName
                })

                const nq = {
                    question_number:req.body.question_number,
                    nor_question: req.body.nor_question,
                    total_marks: req.body.total_marks
                }
                
                question.normalQuestions = [nq]

                question.save()
                .then(nquestion => {
                    res.json({
                        "success": true,
                        "message": "Normal question successfully added"
                    })
                }).catch(next)
            }else{
                errors.question = "No questions received"
                return res.status(404).json({
                    "success": false,
                    errors
                })
            }
        }else{
            if(req.body.mcq_question){
                const optionArray = req.body.options.split(',')
                const options = []
                for(option of optionArray){
                    options.push(option)
                }
            
                const mcq = {
                    question_num:req.body.question_num,
                    mcq_question: req.body.mcq_question,
                    options: options,
                    correct_option: req.body.correct_option,
                    marks_alloted: req.body.marks_alloted
                }

                paper.mcqQuestions.push(mcq)

                paper.save()
                .then(mquestion => {
                    res.json({
                        "success": true,
                        "message": "MCQ successfully added"
                    })
                }).catch(next)
            }else if(req.body.nor_question){
                const nq = {
                    question_number:req.body.question_number,
                    nor_question: req.body.nor_question,
                    total_marks: req.body.total_marks
                }
                
                paper.normalQuestions.push(nq)

                paper.save()
                .then(nquestion => {
                    res.json({
                        "success": true,
                        "message": "Normal question successfully added"
                    })
                }).catch(next)
            }else{
                errors.question = "No questions received"
                return res.status(404).json({
                    "success": false,
                    errors
                })
            }
        }
    }).catch(next)
})

router.post("/seeQuestionPaper", passport.authenticate('jwt-teacher', {session:false}), (req, res, next)=>{
    const { isValid, errors } = validateSeeQuestion(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }
    
    Teacher.findOne({"subjects.subject_name": req.body.subjectName})
    .then(sub=>{
        if(!sub){
            errors.subject = "Please check for authorized subjects"
            return res.status(409).json({
                "success":false,
                errors
            })
        }
        Question.findOne({subjectName: req.body.subjectName, subjectCode: req.body.subjectCode, examinationName: req.body.examinationName})
        .then(qpaper=>{
            if(!qpaper){
                errors.question = "No question paper made for this subject till now"
                return res.status(404).json({
                    "success":false,
                    errors
                    })
                }
            res.json({
                "success": true,
                "data": qpaper
            })
        }).catch(next)
    }).catch(next)
})

router.put("/updateQuestionPaper", passport.authenticate("jwt-teacher", {session: false}), (req, res, next)=>{
    const { isValid, errors } = validateUpdateQuestion(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }
    
    Teacher.findOne({"subjects.subject_name": req.body.subject_name})
    .then(sub=>{
        if(!sub){
            errors.subject = "Please check for authorized subjects"
            return res.status(409).json({
                "success":false,
                errors
            })
        }
        if(req.body.question_num){
            const optionArray = req.body.options.split(',')
            const options = []
            for(option of optionArray){
                options.push(option)
            }
            const mcq = {
                question_num:req.body.question_num,
                mcq_question: req.body.mcq_question,
                options: options,
                correct_option: req.body.correct_option,
                marks_alloted: req.body.marks_alloted
            }
            Question.findOneAndUpdate({subjectCode: req.body.subjectCode, examinationName: req.body.examinationName,
            "mcqQuestions.question_num": req.body.question_num}, {$set:{"mcqQuestions.$":mcq}},
            {new:true})
            .then(mcq=>{
                if(mcq === null){
                    errors.question = "Question update unsuccessful"
                    return res.status(400).json({
                        "success": false,
                        errors
                    })
                }
                return res.json({
                    "success":true,
                    "message":"Question updated successfully"
                })
            }).catch(next)
        }
        if(req.body.question_number){
            const norQuestion = {
                question_number:req.body.question_number,
                nor_question: req.body.nor_question,
                total_marks: req.body.total_marks
            }
            Question.findOneAndUpdate({subjectCode:req.body.subjectCode, examinationName:req.body.examinationName,
            "normalQuestions.question_number":req.body.question_number}, {$set:{"normalQuestions.$":norQuestion}},
            {new:true})
            .then(nq=>{
                if(nq === null){
                    errors.question = "Question update unsuccessful"
                    return res.status(400).json({
                        "success": false,
                        errors
                    })
                }
                return res.json({
                    "success":true,
                    "message":"Question updated successfully"
                })
            }).catch(next)
        }
    }).catch(next)
})

router.post("/seekAnswerSheet", passport.authenticate("jwt-teacher", {session:false}), (req,res,next)=>{
    const { isValid, errors } = validateSeekAnswer(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }
    
    AnswerSheet.findOne({subjectCode: req.body.subjectCode, examinationName: req.body.examinationName, studentRoll:req.body.roll})
    .then(answersheet=>{
        if(!answersheet){
            errors.answer = "No answer sheet found"
            return res.status(404).json({
                "success": false,
                errors
            })
        }
        res.json({
            "success": true,
            "data": answersheet
        })
    }).catch(next)
})

router.post("/checkAnswerSheet", passport.authenticate("jwt-teacher", {session:false}), (req, res, next)=>{
    const { isValid, errors } = validateCheckAnswer(req.body)
    if(!isValid){
        return res.status(400).json({
            "success": false,
            errors
        })
    }
    
    const normalAnswerMarks = {
        question_number:req.body.question_number,
        question:req.body.question,
        answer:req.body.answer,
        max_marks:req.body.max_marks,
        marks_alloted:req.body.marks_alloted
    }
    AnswerSheet.findOneAndUpdate({subjectCode: req.body.subjectCode, examinationName: req.body.examinationName, studentRoll:req.body.roll, "normalAnswers.question_number":req.body.question_number},
    {$set: {"normalAnswers.$": normalAnswerMarks}},
    {new: true})
    .then(answersheet=>{
        if(answersheet === null){
            errors.marks = "Unsuccessful in updating marks"
            return res.status(409).json({
                "success":false,
                errors
            })
        }
        res.json({
            "success":true,
            "message": "Marks updation successful"
        })
    }).catch(next)
})

module.exports = router