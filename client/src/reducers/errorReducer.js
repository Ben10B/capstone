import { GET_ERRORS, GET_ERRORS_2 } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  // console.log(action);
  // console.log(action.type);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_ERRORS_2:
      return action.payload;
    default:
      return state;
  }
}
