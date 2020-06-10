import React, { useState, useEffect } from "react";
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
}) => {
  const [chatMessages, setChatMessages] = useState([]);

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
    setChatMessages([...sent, ...received]);

    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [tasks, selectedUser]);

  const ref = React.createRef();

  useEffect(() => {
    // ref.current.scrollTop = ref.current.height;
    // console.log(ref.current.innerHeight);
    // console.log(ref.current);
    ref.current.scrollTop = window.innerHeight;
  }, [chatMessages]);

  // console.log("chatMessages: ", chatMessages);

  return (
    <div className="chat-container">
      <div className="chat" ref={ref}>
        <div className="chat-item chat-date">HEUTE</div>
        <div className="chat-item you">
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
        </div>
        {chatMessages.sort(sortFunc).map((message) => (
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
              />
            ) : (
              <TheirTask task={message} />
            )}
            <div className="chat-item-info">{getHourMins(message.date)} </div>
          </div>
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
