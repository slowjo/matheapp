import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import tasks from "./tasks";

export default combineReducers({
  auth,
  users,
  tasks,
});
