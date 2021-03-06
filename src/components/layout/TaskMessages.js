import React from "react";

const TaskMessages = ({ taskMessages }) => {
  return (
    <div className="task-messages">
      {taskMessages.length > 0 &&
        taskMessages.map((message) => (
          <div key={message._id} className="task-message">
            {message.message}
          </div>
        ))}
    </div>
  );
};

export default TaskMessages;
