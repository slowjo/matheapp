import React, { Fragment, useState, useEffect } from "react";
import ChatNewTask from "./ChatNewTask";
import YourTask from "../tasks/YourTask";
import TheirTask from "../tasks/TheirTask";
import { clearFromChat } from "../../actions/authActions";

const Chat = ({
  selectedUser,
  newTask,
  appUser,
  socketId,
  usersTask,
  tasks,
  taskSolved,
  setTaskMessage,
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

  useEffect(() => {
    const sent = tasks.sentTasks.filter((task) => task.to === selectedUser._id);
    if (sent.length > 0) {
      setAlreadySent(sent[0]);
    } else {
      setAlreadySent(null);
    }
    const received = tasks.unsolvedTasks.filter(
      (task) => task.from === selectedUser._id
    );
    const notificationMessages = tasks.taskMessages.filter(
      (task) => task.from === selectedUser._id
    );
    setChatMessages([...sent, ...received, ...notificationMessages]);
  }, [tasks, selectedUser]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const ref = React.createRef();

  useEffect(() => {
    ref.current.scrollTop = window.innerHeight;

    const thisDate = new Date().getDate();

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
  }, [chatMessages]);

  // console.log("chatMessages: ", chatMessages);

  return (
    <div className="chat-container">
      <div className="chat" ref={ref}>
        {/* <div className="chat-item chat-date">HEUTE</div> */}
        {/* <div className="chat-item you">
          <div className="chat-item-message">Chat Message</div>
          <div className="chat-item-info">15:30</div>
        </div>
        <div className="chat-item them">
          <div className="chat-item-message">Chat Message</div>
          <div className="chat-item-info">15:30</div>
        </div>
        <div className="chat-item you">
          <div className="chat-item-message">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
            quia nisi soluta quidem, ipsam nostrum.
          </div>
          <div className="chat-item-info">15:50</div>
        </div>
        <div className="chat-item them">
          <div className="chat-item-message">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </div>
          <div className="chat-item-info">17:30</div>
        </div>
        <div className="chat-item you">
          <div className="chat-item-message">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
            quia nisi soluta quidem, ipsam nostrum.
          </div>
          <div className="chat-item-info">18:10</div>
        </div>
        <div className="chat-item them">
          <div className="chat-item-message">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </div>
          <div className="chat-item-info">19:30</div>
        </div> */}
        {Object.keys(groupedChatMessages).map((messageDate) => (
          <Fragment key={new Date().toISOString()}>
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
                  messageItem.type === "multiplication" ? (
                    <YourTask
                      task={messageItem}
                      taskSolved={taskSolved}
                      selectedUser={selectedUser}
                      setTaskMessage={setTaskMessage}
                    />
                  ) : (
                    <TheirTask task={messageItem} />
                  )}
                  <div className="chat-item-info">
                    {getHourMins(messageItem.date)}{" "}
                  </div>
                </div>
              ))}
          </Fragment>
        ))}
        {/* {chatMessages.sort(sortFunc).map((message) => (
          <div
            key={message._id}
            className={
              "chat-item " +
              (message.from === selectedUser._id ? "them" : "you")
            }
          >
            {message.from === selectedUser._id &&
            message.type === "multiplication" ? (
              <YourTask
                task={message}
                taskSolved={taskSolved}
                selectedUser={selectedUser}
                setTaskMessage={setTaskMessage}
              />
            ) : (
              <TheirTask task={message} />
            )}
            <div className="chat-item-info">{getHourMins(message.date)} </div>
          </div>
        ))} */}
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
