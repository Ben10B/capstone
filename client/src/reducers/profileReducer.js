import { 
  GET_PROFILE, 
  GET_PROFILES, 
  PROFILE_LOADING, 
  CLEAR_CURRENT_PROFILE, 
  GET_PROFILE_BY_HANDLE, 
  DECLINE_FRIEND_REQUEST, 
  ACCEPT_FRIEND_REQUEST, 
} from '../actions/types';

const initialState = {
  profile: null,
  profileHandle: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILE_BY_HANDLE:
      return {
        ...state,
        profileHandle: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}