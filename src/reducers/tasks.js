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
} from "../actions/types";

const initialState = {
  unsolvedTasks: [],
  sentTasks: [],
  taskMessages: [],
  points: 0,
  taskError: null,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
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
