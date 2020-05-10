import React from "react";

const TaskItem = ({ task, selectTask }) => {
  const onClick = () => {
    console.log("click");
    selectTask(task);
  };

  return (
    <div onClick={onClick} className="task-item">
      {task.numberOne} &times; {task.numberTwo} = ?
    </div>
  );
};

export default TaskItem;
