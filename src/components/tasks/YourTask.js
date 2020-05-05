import React, { useState } from "react";

const YourTask = ({ from, task, taskSolved, fromSocketId, setTaskMessage }) => {
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
        taskSolved(task, parseInt(result), fromSocketId);
        setResult("");
      } else {
        setTaskMessage("Leider falsch, probier es nochmal!");
        setResult("");
      }
    }
  };

  return (
    <div>
      <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2>
      <form onSubmit={onSubmit}>
        <div className="text-center">
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
        </div>
        <input
          type="submit"
          value="Ergebnis prüfen"
          className="btn btn-block"
        />
      </form>
    </div>
  );
};

export default YourTask;
