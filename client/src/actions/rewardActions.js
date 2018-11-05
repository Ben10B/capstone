import axios from 'axios';

import {
  GET_ACHIEVEMENTS,
  // GET_ERRORS,
} from './types';

// Get Sprite By User
export const getRewards = () => dispatch => {
  axios
    .get(`/api/rewards/`)
    .then(res =>
      dispatch({
        type: GET_ACHIEVEMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ACHIEVEMENTS,
        payload: {}
      })
    );
};
