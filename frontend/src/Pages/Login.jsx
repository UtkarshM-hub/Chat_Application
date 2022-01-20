import React, { useState } from "react";
import LoginComponent from "../Components/Login/Js/LoginComponent";
import { getSocket } from "../socket";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [userExist, setUserExist] = useState(false);
  const socket = getSocket();
  const loginHandler = (username, room) => {
    const data = {
      username: username,
      room: room,
    };
    socket.emit("joinRoom", data, (message) => {
      setUserExist(message.isUserExist);
      if (!message.isUserExist) {
        history.push("/chatbox");
      }
    });
  };
  return (
    <>
      <LoginComponent onLogin={loginHandler} isUserExist={userExist} />
    </>
  );
};

export default Login;
