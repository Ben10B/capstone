import axios from 'axios';

import {
  ADD_SPRITE,
  GET_SPRITE,
  UPDATE_SPRITE,
  GET_ERRORS,
} from './types';

// Create Sprite
export const createSprite = (spriteData, history) => dispatch => {
  axios
    .post('/api/sprite', spriteData)
    .then(res => dispatch({
      type: ADD_SPRITE,
      payload: res.data
    })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

// Update Sprite
export const updateSprite = (spriteData, id) => dispatch => {
  axios
    .post(`api/sprite/update/${id}`, spriteData)
    .then(res => 
      dispatch({
        type: UPDATE_SPRITE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_SPRITE,
        payload: null
      })
    ); 
};

// Get Sprite By User
export const getSpriteByUser = (user_id) => dispatch => {
  axios
    .get(`/api/sprite/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_SPRITE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SPRITE,
        payload: null
      })
    );
};
