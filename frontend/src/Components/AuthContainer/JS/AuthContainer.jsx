import React from "react";
import classes from "../CSS/AuthContainer.module.css";
import sideImage from "../../../Sources/Example.jpg";

const AuthContainer = ({ children, type }) => {
  return (
    <div className={classes.AuthContainer}>
      <div className={classes.AuthContainer_formContainer}>
        <div className={classes.AuthContainer_InnerForm}>
          <div className={classes.AuthContainer_HeaderSec}>
            <div className={classes.AuthContainer_Header}>
              <h1>
                C<span className={classes.AuthContainer_Dot}>.</span>
              </h1>
            </div>
            <div className={classes.AuthContainer_Header}>
              <h2>{type === "Signup" ? "Sign Up" : "Login"}</h2>
              <p>Connect with your friends and have fun!</p>
            </div>
          </div>
          <div className={classes.AuthContainer_FormSec}>{children}</div>
        </div>
        <p className={classes.AuthContainer_copyright}>
          @2022 C. All rights reserved
        </p>
      </div>
      <div className={classes.AuthContainer_ImageContainer}>
        <img
          src="https://res.cloudinary.com/dcglxmssd/image/upload/v1648387328/8323473b3e37df82514c281a506ecf31_bwfdpa.webp"
          alt="sideimage"
        />
      </div>
    </div>
  );
};

export default AuthContainer;
