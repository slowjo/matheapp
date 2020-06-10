import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_SOCKET,
  LOGOUT,
  CLEAR_ERRORS,
  SET_FROM_CHAT,
  CLEAR_FROM_CHAT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  socket: null,
  fromChat: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        socket: null,
        error: action.payload,
        fromChat: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_FROM_CHAT:
      return {
        ...state,
        fromChat: true,
      };
    case CLEAR_FROM_CHAT:
      return {
        ...state,
        fromChat: false,
      };
    default:
      return state;
  }
};

export default auth;
