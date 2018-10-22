import { 
  // ADD_SPRITE,
  GET_SPRITE,
  // UPDATE_SPRITE
 } from '../actions/types';

const initialState = {
  sprite: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPRITE:
      return {
        ...state,
        sprite: action.payload,
      };
    default:
      return state;
  }
}
