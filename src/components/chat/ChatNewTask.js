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

  const [taskType, setTaskType] = useState("multiplication");

  console.log(taskType);

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
    } else if (
      (taskType === "multiplication" && (numberOne > 99 || numberTwo > 99)) ||
      numberOne > 500 ||
      numberTwo > 500
    ) {
      alert("Das ist zu schwer, bitte gib kleinere Zahlen ein");
    } else if (taskType === "multiplication" && numberOne * numberTwo > 999) {
      alert("Das ist zu schwer, bitte gib kleinere Zahlen ein");
    } else if (
      taskType === "subtraction" &&
      parseInt(numberTwo) > parseInt(numberOne)
    ) {
      alert("Das Ergebnis soll nicht negativ sein");
    } else if (taskType === "division" && numberOne % numberTwo !== 0) {
      alert("Sorry das geht nicht");
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
        type: taskType,
      });
      setTask({
        numberOne: "",
        numberTwo: "",
      });
      //   clearSelectedUser();
      //   setTaskMessage("Aufgabe abgeschickt");
    }
  };

  const onTypeChange = (e) => {
    setTaskType(e.target.name);
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
      <form className="chat-input-form" onSubmit={onSubmit}>
        <div className="text-center chat-input-grid-container">
          <div className="chat-input-wrapper">
            <input
              disabled={usersTask !== null}
              type="number"
              min="0"
              name="numberOne"
              value={numberOne}
              onChange={onChange}
              className="task-input"
            />{" "}
            <span className="font-30">
              {/* {taskType === "multiplication" && "&times;"} */}
              {taskType === "multiplication" && "x"}
              {taskType === "addition" && "+"}
              {taskType === "subtraction" && "-"}
              {taskType === "division" && "/"}
            </span>{" "}
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
          </div>
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
      <div className="task-type-button-list">
        <button
          onClick={onTypeChange}
          name="addition"
          className="task-type-button"
        >
          Addition
        </button>
        <button
          onClick={onTypeChange}
          name="subtraction"
          className="task-type-button"
        >
          Subtraktion
        </button>
        <button
          onClick={onTypeChange}
          name="multiplication"
          className="task-type-button"
        >
          Multiplication
        </button>
        <button
          onClick={onTypeChange}
          name="division"
          className="task-type-button"
        >
          Division
        </button>
      </div>
    </div>
  );
};

export default ChatNewTask;
