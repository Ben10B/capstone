import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_GOALS,
  GET_GOAL,
  GOAL_LOADING,
  DELETE_GOAL,
  CHECK_GOAL,
  CHECK_GOAL_ERR,
  UPDATE_GOAL,
} from './types';

// Add Goal
export const addGoal = (goalData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/goal', goalData)
    .then(res => history.push('/')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

// Update Goal
export const updateGoal = (goalData, id) => dispatch => {
  axios
    .post(`api/goal/update/${id}`, goalData)
    .then(res => 
      dispatch({
        type: UPDATE_GOAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_GOAL,
        payload: err.response.data
      })
    ); 
};

// Check Goal
export const checkGoal = (goalData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`api/goal/check`, goalData)
    .then(res => 
      dispatch({
        type: CHECK_GOAL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }),
      dispatch({
        type: CHECK_GOAL_ERR,
        // payload: res.data
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

// Get Goals By User That're Completed
export const getCompletedGoalsByUser = (user_id) => dispatch => {
  dispatch(setGoalLoading());
  axios
    .get(`/api/goal/user/${user_id}/completed`)
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

// Get Goals By User That're Incompleted
export const getIncompletedGoalsByUser = (user_id) => dispatch => {
  dispatch(setGoalLoading());
  axios
    .get(`/api/goal/user/${user_id}/incompleted`)
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
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios.delete(`/api/goal/${id}`)
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
  }
};

// Remove friend from goal
export const removeGoalFriend = (handle, user) => dispatch => {
  axios.post(`/api/goal/remove/${handle}/${user}`)
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
