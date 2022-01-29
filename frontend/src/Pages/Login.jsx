import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginContainer from "../Components/Login/LoginContainer/JS/LoginContainer";
import LoginForm from "../Components/Login/LoginForm/JS/LoginForm";
import { getSocket } from "../socket";

const Login = () => {
  // Declerations
  const socket = getSocket();
  const history = useHistory();
  const [message, setMessage] = useState(undefined);

  // Handlers
  const FormSubmitHandler = (data) => {
    socket.emit("login", data, (message) => {
      setMessage(message);
      let time = setTimeout(() => {
        setMessage(undefined);
        history.push("/chatbox");
        clearTimeout(time);
      }, 5000);
    });
  };

  return (
    <LoginContainer>
      <LoginForm submit={FormSubmitHandler} message={message} />
    </LoginContainer>
  );
};

export default Login;
