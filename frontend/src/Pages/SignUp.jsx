import React from "react";
import AuthContainer from "../Components/AuthContainer/JS/AuthContainer";
import SignUpForm from "../Components/SignUp/SignUpForm/JS/SignUpform";
import axios from "axios";

const SignUp = ({ show }) => {
  // Handlers
  const SignInHandler = (data) => {
    axios
      .post("http://localhost/users/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.type === "Success") {
          show({ message: res.data.message, type: res.data.type });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContainer>
      <SignUpForm show={show} SignIn={SignInHandler} />
    </AuthContainer>
  );
};

export default SignUp;
