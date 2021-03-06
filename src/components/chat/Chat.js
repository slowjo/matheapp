import React, { Fragment, useState, useEffect } from "react";
import ChatNewTask from "./ChatNewTask";
import YourTask from "../tasks/YourTask";
import TheirTask from "../tasks/TheirTask";
// import { clearFromChat } from "../../actions/authActions";

const Chat = ({
  selectedUser,
  newTask,
  appUser,
  socketId,
  // usersTask,
  tasks,
  taskSolved,
  setTaskMessage,
  setSentChatMessage,
  // mobileChat,
  markAsRead,
}) => {
  const [chatMessages, setChatMessages] = useState([]);

  const [groupedChatMessages, setGroupedChatMessages] = useState({});

  const [alreadySent, setAlreadySent] = useState(null);

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
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

  const sortFunc = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  };

  // useEffect(() => {
  //   const sent = tasks.sentTasks.filter((task) => task.to === selectedUser._id);
  //   if (sent.length > 0) {
  //     setAlreadySent(sent[0]);
  //   } else {
  //     setAlreadySent(null);
  //   }
  //   const received = tasks.unsolvedTasks.filter(
  //     (task) => task.from === selectedUser._id
  //   );
  //   const notificationMessages = tasks.taskMessages.filter(
  //     (task) => task.from === selectedUser._id
  //   );
  //   setChatMessages([...sent, ...received, ...notificationMessages]);
  // }, [tasks, selectedUser]);

  useEffect(() => {
    const sent = tasks.sentTasks.filter((task) => task.to === selectedUser._id);
    if (sent.length > 0) {
      setAlreadySent(sent[0]);
    } else {
      setAlreadySent(null);
    }
    setChatMessages(selectedUser.messageList);
  }, [tasks, selectedUser]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    markAsRead(selectedUser, appUser._id);
    // eslint-disable-next-line
  }, [selectedUser._id, selectedUser.messageList.length]);

  useEffect(() => {
    const thisDate = new Date().getDate();

    if (chatMessages) {
      const messagesWithDateDay = chatMessages.map((message) => {
        const messageDate = new Date(message.date).getDate();

        return {
          ...message,
          theDateDay:
            messageDate === thisDate
              ? "Heute"
              : getDayMonthYear(new Date(message.date)),
        };
      });

      console.log(
        messagesWithDateDay.reduce((rv, x) => {
          (rv[x["theDateDay"]] = rv[x["theDateDay"]] || []).push(x);
          return rv;
        }, {})
      );

      setGroupedChatMessages(
        messagesWithDateDay.reduce((rv, x) => {
          (rv[x["theDateDay"]] = rv[x["theDateDay"]] || []).push(x);
          return rv;
        }, {})
      );
    }

    // if (mobileChat === true) {
    setTimeout(() => {
      console.log(document.getElementById("theChat"));
      const chatDiv = document.getElementById("theChat");
      if (chatDiv) {
        chatDiv.scrollTop = chatDiv.scrollHeight;
      }
    }, 0);
    // }
    // eslint-disable-next-line
  }, [chatMessages]);

  // console.log("chatMessages: ", chatMessages);

  // console.log("keys: ", Object.keys(groupedChatMessages));
  // console.log("chat: ", chatMessages);

  return (
    <div className="chat-container">
      <div className="chat" id="theChat">
        {Object.keys(groupedChatMessages).map((messageDate) => (
          /* <Fragment key={new Date().toISOString()}> */
          <Fragment key={messageDate.toString()}>
            <div className="chat-item chat-date">{messageDate}</div>
            {groupedChatMessages[messageDate]
              .sort(sortFunc)
              .map((messageItem) => (
                <div
                  key={messageItem._id}
                  className={
                    "chat-item " +
                    (messageItem.from === selectedUser._id ? "them" : "you")
                  }
                >
                  {messageItem.from === selectedUser._id &&
                  (messageItem.type === "multiplication" ||
                    messageItem.type === "addition" ||
                    messageItem.type === "subtraction" ||
                    messageItem.type === "division") ? (
                    <YourTask
                      task={messageItem}
                      taskSolved={taskSolved}
                      selectedUser={selectedUser}
                      setTaskMessage={setTaskMessage}
                      appUser={appUser}
                      setSentChatMessage={setSentChatMessage}
                    />
                  ) : (
                    <TheirTask task={messageItem} />
                  )}
                  <div className="chat-item-info">
                    {messageItem.from !== selectedUser._id &&
                      (messageItem.type === "multiplication" ||
                        messageItem.type === "addition" ||
                        messageItem.type === "subtraction" ||
                        messageItem.type === "division") && (
                        <div className="chat-item-info-check">
                          {messageItem.status === "sent" && (
                            <i className="fas fa-check" />
                          )}
                          {(messageItem.status === "received" ||
                            messageItem.status === "seen") && (
                            <i
                              className={`fas fa-check-double ${messageItem.status}`}
                            />
                          )}
                        </div>
                      )}
                    <div className="chat-item-info-time">
                      {getHourMins(messageItem.date)}{" "}
                    </div>
                  </div>
                </div>
              ))}
          </Fragment>
        ))}
      </div>
      <ChatNewTask
        selectedUser={selectedUser}
        newTask={newTask}
        appUser={appUser}
        socketId={socketId}
        usersTask={alreadySent}
      />
    </div>
  );
};

export default Chat;
