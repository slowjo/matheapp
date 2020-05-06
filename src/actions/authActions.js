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
  SET_TASKS,
} from "./types";

// const devurl = "http://localhost:9090/";

// const produrl = "http://localhost:9090/";

const produrl = "https://boiling-oasis-15718.herokuapp.com/";

// Get logged in user
export const getUser = () => async (dispatch) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/auth"
      `${produrl}auth`,
      {
        headers: {
          "x-auth-token": localStorage.token,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Error getting user");
    }
    const resData = await res.json();

    console.log(resData);

    dispatch({
      type: USER_LOADED,
      payload: resData,
    });

    dispatch({
      type: SET_TASKS,
      payload: {
        unsolvedTasks: resData.unsolvedTasks,
        sentTasks: resData.sentTasks,
      },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.message,
    });
  }
};

// Set Socket
export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
});

// Register a user
export const register = (formData) => async (dispatch) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/users/signup"
      `${produrl}users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (res.status !== 201) {
      throw new Error("Error signing up");
    }
    const resData = await res.json();
    console.log(resData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: resData,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.message,
    });
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/auth/login"
      `${produrl}auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (res.status !== 200) {
      throw new Error("Error logging in");
    }
    const resData = await res.json();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: resData,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.message,
    });
  }
};

// Logout
export const logout = () => ({
  type: LOGOUT,
});

// Clear Errors
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
