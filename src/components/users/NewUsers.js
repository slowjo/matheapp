import React, { Fragment, useState, useEffect } from "react";
import NewSingleUser from "./NewSingleUser";
import { Link } from "react-router-dom";

const NewUsers = ({ users, selectUser, tasks, desktop, appUser }) => {
  // const [sortedUsers, setSortedUsers] = useState(null);

  // const sortFunc = (a, b) => {
  //   if (a.date < b.date) {
  //     return -1;
  //   }
  //   if (a.date > b.date) {
  //     return 1;
  //   }
  //   return 0;
  // };

  // const sortFuncTwo = (a, b) => {
  //   if (a.newestMessage.date < b.newestMessage.date) {
  //     return 1;
  //   }
  //   if (a.newestMessage.date > b.newestMessage.date) {
  //     return -1;
  //   }
  //   return 0;
  // };

  // const sortAndAddArray = (usersArray) => {
  //   return usersArray.map((item) => {
  //     if (item.messageList) {
  //       const sortedMessageList = item.messageList.sort(sortFunc);
  //       if (sortedMessageList.length > 0) {
  //         return {
  //           ...item,
  //           newestMessage: sortedMessageList[sortedMessageList.length - 1],
  //         };
  //       } else {
  //         return {
  //           ...item,
  //           newestMessage: { message: "No message", date: "-1" },
  //         };
  //       }
  //     } else {
  //       return {
  //         ...item,
  //         newestMessage: { message: "No message", date: "-1" },
  //       };
  //     }
  //   });
  // };

  // useEffect(() => {
  //   setSortedUsers(sortAndAddArray(users).sort(sortFuncTwo));
  // }, [users]);

  // console.log("sorted users set: ", sortedUsers);

  return (
    <Fragment>
      {desktop ? (
        users &&
        users.map((user) => {
          if (user._id !== appUser._id) {
            /* const messageList = [];
            tasks.sentTasks.map((task) =>
              task.to === user._id ? messageList.push(task) : null
            );
            tasks.unsolvedTasks.map((task) =>
              task.from === user._id ? messageList.push(task) : null
            ); */
            return (
              <NewSingleUser
                key={user._id}
                user={user}
                selectUser={selectUser}
                tasks={tasks}
                /* messageList={messageList} */
                messageList={user.messageList}
              />
            );
          }
        })
      ) : (
        <Link to="/chatpage" className="user-link">
          {users &&
            users.map((user) => {
              if (user._id !== appUser._id) {
                /* const messageList = [];
              tasks.sentTasks.map((task) =>
                task.to === user._id ? messageList.push(task) : null
              );
              tasks.unsolvedTasks.map((task) =>
                task.from === user._id ? messageList.push(task) : null
              );
              tasks.taskMessages.map((task) =>
                task.from === user._id ? messageList.push(task) : null
              ); */
                return (
                  <NewSingleUser
                    key={user._id}
                    user={user}
                    selectUser={selectUser}
                    tasks={tasks}
                    /* messageList={messageList} */
                    messageList={user.messageList}
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
