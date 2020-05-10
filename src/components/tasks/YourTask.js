import React, { useState, useEffect } from "react";

const YourTask = ({
  from,
  task,
  taskSolved,
  fromSocketId,
  setTaskMessage,
  users,
  clearSelectedTask,
}) => {
  // let socketId;
  const [socketId, setSocketId] = useState(null);
  let userDummy;
  const [user, setUser] = useState(null);

  useEffect(() => {
    userDummy = users.find((item) => item._id === task.from);
    setUser(userDummy);
    setSocketId(userDummy.socketId);
    console.log(userDummy);
    console.log(userDummy.name);
  }, [users]);

  const [result, setResult] = useState("");
  const onChange = (e) => {
    setResult(e.target.value);
  };

  // console.log(task);

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.type === "multiplication") {
      console.log("its a multiplication");
      if (parseInt(result) === task.numberOne * task.numberTwo) {
        // alert("Richtig, gut gemacht!");
        setTaskMessage("Richtig, gut gemacht!");
        taskSolved(task, parseInt(result), socketId);
        setResult("");
        clearSelectedTask();
      } else {
        setTaskMessage("Leider falsch, probier es nochmal!");
        setResult("");
      }
    }
  };

  return (
    <div className="task-form">
      {/* <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2> */}
      <form onSubmit={onSubmit}>
        <div className="text-center">
          <h4 className="text-center">Von {user && user.name}:</h4>
          <span className="font-30">
            {task.numberOne} &times; {task.numberTwo} ={" "}
          </span>
          <input
            className="task-input"
            type="number"
            name="result"
            value={result}
            onChange={onChange}
          />
          <button type="submit" className="btn btn-round">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        {/* <input
          type="submit"
          value="Ergebnis prüfen"
          className="btn btn-block"
        /> */}
      </form>
    </div>
  );
};

export default YourTask;
