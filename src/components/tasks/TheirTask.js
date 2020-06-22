import React, { Fragment } from "react";

const TheirTask = ({ task }) => {
  let theOperator;
  if (task.type === "addition") theOperator = "+";
  if (task.type === "subtraction") theOperator = "-";
  if (task.type === "multiplication") theOperator = "x";
  if (task.type === "division") theOperator = "/";

  return (
    <Fragment>
      {(task.type === "multiplication" ||
        task.type === "addition" ||
        task.type === "subtraction" ||
        task.type === "division") && (
        <div className="task-form">
          {/* <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2> */}
          <div className="text-center">
            {/* <h4 className="text-center">Von {user && user.name}:</h4> */}
            <span className="font-30">
              {task.numberOne} {theOperator} {task.numberTwo} = ?
            </span>
          </div>
        </div>
      )}
      {task.type === "message" && <div>{task.message}</div>}
    </Fragment>
  );
};

export default TheirTask;
