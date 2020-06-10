import React, { useState } from "react";

const ChatNewTask = ({
  selectedUser,
  newTask,
  appUser,
  socketId,
  usersTask,
}) => {
  const [task, setTask] = useState({
    numberOne: "",
    numberTwo: "",
  });

  const { numberOne, numberTwo } = task;

  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (numberOne === "" || numberTwo === "") {
      alert("Bitte fülle beide Felder aus");
    } else if (numberOne > 99 || numberTwo === 99) {
      alert("Das ist zu schwer, bitte gib kleinere Zahlen ein");
    } else if (numberOne * numberTwo > 999) {
      alert("Das ist zu schwer, bitte gib kleinere Zahlen ein");
    } else if (numberOne < 0 || numberTwo < 0) {
      alert("Nein");
      setTask({
        numberOne: "",
        numberTwo: "",
      });
    } else {
      newTask({
        numberOne,
        numberTwo,
        from: appUser._id,
        to: selectedUser._id,
        toSocket: socketId,
      });
      setTask({
        numberOne: "",
        numberTwo: "",
      });
      //   clearSelectedUser();
      //   setTaskMessage("Aufgabe abgeschickt");
    }
  };

  return (
    <div className="chat-input">
      {!usersTask ? (
        <div className="text-center">
          Schicke {selectedUser.name} eine Aufgabe!
        </div>
      ) : (
        <div className="text-center">
          Du hast {selectedUser.name} eine Aufgabe geschickt.
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="text-center py-10">
          <input
            disabled={usersTask !== null}
            type="number"
            min="0"
            name="numberOne"
            value={numberOne}
            onChange={onChange}
            className="task-input"
          />{" "}
          <span className="font-30">&times;</span>{" "}
          <input
            disabled={usersTask !== null}
            type="number"
            min="0"
            name="numberTwo"
            value={numberTwo}
            onChange={onChange}
            className="task-input"
          />{" "}
          <span className="font-30">= ?</span>
          {/* <input type="submit" value="Abschicken" className="btn" /> */}
          {/* <input type="submit" className="btn" value="Yay" /> */}
          {!usersTask ? (
            <button type="submit" className="btn send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          ) : (
            <div className="btn send-btn-off">
              <i className="fas fa-paper-plane"></i>
            </div>
          )}
        </div>
      </form>
      {/* <div className="send-btn">
        <i className="fas fa-paper-plane"></i>
      </div> */}
    </div>
  );
};

export default ChatNewTask;
