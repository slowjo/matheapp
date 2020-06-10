import React from "react";

const TheirTask = ({ task }) => {
  return (
    <div className="task-form">
      {/* <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2> */}
      <div className="text-center">
        {/* <h4 className="text-center">Von {user && user.name}:</h4> */}
        <span className="font-30">
          {task.numberOne} &times; {task.numberTwo} = ?
        </span>
      </div>
    </div>
  );
};

export default TheirTask;
