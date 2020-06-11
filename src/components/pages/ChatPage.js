import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setFromChat } from "../../actions/authActions";
import PropTypes from "prop-types";
import Chat from "../chat/Chat";
import ChatPageTopBar from "../layout/ChatPageTopBar";
import { newTask, taskSolved, setTaskMessage } from "../../actions/taskActions";

const ChatPage = ({
  setFromChat,
  newTask,
  taskSolved,
  selectedUser,
  tasks,
  user,
  users,
  setTaskMessage,
}) => {
  return (
    <div>
      <ChatPageTopBar selectedUser={selectedUser} />
      <Chat
        selectedUser={selectedUser}
        newTask={newTask}
        taskSolved={taskSolved}
        tasks={tasks}
        appUser={user}
        socketId={selectedUser.socketId}
        setTaskMessage={setTaskMessage}
      />
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
};

export default connect(mapStateToProps, {
  setFromChat,
  newTask,
  taskSolved,
  setTaskMessage,
})(ChatPage);
