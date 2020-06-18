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
  SET_CHAT_MESSAGE,
  SET_SENT_CHAT_MESSAGE,
  REMOVE_CHAT_MESSAGE,
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

    dispatch({
      type: SET_SENT_CHAT_MESSAGE,
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
export const receiveNewTask = (task) => async (dispatch) => {
  try {
    const res = await fetch(`${produrl}tasks/taskreceived`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: task._id,
        taskFrom: task.from,
        taskTo: task.to,
      }),
    });
    if (res.status !== 200) {
      throw new Error("Error sending info");
    }
    const resData = await res.json();
    console.log(resData);

    dispatch({
      type: NEW_TASK_RECEIVED,
      payload: task,
    });

    dispatch({
      type: SET_CHAT_MESSAGE,
      payload: task,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: err.message,
    });
  }
};

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

    // setTimeout(
    //   () =>
    dispatch({
      type: REMOVE_CHAT_MESSAGE,
      payload: resData._id.toString(),
    });
    //   500
    // );
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

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_CHAT_MESSAGE,
        payload: task._id,
      }),
    500
  );
};

// Set and remove a task message
export const setTaskMessage = (message, response, taskMessage) => (
  dispatch
) => {
  // const _id = uuid();
  const _id = new Date().toISOString();
  message._id = _id;

  if (!response) {
    dispatch({
      type: SET_TASK_MESSAGE,
      payload: message,
    });

    // Just a try
    // setTimeout(
    //   () =>
    //     dispatch({
    //       type: REMOVE_TASK_MESSAGE,
    //       payload: _id,
    //     }),
    //   15000
    // );

    dispatch({
      type: SET_CHAT_MESSAGE,
      payload: message,
    });

    // setTimeout(
    //   () =>
    //     dispatch({
    //       type: REMOVE_CHAT_MESSAGE,
    //       payload: _id,
    //     }),
    //   15000
    // );
  } else {
    const _id2 = new Date().toISOString() + 2;
    const responseMessage = {
      message: "  ...  ",
      from: message.from,
      type: "message",
      date: new Date(),
      _id: _id2,
    };

    if (taskMessage) {
      taskMessage.date = new Date();

      dispatch({
        type: REMOVE_TASK_MESSAGE,
        payload: taskMessage._id,
      });
      dispatch({
        type: REMOVE_CHAT_MESSAGE,
        payload: taskMessage._id,
      });
    }

    setTimeout(() => {
      dispatch({
        type: SET_TASK_MESSAGE,
        payload: responseMessage,
      });
      dispatch({
        type: SET_CHAT_MESSAGE,
        payload: responseMessage,
      });
      setTimeout(() => {
        dispatch({
          type: SET_TASK_MESSAGE,
          payload: message,
        });
        dispatch({
          type: SET_CHAT_MESSAGE,
          payload: message,
        });
        dispatch({
          type: REMOVE_TASK_MESSAGE,
          payload: _id2,
        });
        dispatch({
          type: REMOVE_CHAT_MESSAGE,
          payload: _id2,
        });
        setTimeout(() => {
          if (taskMessage) {
            dispatch({
              type: SET_TASK_MESSAGE,
              payload: taskMessage,
            });
            dispatch({
              type: SET_CHAT_MESSAGE,
              payload: taskMessage,
            });
          }
          setTimeout(() => {
            dispatch({
              type: REMOVE_TASK_MESSAGE,
              payload: _id,
            });
            // dispatch({
            //   type: REMOVE_CHAT_MESSAGE,
            //   payload: _id,
            // });
          }, 15000);
        }, 1000);
      }, 3000);
    }, 1000);
  }
};

// Set and remove a sent task message
export const setSentChatMessage = (message) => (dispatch) => {
  // const _id = uuid();
  const _id = new Date().toISOString() + 1;
  message._id = _id;

  dispatch({
    type: SET_SENT_CHAT_MESSAGE,
    payload: message,
  });

  // setTimeout(
  //   () =>
  //     dispatch({
  //       type: REMOVE_CHAT_MESSAGE,
  //       payload: _id,
  //     }),
  //   15000
  // );
};

// export const setTaskMessage = (message) => (dispatch) => {
//   // const _id = uuid();
//   const _id = new Date().toISOString();

//   dispatch({
//     type: SET_TASK_MESSAGE,
//     payload: { message, _id },
//   });

//   setTimeout(
//     () =>
//       dispatch({
//         type: REMOVE_TASK_MESSAGE,
//         payload: _id,
//       }),
//     5000
//   );
// };

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

    dispatch(setTaskMessage(resData));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: err.message,
    });
  }
};

// export const getTaskMessage = () => async (dispatch) => {
//   try {
//     const res = await fetch(
//       // "http://localhost:9090/tasks/getmessage"
//       `${produrl}tasks/getmessage`,
//       {
//         headers: {
//           "x-auth-token": localStorage.token,
//         },
//       }
//     );
//     if (res.status !== 200) {
//       throw new Error("Error getting message");
//     }
//     const resData = await res.json();

//     dispatch(setTaskMessage(resData.message));
//   } catch (err) {
//     dispatch({
//       type: TASK_ERROR,
//       payload: err.message,
//     });
//   }
// };

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
