import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setFromChat } from "../../actions/authActions";
import PropTypes from "prop-types";
import Chat from "../chat/Chat";
import ChatPageTopBar from "../layout/ChatPageTopBar";
import {
  newTask,
  taskSolved,
  setTaskMessage,
  setSentChatMessage,
} from "../../actions/taskActions";
import { markAsRead } from "../../actions/usersActions";

const ChatPage = ({
  setFromChat,
  newTask,
  taskSolved,
  selectedUser,
  tasks,
  user,
  users,
  setTaskMessage,
  setSentChatMessage,
  markAsRead,
  history,
}) => {
  const [currUser, setCurrUser] = useState(null);

  console.log("This is the chatpage");

  useEffect(() => {
    if (typeof selectedUser === "undefined" || selectedUser === null) {
      history.push("/");
    } else {
      setCurrUser(users.find((user) => user._id === selectedUser._id));
    }
    console.log(typeof selectedUser);
  }, [users, selectedUser, history]);

  return (
    <div>
      {currUser && (
        <Fragment>
          <ChatPageTopBar selectedUser={selectedUser} />
          <Chat
            selectedUser={currUser}
            newTask={newTask}
            taskSolved={taskSolved}
            tasks={tasks}
            appUser={user}
            socketId={currUser.socketId}
            setTaskMessage={setTaskMessage}
            setSentChatMessage={setSentChatMessage}
            mobileChat={true}
            markAsRead={markAsRead}
          />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.users.selectedUser,
  tasks: state.tasks,
  user: state.auth.user,
  users: state.users.users,
});

ChatPage.propTypes = {
  setFromChat: PropTypes.func.isRequired,
  newTask: PropTypes.func.isRequired,
  taskSolved: PropTypes.func.isRequired,
  setTaskMessage: PropTypes.func.isRequired,
  setSentChatMessage: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setFromChat,
  newTask,
  taskSolved,
  setTaskMessage,
  setSentChatMessage,
  markAsRead,
})(ChatPage);
