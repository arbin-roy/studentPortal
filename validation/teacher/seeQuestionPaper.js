const validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : ''
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''

    if(!Validator.isLength(data.subjectName, {min: 2})){
        errors.subjectName = "Subject name must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectName)) errors.subjectName = "Subject name field is required"
    
    if(!Validator.isLength(data.subjectCode, {min: 2})){
        errors.subjectCode = "Subject code must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectCode)) errors.subjectCode = "Subject code field is required"
    
    if(!Validator.isLength(data.examinationName, {min: 4})){
        errors.examinationName = "Examination name must contain minimum of 4 characters"
    }

    if(Validator.isEmpty(data.examinationName)) errors.examinationName = "Examination name field is required"

    return {
        errors,
        isValid: isEmpty(errors)
    }
}