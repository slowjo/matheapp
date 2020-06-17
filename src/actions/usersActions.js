import {
  GET_USERS,
  USERS_ERROR,
  GET_ONLINE_USERS,
  NEW_ONLINE_USER,
  USER_GONE_OFFLINE,
  SELECT_USER,
  CLEAR_SELECTED_USER,
  SET_POINTS,
  SET_MESSAGE_LISTS,
  MARK_AS_READ,
} from "./types";

// const devurl = "http://localhost:9090/";

// const produrl = "http://localhost:9090/";

const produrl = "https://boiling-oasis-15718.herokuapp.com/";

// Get all users
export const getAllUsers = ({ sentTasks, unsolvedTasks, appUserId }) => async (
  dispatch
) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/users/allusers"
      `${produrl}users/allusers`,
      {
        headers: {
          "x-auth-token": localStorage.token,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Error getting users");
    }
    const resData = await res.json();

    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.solvedTasks;

    const points = resData.reduce(reducer, 0);

    dispatch({
      type: GET_USERS,
      payload: resData,
    });

    dispatch({
      type: SET_POINTS,
      payload: points,
    });

    dispatch({
      type: SET_MESSAGE_LISTS,
      payload: {
        sentTasks: sentTasks,
        unsolvedTasks: unsolvedTasks,
        appUserId: appUserId,
      },
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: err.message,
    });
  }
};

// Get online users
export const getOnlineUsers = (onlineUsersIds, onlineUsers) => ({
  type: GET_ONLINE_USERS,
  payload: { onlineUsersIds, onlineUsers },
});

// New online user
export const newOnlineUser = (newOnlineUser) => ({
  type: NEW_ONLINE_USER,
  payload: newOnlineUser,
});

// User gone offline
export const userGoneOffline = (userGoneOffline) => ({
  type: USER_GONE_OFFLINE,
  payload: userGoneOffline,
});

// Select User
export const selectUser = (user) => ({
  type: SELECT_USER,
  payload: user,
});
// export const selectUser = (_id) => ({
//   type: SELECT_USER,
//   payload: _id,
// });

// Clear Selected User
export const clearSelectedUser = () => ({
  type: CLEAR_SELECTED_USER,
});

// Mark Users Messages As Read
export const markAsRead = (selectedUser) => ({
  type: MARK_AS_READ,
  payload: selectedUser,
});
