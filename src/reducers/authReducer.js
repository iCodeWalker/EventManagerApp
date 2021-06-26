import {
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  POST_EVENT,
  GET_EVENTS,
  EVENT_TYPES,
  CLEAR_ERROR_MESSAGE,
  ADD_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  token: null,
  message: "",
  events: [],
  eventtypes: [],
  errorMessage: "",
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.payload };
    case SIGN_UP:
      return { ...state, messgae: action.payload };
    case SIGN_OUT:
      return { ...state, token: null };
    case POST_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case GET_EVENTS:
      return { ...state, events: [...action.payload] };
    case EVENT_TYPES:
      return { ...state, eventtypes: [...action.payload] };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: "" };
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
