import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import AuthContainer from "../Components/AuthContainer/JS/AuthContainer";
import LoginForm from "../Components/Login/LoginForm/JS/LoginForm";

const Login = ({ show }) => {
  // Declerations
  const history = useHistory();

  // Handlers
  const LoginHandler = async (data) => {
    await axios
      .post("http://localhost/users/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then(async (res) => {
        await show({ type: res.data.type, message: res.data.message });
        if (res.data.type === "Success") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("newBie", true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <AuthContainer>
      <LoginForm submit={LoginHandler} />
    </AuthContainer>
  );
};

export default Login;
