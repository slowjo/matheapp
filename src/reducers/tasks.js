import {
  SET_TASKS,
  NEW_TASK,
  TASK_ERROR,
  NEW_TASK_RECEIVED,
  TASK_SOLVED,
  SENT_TASK_SOLVED,
  SET_TASK_MESSAGE,
  REMOVE_TASK_MESSAGE,
  SET_POINTS,
  ADD_POINT,
  SELECT_TASK,
  CLEAR_SELECTED_TASK,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  unsolvedTasks: [],
  sentTasks: [],
  taskMessages: [],
  points: 0,
  selectedTask: null,
  taskError: null,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        unsolvedTasks: [],
        sentTasks: [],
        taskMessages: [],
        points: 0,
        selectedTask: null,
        taskError: null,
      };
    case SET_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case ADD_POINT:
      return {
        ...state,
        points: state.points + 1,
      };
    case SET_TASKS:
      return {
        ...state,
        unsolvedTasks: action.payload.unsolvedTasks,
        sentTasks: action.payload.sentTasks,
      };
    case NEW_TASK:
      return {
        ...state,
        sentTasks: [action.payload, ...state.sentTasks],
      };
    case NEW_TASK_RECEIVED:
      return {
        ...state,
        unsolvedTasks: [action.payload, ...state.unsolvedTasks],
      };
    case TASK_SOLVED:
      return {
        ...state,
        unsolvedTasks: state.unsolvedTasks.filter(
          (task) => task._id !== action.payload._id
        ),
      };
    case SENT_TASK_SOLVED:
      return {
        ...state,
        sentTasks: state.sentTasks.filter(
          (task) => task._id !== action.payload._id
        ),
      };
    case SET_TASK_MESSAGE:
      return {
        ...state,
        taskMessages: [...state.taskMessages, action.payload],
      };
    case REMOVE_TASK_MESSAGE:
      return {
        ...state,
        taskMessages: state.taskMessages.filter(
          (message) => message._id !== action.payload
        ),
      };
    case SELECT_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case CLEAR_SELECTED_TASK:
      return {
        ...state,
        selectedTask: null,
      };
    case TASK_ERROR:
      return {
        ...state,
        taskError: action.payload,
      };
    default:
      return state;
  }
};

export default tasks;
