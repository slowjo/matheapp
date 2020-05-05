import React from "react";
import SingleUser from "../users/SingleUser";

const Users = ({
  users,
  appUser,
  selectUser,
  clearSelectedUser,
  selectedUser,
  newTask,
  tasks,
  taskSolved,
  setTaskMessage,
}) => {
  return (
    <div className="users-container">
      {appUser &&
        users.map(
          (user) =>
            user._id !== appUser._id && (
              <SingleUser
                key={user._id}
                user={user}
                appUser={appUser}
                selectedUser={selectedUser}
                selectUser={selectUser}
                clearSelectedUser={clearSelectedUser}
                newTask={newTask}
                tasks={tasks}
                taskSolved={taskSolved}
                setTaskMessage={setTaskMessage}
              />
            )
        )}
    </div>
  );
};

export default Users;
