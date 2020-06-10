import React, { useEffect, useState } from "react";

const NewSingleUser = ({ user, selectUser, tasks, messageList }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // console.log(messageList);
    if (messageList.length > 0) {
      const newestMessage = messageList[messageList.length - 1];
      //   console.log("newestMessage: ", newestMessage);
      setMessage(messageList[messageList.length - 1]);
    }
  }, [messageList]);

  const onClick = () => {
    const pickedUser = user;
    if (tasks.sentTasks.filter((task) => task.to === user._id).length !== 0) {
      pickedUser.usersTask = tasks.sentTasks.find(
        (task) => task.to === user._id
      );
    } else {
      pickedUser.usersTask = null;
    }
    selectUser(pickedUser);
  };

  return (
    <div className="user-item" onClick={onClick}>
      <div className="user-img">
        <i className="fas fa-user"></i>
        {user.online && <div className="green-dot"></div>}
      </div>
      <div className="user-right">
        <div className="user-right-text">
          <div className="user-name">{user.name}</div>
          {message ? (
            <div className="user-status">{message.type}</div>
          ) : (
            <div className="user-status">
              John hat dir eine Aufgabe geschickt.
            </div>
          )}
        </div>
        <div className="user-right-info">
          <div className="date">10:30</div>
          <div className="new-message-notify">1</div>
        </div>
      </div>
    </div>
  );
};

export default NewSingleUser;
