import React, { Fragment } from "react";

const TheirTask = ({ task }) => {
  return (
    <Fragment>
      {task.type === "multiplication" && (
        <div className="task-form">
          {/* <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2> */}
          <div className="text-center">
            {/* <h4 className="text-center">Von {user && user.name}:</h4> */}
            <span className="font-30">
              {task.numberOne} &times; {task.numberTwo} = ?
            </span>
          </div>
        </div>
      )}
      {task.type === "message" && <div>{task.message}</div>}
    </Fragment>
  );
};

export default TheirTask;
