const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 16 })) {
    errors.handle = 'Handle needs to between 2 and 16 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender is required';
  }

  // if (data.gender !== 'Male' || data.gender !== 'Female') {
  //   errors.gender = `Choose between Male and Female`;
  // }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
