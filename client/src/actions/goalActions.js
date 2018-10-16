import axios from 'axios';

import {
  ADD_GOAL,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_GOALS,
  GET_GOAL,
  GOAL_LOADING,
  DELETE_GOAL
} from './types';

// Add Goal
export const addGoal = (goalData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/goal', goalData)
    .then(res =>
      dispatch({
        type: ADD_GOAL,
        payload: res.data
      }), history.push('/')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Goals
export const getGoals = () => dispatch => {
  dispatch(setGoalLoading());
  axios
    .get('/api/goal')
    .then(res =>
      dispatch({
        type: GET_GOALS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GOALS,
        payload: null
      })
    );
};

// Get Goals By User
export const getGoalsByUser = (user_id) => dispatch => {
  dispatch(setGoalLoading());
  axios
    .get(`/api/goal/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_GOALS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GOALS,
        payload: null
      })
    );
};

// Get Goal
export const getGoal = id => dispatch => {
  dispatch(setGoalLoading());
  axios
    .get(`/api/goal/${id}`)
    .then(res =>
      dispatch({
        type: GET_GOAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GOAL,
        payload: null
      })
    );
};

// Delete Goal
export const deleteGoal = id => dispatch => {
  axios
    .delete(`/api/goal/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_GOAL,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setGoalLoading = () => {
  return {
    type: GOAL_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
