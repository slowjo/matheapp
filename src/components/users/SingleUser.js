import React, { Fragment } from "react";
import TaskForm from "../tasks/TaskForm";
import YourTask from "../tasks/YourTask";

const SingleUser = ({
  user,
  appUser,
  selectUser,
  clearSelectedUser,
  selectedUser,
  newTask,
  tasks,
  taskSolved,
  setTaskMessage,
}) => {
  const { name, _id, socketId, online } = user;

  const usersTask = tasks.sentTasks.filter((task) => task.to === _id);

  const yourTask = tasks.unsolvedTasks.filter((task) => task.from === _id);

  const onClick = () => {
    console.log("click");
    if (usersTask.length === 0) {
      if (selectedUser !== null && _id === selectedUser) {
        clearSelectedUser();
      } else {
        selectUser(_id);
      }
    }
  };

  return (
    <Fragment>
      <div onClick={onClick} className="single-user">
        <h3>{name}</h3>
        {online ? <h2>online</h2> : <h2>offline</h2>}
        {usersTask.length > 0 && (
          <h4>
            Du hast {name} gefragt was {usersTask[0].numberOne} *{" "}
            {usersTask[0].numberTwo} ergibt
          </h4>
        )}
      </div>
      {selectedUser && _id === selectedUser && (
        <TaskForm
          user={user}
          newTask={newTask}
          appUser={appUser}
          socketId={socketId}
          clearSelectedUser={clearSelectedUser}
          setTaskMessage={setTaskMessage}
        />
      )}
      {yourTask.length > 0 && (
        <YourTask
          from={name}
          task={yourTask[0]}
          taskSolved={taskSolved}
          fromSocketId={socketId}
          setTaskMessage={setTaskMessage}
        />
      )}
    </Fragment>
  );
};

export default SingleUser;