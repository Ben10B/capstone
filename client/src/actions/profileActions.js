import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
  GET_PROFILE_BY_HANDLE,
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_BY_HANDLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE_BY_HANDLE,
        payload: null
      })
    );
};

// Send Friend Request
export const sendFriendRequest = (handle, userID) => dispatch => {
  axios
    .post(`/api/profile/handle/${handle}/requestby/${userID}`)
    .then(res =>
      dispatch({
        type: FRIEND_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: FRIEND_REQUEST,
        payload: null
      })
    );
};

// Accept Request
export const acceptFriendRequest = (handle) => dispatch => {
  axios
    .post(`/api/profile/accept/${handle}`)
    .then(res =>
      dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: null
      })
    );
};

// Decline Request
export const declineFriendRequest = (handle) => dispatch => {
  axios
    .post(`/api/profile/decline/${handle}`)
    .then(res =>
      dispatch({
        type: DECLINE_FRIEND_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: DECLINE_FRIEND_REQUEST,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/home'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Profile
export const editProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios.delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
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

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
