const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGoalInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : 0;

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (data.difficulty <= 0) {
    errors.difficulty = 'difficulty field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
