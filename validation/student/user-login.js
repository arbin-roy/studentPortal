const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = data => {
    let errors = {};

    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.phone, { min: 10, max: 10 })){
        errors.phone = 'Phone should be of 10 numbers'
    }
    
    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Phone field is required'
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