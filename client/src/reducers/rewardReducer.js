import { 
  GET_ACHIEVEMENTS
 } from '../actions/types';

const initialState = {
  achievements: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACHIEVEMENTS:
      return {
        ...state,
        achievements: action.payload,
      };
    default:
      return state;
  }
}
