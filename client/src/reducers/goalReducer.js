import {
  ADD_GOAL,
  GET_GOALS,
  GET_GOAL,
  DELETE_GOAL,
  CHECK_GOAL,
  CHECK_GOAL_ERR,
  GOAL_LOADING
} from '../actions/types';

const initialState = {
  goals: [],
  goal: {},
  loading: false,
  isValid: null,
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
    case CHECK_GOAL:
      return {
        ...state,
        isValid: true
      };
    case CHECK_GOAL_ERR:
      return {
        ...state,
        isValid: false
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
