import React, { useEffect } from "react";
import Users from "../users/Users";
import TaskMessages from "../layout/TaskMessages";
import { connect } from "react-redux";
import { getUser, setSocket } from "../../actions/authActions";
import {
  getAllUsers,
  getOnlineUsers,
  newOnlineUser,
  userGoneOffline,
  selectUser,
  clearSelectedUser,
} from "../../actions/usersActions";
import {
  newTask,
  receiveNewTask,
  taskSolved,
  sentTaskSolved,
  setTaskMessage,
  getTaskMessage,
} from "../../actions/taskActions";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";

const Home = ({
  getUser,
  isAuthenticated,
  setSocket,
  user,
  users,
  loadingUsers,
  socket,
  getAllUsers,
  getOnlineUsers,
  newOnlineUser,
  userGoneOffline,
  selectedUser,
  selectUser,
  clearSelectedUser,
  newTask,
  receiveNewTask,
  tasks,
  taskSolved,
  sentTaskSolved,
  setTaskMessage,
  taskMessages,
  getTaskMessage,
}) => {
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = openSocket.connect(
        // "http://localhost:9090"
        "https://boiling-oasis-15718.herokuapp.com",
        {
          query: { token: localStorage.token },
        }
      );
      setSocket(newSocket);
      getAllUsers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (socket && user) {
      setTimeout(() => {
        socket.emit("userJoined", {
          name: user.name,
          _id: user._id,
          socketId: socket.id,
        });

        // Set Task Message For Each Task In user.taskMessages
        user.taskMessages.forEach((taskMessageItem) => {
          setTaskMessage(taskMessageItem.message);
        });
      }, 1000);
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket && !loadingUsers) {
      socket.on("onlineUsers", (onlineUsers) => {
        console.log("onlineUsers: ", onlineUsers);
        const onlineUsersIds = onlineUsers.map((onlineUser) => onlineUser._id);
        getOnlineUsers(onlineUsersIds, onlineUsers);
      });
      socket.on("newUser", ({ name, _id, socketId }) => {
        console.log("newUser: ", name, _id, socketId);
        newOnlineUser({ name, _id, socketId });
      });
      socket.on("goneOffline", (goneOffline) => {
        console.log("goneOffline: ", goneOffline);
        userGoneOffline(goneOffline);
      });
      socket.on("taskForYou", (task) => {
        console.log(task);
        receiveNewTask(task);
        // const sender = users.filter(
        //   (usersItem) => usersItem._id === task.from
        // )[0].name;
        // setTaskMessage(`${sender} hat dir eine Aufgabe geschickt`);
        getTaskMessage();
      });
      socket.on("sentTaskSolved", (task) => {
        console.log("someone solved a task you gave them");
        sentTaskSolved(task);
        // const solver = users.filter((usersItem) => usersItem._id === task.to)[0]
        //   .name;
        // setTaskMessage(`${solver} hat deine Aufgabe gelöst`);
        getTaskMessage();
      });
    }
  }, [socket, loadingUsers]);

  return (
    <div>
      <TaskMessages taskMessages={taskMessages} />
      {users && (
        <Users
          users={users}
          appUser={user}
          selectedUser={selectedUser}
          selectUser={selectUser}
          clearSelectedUser={clearSelectedUser}
          newTask={newTask}
          tasks={tasks}
          taskSolved={taskSolved}
          setTaskMessage={setTaskMessage}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  users: state.users.users,
  selectedUser: state.users.selectedUser,
  loadingUsers: state.users.loadingUsers,
  socket: state.auth.socket,
  tasks: state.tasks,
  taskMessages: state.tasks.taskMessages,
});

Home.propTypes = {
  getUser: PropTypes.func.isRequired,
  setSocket: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOnlineUsers: PropTypes.func.isRequired,
  newOnlineUser: PropTypes.func.isRequired,
  userGoneOffline: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
  newTask: PropTypes.func.isRequired,
  receiveNewTask: PropTypes.func.isRequired,
  taskSolved: PropTypes.func.isRequired,
  sentTaskSolved: PropTypes.func.isRequired,
  setTaskMessage: PropTypes.func.isRequired,
  getTaskMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUser,
  setSocket,
  getAllUsers,
  getOnlineUsers,
  newOnlineUser,
  userGoneOffline,
  selectUser,
  clearSelectedUser,
  newTask,
  receiveNewTask,
  taskSolved,
  sentTaskSolved,
  setTaskMessage,
  getTaskMessage,
})(Home);
