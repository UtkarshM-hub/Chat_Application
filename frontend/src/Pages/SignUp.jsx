import React from "react";
import AuthContainer from "../Components/AuthContainer/JS/AuthContainer";
import SignUpForm from "../Components/SignUp/SignUpForm/JS/SignUpform";
import axios from "axios";

const SignUp = () => {
  // Handlers
  const SignInHandler = (data) => {
    axios
      .post("http://localhost/users/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContainer>
      <SignUpForm SignIn={SignInHandler} />
    </AuthContainer>
  );
};

export default SignUp;
