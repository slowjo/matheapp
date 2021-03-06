import React, { useEffect, useState } from "react";

const NewSingleUser = ({ user, selectUser, tasks, messageList }) => {
  const [message, setMessage] = useState(null);

  const [hourmins, setHourmins] = useState("");

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const sortFunc = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  };

  const getHourMins = (someDateString) => {
    const d = new Date(someDateString);
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    return h + ":" + m;
  };

  const getDayMonthYear = (someDateString) => {
    const d = new Date(someDateString);
    const day = addZero(d.getDate());
    const month = addZero(d.getMonth() + 1);
    const year = addZero(d.getFullYear());
    return day + "/" + month + "/" + year;
  };

  useEffect(() => {
    // console.log(messageList);
    if (messageList && messageList.length > 0) {
      // const newestMessage = messageList[messageList.length - 1];
      //   console.log("newestMessage: ", newestMessage);
      setMessage(messageList.sort(sortFunc)[messageList.length - 1]);
      const thisDate = new Date(
        messageList.sort(sortFunc)[messageList.length - 1].date
      );
      if (thisDate.getDate === new Date().getDate) {
        setHourmins(
          getHourMins(messageList.sort(sortFunc)[messageList.length - 1].date)
        );
      } else {
        setHourmins(
          getDayMonthYear(
            messageList.sort(sortFunc)[messageList.length - 1].date
          )
        );
      }
    } else {
      setMessage(null);
    }
    // eslint-disable-next-line
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

  let theOperator;
  if (message) {
    if (message.type === "addition") theOperator = "+";
    if (message.type === "subtraction") theOperator = "-";
    if (message.type === "multiplication") theOperator = "x";
    if (message.type === "division") theOperator = "/";
  }

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
            <div className="user-status">
              {message.to === user._id && "Du: "}
              {(message.type === "multiplication" ||
                message.type === "addition" ||
                message.type === "subtraction" ||
                message.type === "division") &&
                message.numberOne +
                  " " +
                  theOperator +
                  message.numberTwo +
                  " " +
                  " = ?"}
              {message.type === "message" && message.message}
            </div>
          ) : (
            <div className="user-status">Keine Nachrichten von {user.name}</div>
          )}
        </div>
        <div className="user-right-info">
          {hourmins && <div className="date">{hourmins}</div>}
          {message &&
            message.from === user._id &&
            !message.read &&
            ((message.status && message.status !== "seen") ||
              !message.status) && <div className="new-message-notify">1</div>}
        </div>
      </div>
    </div>
  );
};

export default NewSingleUser;
