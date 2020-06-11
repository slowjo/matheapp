import React, { Fragment } from "react";
import NewSingleUser from "./NewSingleUser";
import { Link } from "react-router-dom";

const NewUsers = ({ users, selectUser, tasks, desktop, appUser }) => {
  return (
    <Fragment>
      {desktop ? (
        users.map((user) => {
          if (user._id !== appUser._id) {
            const messageList = [];
            tasks.sentTasks.map((task) =>
              task.to === user._id ? messageList.push(task) : null
            );
            tasks.unsolvedTasks.map((task) =>
              task.from === user._id ? messageList.push(task) : null
            );
            return (
              <NewSingleUser
                key={user._id}
                user={user}
                selectUser={selectUser}
                tasks={tasks}
                messageList={messageList}
              />
            );
          }
        })
      ) : (
        <Link to="/chatpage" className="user-link">
          {users.map((user) => {
            if (user._id !== appUser._id) {
              const messageList = [];
              tasks.sentTasks.map((task) =>
                task.to === user._id ? messageList.push(task) : null
              );
              tasks.unsolvedTasks.map((task) =>
                task.from === user._id ? messageList.push(task) : null
              );
              tasks.taskMessages.map((task) =>
                task.from === user._id ? messageList.push(task) : null
              );
              return (
                <NewSingleUser
                  key={user._id}
                  user={user}
                  selectUser={selectUser}
                  tasks={tasks}
                  messageList={messageList}
                />
              );
            }
          })}
        </Link>
      )}
    </Fragment>
  );
};

export default NewUsers;
