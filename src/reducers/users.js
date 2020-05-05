import {
  GET_USERS,
  USERS_ERROR,
  GET_ONLINE_USERS,
  NEW_ONLINE_USER,
  USER_GONE_OFFLINE,
  SELECT_USER,
  CLEAR_SELECTED_USER,
} from "../actions/types";

const initialState = {
  users: null,
  loadingUsers: true,
  selectedUser: null,
  error: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
        loadingUsers: false,
      };
    case GET_ONLINE_USERS:
      return {
        ...state,
        users: state.users.map((user) =>
          action.payload.onlineUsersIds.includes(user._id)
            ? {
                ...user,
                online: true,
                socketId: action.payload.onlineUsers.filter(
                  (item) => item._id === user._id
                )[0].socketId,
              }
            : user
        ),
      };
    case NEW_ONLINE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id.toString() === action.payload._id.toString()
            ? { ...user, online: true, socketId: action.payload.socketId }
            : user
        ),
      };
    case USER_GONE_OFFLINE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id.toString() === action.payload._id.toString()
            ? { ...user, online: false, socketId: null }
            : user
        ),
      };
    case USERS_ERROR:
      return {
        ...state,
        users: [],
        loadingUsers: true,
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: null,
      };
    default:
      return state;
  }
};

export default users;
