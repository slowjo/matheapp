import {
  GET_USERS,
  USERS_ERROR,
  GET_ONLINE_USERS,
  NEW_ONLINE_USER,
  USER_GONE_OFFLINE,
  SELECT_USER,
  CLEAR_SELECTED_USER,
  CLEAR_USERS_TASK,
  SET_MESSAGE_LISTS,
  SET_CHAT_MESSAGE,
  SET_SENT_CHAT_MESSAGE,
  REMOVE_CHAT_MESSAGE,
  MARK_AS_READ,
  MARK_AS_RECEIVED,
  MARK_AS_SEEN,
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
        selectedUser:
          state.selectedUser !== null &&
          state.selectedUser._id === action.payload._id
            ? { ...state.selectedUser, online: true }
            : { ...state.selectedUser },
      };
    case USER_GONE_OFFLINE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id.toString() === action.payload._id.toString()
            ? { ...user, online: false, socketId: null }
            : user
        ),
        selectedUser:
          state.selectedUser !== null &&
          state.selectedUser._id === action.payload._id
            ? { ...state.selectedUser, online: false }
            : { ...state.selectedUser },
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
        // selectedUser: state.users.find((item) => item._id === action.payload),
        selectedUser: action.payload,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: null,
      };
    case CLEAR_USERS_TASK:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, usersTask: null },
      };
    case SET_MESSAGE_LISTS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id !== action.payload.appUserId) {
            const messageList = [];
            action.payload.sentTasks.map((task) =>
              task.to === user._id ? messageList.push(task) : null
            );
            action.payload.unsolvedTasks.map((task) =>
              task.from === user._id ? messageList.push(task) : null
            );
            return { ...user, messageList: messageList };
          } else {
            return { ...user };
          }
        }),
      };
    case SET_CHAT_MESSAGE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.from
            ? { ...user, messageList: [...user.messageList, action.payload] }
            : { ...user }
        ),
      };
    case SET_SENT_CHAT_MESSAGE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.to
            ? { ...user, messageList: [...user.messageList, action.payload] }
            : { ...user }
        ),
      };
    case REMOVE_CHAT_MESSAGE:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.messageList) {
            const newMessageList = user.messageList.filter(
              (message) => message._id !== action.payload
            );
            return { ...user, messageList: newMessageList };
          } else {
            return { ...user };
          }
        }),
      };
    case MARK_AS_RECEIVED:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.taskTo
            ? {
                ...user,
                messageList: user.messageList.map((message) => {
                  if (message.status === "sent") {
                    return { ...message, status: "received" };
                  } else {
                    return { ...message };
                  }
                }),
              }
            : { ...user }
        ),
      };
    case MARK_AS_SEEN:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.taskTo
            ? {
                ...user,
                messageList: user.messageList.map((message) => {
                  if (
                    (message.status === "sent" ||
                      message.status === "received") &&
                    message._id === action.payload.seenTaskId
                  ) {
                    return { ...message, status: "seen" };
                  } else {
                    return { ...message };
                  }
                }),
              }
            : { ...user }
        ),
      };
    case MARK_AS_READ:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id
            ? {
                ...user,
                messageList: user.messageList.map((message) => {
                  return { ...message, read: true };
                }),
              }
            : { ...user }
        ),
      };
    default:
      return state;
  }
};

export default users;
