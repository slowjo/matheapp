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
}) => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    setCurrUser(users.find((user) => user._id === selectedUser._id));
  }, [users, selectedUser]);

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
};

export default connect(mapStateToProps, {
  setFromChat,
  newTask,
  taskSolved,
  setTaskMessage,
  setSentChatMessage,
})(ChatPage);
