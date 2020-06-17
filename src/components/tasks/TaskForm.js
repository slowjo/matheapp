import React, { useState } from "react";
// import { clearSelectedUser } from "../../actions/usersActions";

const TaskForm = ({
  user,
  appUser,
  newTask,
  socketId,
  // clearSelectedUser,
  // setTaskMessage,
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
        to: user._id,
        toSocket: socketId,
      });
      // clearSelectedUser();
      // setTaskMessage("Aufgabe abgeschickt");
      alert("Aufgabe abgeschickt");
    }
  };

  return (
    <div className="task-form">
      <h4 className="text-center">Schicke {user.name} eine Aufgabe</h4>
      <form onSubmit={onSubmit}>
        <div className="text-center py-10">
          <input
            type="number"
            min="0"
            name="numberOne"
            value={numberOne}
            onChange={onChange}
            className="task-input"
          />{" "}
          <span className="font-30">&times;</span>{" "}
          <input
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
          <button type="submit" className="btn btn-round">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
