import React from "react";

const TaskMessages = ({ taskMessages }) => {
  return (
    taskMessages.length > 0 &&
    taskMessages.map((message) => (
      <div key={message._id} className="task-message">
        {message.message}
      </div>
    ))
  );
};

export default TaskMessages;
