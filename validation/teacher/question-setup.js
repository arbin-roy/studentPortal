const Validator = require("validator")
const isEmpty = require("../is-empty")

module.exports = data => {
    let errors = {}

    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : ''
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : ''
    data.sem = !isEmpty(data.sem) ? data.sem : ''
    data.dept = !isEmpty(data.dept) ? data.dept : ''
    data.examinationName = !isEmpty(data.examinationName) ? data.examinationName : ''
    data.mcq_question = !isEmpty(data.mcq_question) ? data.mcq_question : ''
    data.nor_question = !isEmpty(data.nor_question) ? data.nor_question : ''

    if(!Validator.isLength(data.subjectName, {min: 2})){
        errors.subjectName = "Subject name must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectName)){
        errors.subjectName = "This field is required"
    }
    
    if(!Validator.isLength(data.subjectCode, {min: 2})){
        errors.subjectCode = "Subject code must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.subjectCode)){
        errors.subjectCode = "This field is required"
    }
    
    if(!Validator.isLength(data.sem, {min: 1})){
        errors.sem = "Semester must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.sem)){
        errors.sem = "This field is required"
    }
    
    if(!Validator.isLength(data.dept, {min: 2})){
        errors.dept = "Department must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.dept)){
        errors.dept = "This field is required"
    }
    
    if(!Validator.isLength(data.examinationName, {min: 2})){
        errors.examinationName = "Examination name must contain minimum of 2 characters"
    }

    if(Validator.isEmpty(data.examinationName)){
        errors.examinationName = "This field is required"
    }

    if(data.mcq_question){
        data.mcq_question = !isEmpty(data.mcq_question) ? data.mcq_question : ''
        data.correct_option = !isEmpty(data.correct_option) ? data.correct_option : ''
        data.marks_alloted = !isEmpty(data.marks_alloted) ? data.marks_alloted : ''
        data.question_num = !isEmpty(data.question_num) ? data.question_num : ''

        if(!Validator.isLength(data.mcq_question, {min: 5})){
            errors.mcq_question = "Question field must have minimum of 5 characters"
        }

        if(Validator.isEmpty(data.correct_option)){
            errors.correct_option = "This field is required"
        }
        
        if(Validator.isEmpty(data.marks_alloted)){
            errors.marks_alloted = "This field is required"
        }
        
        if(Validator.isEmpty(data.question_num)){
            errors.question_num = "This field is required"
        }

        if(data.options.split(',').length <= 1){
            errors.options = "More than one option is required"
        }
    }else if(data.nor_question){
        data.total_marks = !isEmpty(data.total_marks) ? data.total_marks : ''
        data.question_number = !isEmpty(data.question_number) ? data.question_number : ''

        if(!Validator.isLength(data.nor_question, {min: 5})){
            errors.nor_question = "Question field must have minimum of 5 characters"
        }

        if(Validator.isEmpty(data.total_marks)){
            errors.total_marks = "This field is required"
        }
        
        if(Validator.isEmpty(data.question_number)){
            errors.question_number = "This field is required"
        }
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}