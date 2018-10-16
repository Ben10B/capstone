const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    data.log_email = !isEmpty(data.email) ? data.email : '';
    data.log_password = !isEmpty(data.password) ? data.password : '';

    if(!validator.isEmail(data.log_email)){
        errors.log_email = 'Email is invalid';
    }
    
    if(validator.isEmpty(data.log_email)){
        errors.log_email = 'Email is required';
    }

    if(validator.isEmpty(data.log_password)){
        errors.log_password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}