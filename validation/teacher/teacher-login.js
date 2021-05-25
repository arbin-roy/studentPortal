const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = data => {
    let errors = {};

    data.teacherId = !isEmpty(data.teacherId) ? data.teacherId : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    
    if(Validator.isEmpty(data.teacherId)){
        errors.teacherId = 'TeacherId field is required'
    }

    if(!Validator.isLength(data.password, { min: 8, max: 30 })){
        errors.password = 'Password should be in between 8 to 30 characters'
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
}