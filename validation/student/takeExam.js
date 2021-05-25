const Validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''
    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : ''

    if(!Validator.isLength(data.subjectName, {min: 4})){
        errors.subjectName = "Subject name must contain minimum of 4 characters"
    }

    if(Validator.isEmpty(data.subjectName)){
        errors.subjectName = "Subject name field is required"
    }
    
    if(!Validator.isLength(data.subjectCode, {min: 2})){
        errors.subjectCode = "Subject code must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectCode)){
        errors.subjectCode = "Subject code field is required"
    }
    
    if(!Validator.isLength(data.examinationName, {min: 2})){
        errors.examinationName = "Examination name must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.examinationName)){
        errors.examinationName = "Examination name field is required"
    }
    
    if(data.question_num){
        data.question = !isEmpty(data.question) ? data.question : ''
        data.answer = !isEmpty(data.answer) ? data.answer : ''
        data.marks = !isEmpty(data.marks) ? data.marks : ''
        data.question_num = !isEmpty(data.question_num) ? data.question_num : ''

        if(!Validator.isLength(data.question, {min: 5})){
            errors.question = "Question field must have minimum of 5 characters"
        }

        if(Validator.isEmpty(data.answer)){
            errors.answer = "Answer field is required"
        }
        
        if(Validator.isEmpty(data.marks)){
            errors.marks = "Marks field is required"
        }
        
        if(Validator.isEmpty(data.question_num)){
            errors.question_num = "This field is required"
        }
    }else if(data.question_number){
        data.question = !isEmpty(data.question) ? data.question : ''
        data.answer = !isEmpty(data.answer) ? data.answer : ''
        data.max_marks = !isEmpty(data.max_marks) ? data.max_marks : ''
        data.question_number = !isEmpty(data.question_number) ? data.question_number : ''

        if(!Validator.isLength(data.question, {min: 5})){
            errors.question = "Question field must have minimum of 5 characters"
        }

        if(Validator.isEmpty(data.max_marks)){
            errors.max_marks = "Maximum marks field is required"
        }
        
        if(Validator.isEmpty(data.question_number)){
            errors.question_number = "Question number field is required"
        }
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}