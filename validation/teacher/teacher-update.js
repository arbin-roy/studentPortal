const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid'
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    if(!Validator.isLength(data.phone, { min: 10, max: 10 })){
        errors.phone = 'Phone should be minimum and maximum of 10 numbers'
    }

    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Phone field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
}