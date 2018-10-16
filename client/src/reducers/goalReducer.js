import {
  ADD_GOAL,
  GET_GOALS,
  GET_GOAL,
  DELETE_GOAL,
  GOAL_LOADING
} from '../actions/types';

const initialState = {
  goals: [],
  goal: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOAL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GOALS:
      return {
        ...state,
        goals: action.payload,
        loading: false
      };
    case GET_GOAL:
      return {
        ...state,
        goal: action.payload,
        loading: false
      };
    case ADD_GOAL:
      return {
        ...state,
        goals: [action.payload, ...state.goals]
      };
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.payload)
      };
    default:
      return state;
  }
}
