const validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subject_code = !isEmpty(data.subject_code) ? data.subject_code : ''
    data.subject_name = !isEmpty(data.subject_name) ? data.subject_name : ''

    if(!validator.isLength(data.subject_code, {min: 3})){
        errors.subject_code = "Subject code must be minimum of 3 characters"
    }

    if(validator.isEmpty(data.subject_code)) errors.subject_code = "Subject code field is request"
    
    if(!validator.isLength(data.subject_name, {min: 4})){
        errors.subject_name = "Subject name must be minimum of 4 characters"
    }

    if(validator.isEmpty(data.subject_name)) errors.subject_name = "Subject name field is request"

    return {
        errors,
        isValid: isEmpty(errors)
    }
}