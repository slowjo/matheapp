import React from "react";
import TaskItem from "./TaskItem";
import YourTask from "./YourTask";

const Tasks = ({
  tasks,
  selectTask,
  taskSolved,
  setTaskMessage,
  users,
  clearSelectedTask,
}) => {
  return (
    <div className="tasks">
      <h4 className="text-center">Deine Aufgaben</h4>
      {tasks.map((task) => (
        /* <TaskItem key={task._id} task={task} selectTask={selectTask} /> */
        <YourTask
          key={task._id}
          task={task}
          taskSolved={taskSolved}
          setTaskMessage={setTaskMessage}
          users={users}
          clearSelectedTask={clearSelectedTask}
        />
      ))}
    </div>
  );
};

export default Tasks;
