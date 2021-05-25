const validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''
    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : ''

    if(!validator.isLength(data.subjectCode, {min: 2})){
        errors.subjectCode = "Subject code must be minimun of 2 characters"
    }

    if(validator.isEmpty(data.subjectCode)){
        errors.subjectCode = "Subject Code field is required"
    }
    
    if(!validator.isLength(data.subjectName, {min: 4})){
        errors.subjectName = "Subject name must be minimun of 4 characters"
    }

    if(validator.isEmpty(data.subjectName)){
        errors.subjectName = "Subject name field is required"
    }
    
    if(!validator.isLength(data.examinationName, {min: 4})){
        errors.examinationName = "Examination name must be minimun of 4 characters"
    }

    if(validator.isEmpty(data.examinationName)){
        errors.examinationName = "Examination name field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}