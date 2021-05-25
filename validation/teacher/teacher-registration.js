const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = data => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.teacherId = !isEmpty(data.teacherId) ? data.teacherId : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.dept = !isEmpty(data.dept) ? data.dept : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be in between 2 to 30 characters'
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required'
    }

    if(!Validator.isLength(data.phone, { min: 10, max: 10 })){
        errors.phone = 'Phone should be of 10 numbers'
    }
    
    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Phone field is required'
    }
    
    if(Validator.isEmpty(data.teacherId)){
        errors.teacherId = 'TeacherId field is required'
    }

    if(data.email){
        if(!Validator.isEmail(data.email)){
            errors.email = 'Email is not valid'
        }
    }

    if(!Validator.isLength(data.password, { min: 8, max: 30 })){
        errors.password = 'Password must be at least 8 characters'
    }
    
    if(Validator.isEmpty(data.password)) errors.password = "Password field is requierd"

    
    if(Validator.isEmpty(data.dept)){
        errors.dept = 'Department field is required'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
}