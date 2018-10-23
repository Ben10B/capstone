const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');

module.exports = function validateGoalInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : 0;
  data.date = !isEmpty(data.date) ? data.date : '';

  data.sun = (data.sun) ? data.sun : false;
  data.mon = (data.mon) ? data.mon : false;
  data.tue = (data.tue) ? data.tue : false;
  data.wed = (data.wed) ? data.wed : false;
  data.th = (data.th) ? data.th : false;
  data.fri = (data.fri) ? data.fri : false;
  data.sat = (data.sat) ? data.sat : false;

  if (!Validator.isLength(data.title, { min: 2, max: 22 })) {
    errors.title = 'Title must be between 2 and 22 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (data.sun === false && data.mon === false &&
      data.tue === false && data.wed === false &&
      data.th === false && data.fri === false && data.sat === false) {
    errors.daysOftheWeek = `Check at least one day out of the week.`;
  }

  if (!Validator.isLength(data.description, { min: 10, max: 200 })) {
    errors.description = 'Description must be between 10 and 200 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (data.difficulty <= 0) {
    errors.difficulty = 'Difficulty field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  }

  const tempDate = moment(data.date, 'YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  if(tempDate.diff(today, 'days') > 60){
    errors.date = 'Choose a date less than or equal to 60 days from now '+tempDate.diff(today, 'days');
  }
  if(tempDate.isBefore(today)){
    errors.date = 'Choose a date starting from today to 60 days from now';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
