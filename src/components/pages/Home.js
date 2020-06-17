import React, { Fragment, useEffect, useState } from "react";
// New Stuff
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import NewUsers from "../users/NewUsers";
import Chat from "../chat/Chat";
import BlankChat from "../chat/BlankChat";
import Navbar from "../layout/Navbar";
// New Stuff End
import Users from "../users/Users";
import TaskMessages from "../layout/TaskMessages";
import Points from "../points/Points";
import TaskForm from "../tasks/TaskForm";
import Tasks from "../tasks/Tasks";
import YourTask from "../tasks/YourTask";
import { connect } from "react-redux";
import { getUser, setSocket, clearFromChat } from "../../actions/authActions";
import {
  getAllUsers,
  getOnlineUsers,
  newOnlineUser,
  userGoneOffline,
  selectUser,
  clearSelectedUser,
  markAsRead,
} from "../../actions/usersActions";
import {
  newTask,
  receiveNewTask,
  taskSolved,
  sentTaskSolved,
  setTaskMessage,
  getTaskMessage,
  addPoint,
  selectTask,
  clearSelectedTask,
  setSentChatMessage,
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
  addPoint,
  points,
  unsolvedTasks,
  selectTask,
  selectedTask,
  clearSelectedTask,
  fromChat,
  clearFromChat,
  setSentChatMessage,
  markAsRead,
}) => {
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!fromChat) {
      if (isAuthenticated && user) {
        const newSocket = openSocket.connect(
          // "http://localhost:9090",
          "https://boiling-oasis-15718.herokuapp.com",
          {
            query: { token: localStorage.token },
          }
        );
        setSocket(newSocket);
        getAllUsers({
          sentTasks: user.sentTasks,
          unsolvedTasks: user.unsolvedTasks,
          appUserId: user._id,
        });
      }
    } else {
      setTimeout(() => clearFromChat(), 500);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!fromChat) {
      if (socket && user) {
        setTimeout(() => {
          socket.emit("userJoined", {
            name: user.name,
            _id: user._id,
            socketId: socket.id,
          });

          // Set Task Message For Each Task In user.taskMessages
          user.taskMessages.forEach((taskMessageItem) => {
            // setTaskMessage(taskMessageItem.message);
            setTaskMessage(taskMessageItem);
          });
        }, 1000);
      }
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
      socket.on("solvedTask", () => {
        console.log("+1!");
        addPoint();
      });
    }
  }, [socket, loadingUsers]);

  const [sortedUsers, setSortedUsers] = useState(null);

  const sortFunc = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  };

  const sortFuncTwo = (a, b) => {
    if (a.newestMessage.date < b.newestMessage.date) {
      return 1;
    }
    if (a.newestMessage.date > b.newestMessage.date) {
      return -1;
    }
    return 0;
  };

  const sortAndAddArray = (usersArray) => {
    return usersArray.map((item) => {
      if (item.messageList) {
        const sortedMessageList = item.messageList.sort(sortFunc);
        if (sortedMessageList.length > 0) {
          return {
            ...item,
            newestMessage: sortedMessageList[sortedMessageList.length - 1],
          };
        } else {
          return {
            ...item,
            newestMessage: { message: "No message", date: "-1" },
          };
        }
      } else {
        return {
          ...item,
          newestMessage: { message: "No message", date: "-1" },
        };
      }
    });
  };

  useEffect(() => {
    if (users) {
      setSortedUsers(sortAndAddArray(users).sort(sortFuncTwo));
    }
  }, [users]);

  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    if (users && selectedUser) {
      setCurrUser(users.find((user) => user._id === selectedUser._id));
    }
  }, [users, selectedUser]);

  const [isMobile, setIsMobile] = useState(true);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 450) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  });

  // console.log(isMobile);

  return (
    <Fragment>
      {/* <div>
        <div className="notification-element">
          <TaskMessages taskMessages={taskMessages} />
          <Points points={points} />
        </div>
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
        {selectedUser !== null && !selectedUser.usersTask && (
          <TaskForm
            user={selectedUser}
            newTask={newTask}
            appUser={user}
            socketId={selectedUser.socketId}
            clearSelectedUser={clearSelectedUser}
            setTaskMessage={setTaskMessage}
          />
        )}
        {selectedUser !== null && selectedUser.usersTask && (
          <h4 className="task-form text-center">
            Du hast {selectedUser.name} schon eine Aufgabe geschickt. Warte bis
            die Aufgabe gelöst ist, dann kannst du eine neue schicken.
          </h4>
        )}
        {users && (
          <Tasks
            tasks={unsolvedTasks}
            selectTask={selectTask}
            taskSolved={taskSolved}
            setTaskMessage={setTaskMessage}
            users={users}
            clearSelectedTask={clearSelectedTask}
          />
        )}
        {selectedTask !== null && (
          <YourTask
            task={selectedTask}
            taskSolved={taskSolved}
            setTaskMessage={setTaskMessage}
            users={users}
            clearSelectedTask={clearSelectedTask}
          />
        )}
      </div> */}
      {/* <Navbar /> */}
      {window.innerWidth < 450 ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="mobile-users-page">
                <Navbar />
                <div className="mobile-container">
                  {user && users && (
                    <Fragment>
                      <div className="user-list-desktop">
                        {sortedUsers && (
                          <NewUsers
                            users={sortedUsers}
                            selectUser={selectUser}
                            tasks={tasks}
                            desktop={false}
                            appUser={user}
                          />
                        )}
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </Route>
            <Route exact path="/chatpage" component={ChatPage} />
          </Switch>
        </Router>
      ) : (
        <div className="desktop-page">
          <Navbar />
          <div className="desktop-container">
            {user && users && (
              <Fragment>
                <div className="user-list-desktop">
                  {sortedUsers && (
                    <NewUsers
                      users={sortedUsers}
                      selectUser={selectUser}
                      tasks={tasks}
                      desktop={true}
                      appUser={user}
                    />
                  )}
                </div>
                <hr />
                {currUser ? (
                  <Chat
                    selectedUser={currUser}
                    newTask={newTask}
                    appUser={user}
                    socketId={currUser.socketId}
                    usersTask={selectedUser.usersTask}
                    tasks={tasks}
                    taskSolved={taskSolved}
                    setTaskMessage={setTaskMessage}
                    setSentChatMessage={setSentChatMessage}
                    markAsRead={markAsRead}
                  />
                ) : (
                  <BlankChat />
                )}
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
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
  points: state.tasks.points,
  unsolvedTasks: state.tasks.unsolvedTasks,
  selectedTask: state.tasks.selectedTask,
  fromChat: state.auth.fromChat,
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
  addPoint: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  clearSelectedTask: PropTypes.func.isRequired,
  clearFromChat: PropTypes.func.isRequired,
  setSentChatMessage: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
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
  addPoint,
  selectTask,
  clearSelectedTask,
  clearFromChat,
  setSentChatMessage,
  markAsRead,
})(Home);
