const Validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''
    data.roll = !isEmpty(data.roll) ? data.roll : ''

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}