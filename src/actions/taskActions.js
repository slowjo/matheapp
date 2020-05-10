// import uuid from "uuid/v4";

import {
  NEW_TASK,
  TASK_ERROR,
  NEW_TASK_RECEIVED,
  TASK_SOLVED,
  SENT_TASK_SOLVED,
  SET_TASK_MESSAGE,
  REMOVE_TASK_MESSAGE,
  ADD_POINT,
  SELECT_TASK,
  CLEAR_SELECTED_TASK,
  CLEAR_USERS_TASK,
} from "./types";

// const devurl = "http://localhost:9090/";

// const produrl = "http://localhost:9090/";

const produrl = "https://boiling-oasis-15718.herokuapp.com/";

// Send New Task To User
export const newTask = (task) => async (dispatch) => {
  try {
    const { numberOne, numberTwo, from, to, toSocket } = task;
    const res = await fetch(
      // "http://localhost:9090/tasks/newtask"
      `${produrl}tasks/newtask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
        body: JSON.stringify({
          numberOne,
          numberTwo,
          from,
          to,
          toSocket,
        }),
      }
    );
    if (res.status !== 201) {
      throw new Error("Error sending task");
    }
    const resData = await res.json();

    dispatch({
      type: NEW_TASK,
      payload: resData,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: err.message,
    });
  }
};

// Receive New Task in realtime
export const receiveNewTask = (task) => ({
  type: NEW_TASK_RECEIVED,
  payload: task,
});

// Task Solved
export const taskSolved = (task, result, fromSocketId) => async (dispatch) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/tasks/solved"
      `${produrl}tasks/solved`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
        body: JSON.stringify({ task, result, fromSocketId }),
      }
    );
    if (res.status !== 200) {
      throw new Error("Error sending solved task");
    }
    const resData = await res.json();

    dispatch({
      type: TASK_SOLVED,
      payload: resData,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: err.message,
    });
  }
};

// A Task The User Sent Was Solved
export const sentTaskSolved = (task) => (dispatch) => {
  dispatch({
    type: SENT_TASK_SOLVED,
    payload: task,
  });

  dispatch({
    type: CLEAR_USERS_TASK,
    payload: task.to,
  });
};

// Set and remove a task message
export const setTaskMessage = (message) => (dispatch) => {
  // const _id = uuid();
  const _id = new Date().toISOString();

  dispatch({
    type: SET_TASK_MESSAGE,
    payload: { message, _id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_TASK_MESSAGE,
        payload: _id,
      }),
    5000
  );
};

// Get task message
export const getTaskMessage = () => async (dispatch) => {
  try {
    const res = await fetch(
      // "http://localhost:9090/tasks/getmessage"
      `${produrl}tasks/getmessage`,
      {
        headers: {
          "x-auth-token": localStorage.token,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Error getting message");
    }
    const resData = await res.json();

    dispatch(setTaskMessage(resData.message));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: err.message,
    });
  }
};

// Add a point
export const addPoint = () => ({
  type: ADD_POINT,
});

// Select a task
export const selectTask = (task) => ({
  type: SELECT_TASK,
  payload: task,
});

export const clearSelectedTask = () => ({
  type: CLEAR_SELECTED_TASK,
});
