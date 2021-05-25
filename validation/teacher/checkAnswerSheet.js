const Validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''
    data.roll = !isEmpty(data.roll) ? data.roll : ''
    data.question_number = !isEmpty(data.question_number) ? data.question_number : ''
    data.question = !isEmpty(data.question) ? data.question : ''
    data.answer = !isEmpty(data.answer) ? data.answer : ''
    data.max_marks = !isEmpty(data.max_marks) ? data.max_marks : ''
    data.marks_alloted = !isEmpty(data.marks_alloted) ? data.marks_alloted : ''

    if(!Validator.isLength(data.subjectCode, {min: 2})){
        errors.subjectCode = "Subject code must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectCode)) errors.subjectCode = "Subject code field is required"
    
    if(!Validator.isLength(data.examinationName, {min: 2})){
        errors.examinationName = "Examination name must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.examinationName)) errors.examinationName = "Examination name field is required"
    
    if(!Validator.isLength(data.roll, {min: 5})){
        errors.roll = "Roll must contain minimum of 5 characters"
    }

    if(Validator.isEmpty(data.roll)) errors.roll = "Roll field is required"
    
    if(Validator.isEmpty(data.max_marks)) errors.max_marks = "Max marks field is required"
    
    if(Validator.isEmpty(data.marks_alloted)) errors.marks_alloted = "Marks alloted field is required"
    
    if(!Validator.isLength(data.question, {min: 5})){
        errors.question = "Question must contain minimum of 5 characters"
    }

    if(Validator.isEmpty(data.question)) errors.question = "Question field is required"

    if(Validator.isEmpty(data.answer)) errors.answer = "Answer field is required"

    if(Validator.isEmpty(data.question_number)) errors.question_number = "Question number field is required"

    return {
        errors,
        isValid: isEmpty(errors)
    }
}