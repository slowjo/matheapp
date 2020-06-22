import React, { useState } from "react";

const YourTask = ({
  from,
  task,
  taskSolved,
  // fromSocketId,
  setTaskMessage,
  // users,
  // clearSelectedTask,
  selectedUser,
  appUser,
  setSentChatMessage,
}) => {
  // let socketId;
  // const [socketId, setSocketId] = useState(null);
  // eslint-disable-next-line
  const [socketId, setSocketId] = useState(selectedUser.socketId);
  // let userDummy;
  // const [user, setUser] = useState(null);
  // const [user, setUser] = useState(selectedUser);

  // useEffect(() => {
  //   userDummy = users.find((item) => item._id === task.from);
  //   setUser(userDummy);
  //   setSocketId(userDummy.socketId);
  //   console.log(userDummy);
  //   console.log(userDummy.name);
  // }, [users]);

  const [result, setResult] = useState("");
  const onChange = (e) => {
    setResult(e.target.value);
  };

  // console.log(task);

  const checkResult = (task, result) => {
    if (task.type === "addition") {
      return parseInt(result) === task.numberOne + task.numberTwo;
    } else if (task.type === "subtraction") {
      return parseInt(result) === task.numberOne - task.numberTwo;
    } else if (task.type === "multiplication") {
      return parseInt(result) === task.numberOne * task.numberTwo;
    } else if (task.type === "division") {
      return parseInt(result) === task.numberOne / task.numberTwo;
    } else {
      return false;
    }
  };

  let theOperator;
  if (task.type === "addition") theOperator = "+";
  if (task.type === "subtraction") theOperator = "-";
  if (task.type === "multiplication") theOperator = "x";
  if (task.type === "division") theOperator = "/";

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      task.type === "multiplication" ||
      task.type === "addition" ||
      task.type === "subtraction" ||
      task.type === "division"
    ) {
      console.log(`its a ${task.type}`);
      if (checkResult(task, result)) {
        // alert("Richtig, gut gemacht!");
        setSentChatMessage({
          message: `${task.numberOne} ${theOperator} ${task.numberTwo} = ${result}`,
          from: appUser._id,
          to: task.from,
          type: "message",
          date: new Date(),
        });
        setTaskMessage(
          {
            message: "Richtig, gut gemacht!",
            from: task.from,
            type: "message",
            date: new Date(),
          },
          true
        );
        taskSolved(task, parseInt(result), socketId);
        setResult("");
        // clearSelectedTask();
      } else {
        // setTaskMessage("Leider falsch, probier es nochmal!");
        // alert("Leider falsch, probier es nochmal!");
        setSentChatMessage({
          message: `${task.numberOne} ${theOperator} ${task.numberTwo} = ${result}`,
          from: appUser._id,
          to: task.from,
          type: "message",
          date: new Date(),
        });
        setTaskMessage(
          {
            message: "Leider falsch, probier es nochmal!",
            from: task.from,
            type: "message",
            date: new Date(),
          },
          true,
          task
        );
        setResult("");
      }
    }
    // if (task.type === "multiplication") {
    //   console.log("its a multiplication");
    //   if (parseInt(result) === task.numberOne * task.numberTwo) {
    //     // alert("Richtig, gut gemacht!");
    //     setSentChatMessage({
    //       message: `${task.numberOne} x ${task.numberTwo} = ${result}`,
    //       from: appUser._id,
    //       to: task.from,
    //       type: "message",
    //       date: new Date(),
    //     });
    //     setTaskMessage(
    //       {
    //         message: "Richtig, gut gemacht!",
    //         from: task.from,
    //         type: "message",
    //         date: new Date(),
    //       },
    //       true
    //     );
    //     taskSolved(task, parseInt(result), socketId);
    //     setResult("");
    //     // clearSelectedTask();
    //   } else {
    //     // setTaskMessage("Leider falsch, probier es nochmal!");
    //     // alert("Leider falsch, probier es nochmal!");
    //     setSentChatMessage({
    //       message: `${task.numberOne} x ${task.numberTwo} = ${result}`,
    //       from: appUser._id,
    //       to: task.from,
    //       type: "message",
    //       date: new Date(),
    //     });
    //     setTaskMessage(
    //       {
    //         message: "Leider falsch, probier es nochmal!",
    //         from: task.from,
    //         type: "message",
    //         date: new Date(),
    //       },
    //       true,
    //       task
    //     );
    //     setResult("");
    //   }
    // }
  };

  return (
    <div className="task-form">
      {/* <h2 className="text-center">{from} hat dir eine Aufgabe gestellt!</h2> */}
      <form onSubmit={onSubmit}>
        <div className="text-center">
          {/* <h4 className="text-center">Von {user && user.name}:</h4> */}
          <span className="font-30">
            {/* {task.numberOne} &times; {task.numberTwo} ={" "} */}
            {task.numberOne} {theOperator} {task.numberTwo} ={" "}
          </span>
          <input
            className="task-input"
            type="number"
            name="result"
            value={result}
            onChange={onChange}
          />
          <button type="submit" className="btn send-btn-block">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        {/* <input
          type="submit"
          value="Ergebnis prüfen"
          className="btn btn-block"
        /> */}
      </form>
    </div>
  );
};

export default YourTask;
