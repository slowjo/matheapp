import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import NewUsers from "../users/NewUsers";
import Chat from "../chat/Chat";
import BlankChat from "../chat/BlankChat";
import Navbar from "../layout/Navbar";
// import Points from "../points/Points";
import { connect } from "react-redux";
import { getUser, setSocket, clearFromChat } from "../../actions/authActions";
import {
  getAllUsers,
  getOnlineUsers,
  newOnlineUser,
  userGoneOffline,
  selectUser,
  clearSelectedUser,
  markAsReceived,
  markAsRead,
  markAsSeen,
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
  newTask,
  receiveNewTask,
  tasks,
  taskSolved,
  sentTaskSolved,
  setTaskMessage,
  taskMessages,
  getTaskMessage,
  addPoint,
  // points,
  fromChat,
  clearFromChat,
  setSentChatMessage,
  markAsReceived,
  markAsRead,
  markAsSeen,
}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

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
    // eslint-disable-next-line
  }, [isAuthenticated, user, clearFromChat]);

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
            setTaskMessage(taskMessageItem);
          });
        }, 1000);
      }
    }
    // eslint-disable-next-line
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
        getTaskMessage();
      });
      socket.on("sentTaskSolved", (task) => {
        console.log("someone solved a task you gave them");
        sentTaskSolved(task);
        getTaskMessage();
      });
      socket.on("solvedTask", () => {
        console.log("+1!");
        addPoint();
      });
      socket.on("taskReceived", (receivedTask) => {
        console.log("task received: ", receivedTask);
        markAsReceived(receivedTask);
      });
      socket.on("taskSeen", (seenTask) => {
        console.log("task seen: ", seenTask);
        markAsSeen(seenTask);
      });
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [users]);

  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    if (users && selectedUser) {
      setCurrUser(users.find((user) => user._id === selectedUser._id));
    }
  }, [users, selectedUser]);

  // eslint-disable-next-line
  const [isMobile, setIsMobile] = useState(true);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 450) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  });

  return (
    <Fragment>
      {/* <div>
        <div className="notification-element">
          <TaskMessages taskMessages={taskMessages} />
          <Points points={points} />
        </div>
      </div> */}
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
  markAsReceived: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  markAsSeen: PropTypes.func.isRequired,
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
  markAsReceived,
  markAsRead,
  markAsSeen,
})(Home);
