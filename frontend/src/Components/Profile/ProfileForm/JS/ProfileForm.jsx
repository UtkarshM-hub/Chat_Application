import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "../CSS/ProfileForm.module.css";

const ProfileForm = ({
  UserName,
  Email,
  Description,
  Name,
  setUserName,
  setName,
  setDescription,
  ProfilePic,
  RemoveProfilePic,
  setEmail,
  uploadPictureHandler,
}) => {
  return (
    <div className={classes.ProfileForm}>
      <div className={classes.ProfileForm_FormContainer}>
        <form>
          <div className={classes.ProfileForm_MainElementContainer}>
            <p>
              UserName
              <span className={classes.ProfileForm_Important}>*</span>
            </p>
            <input
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter UserName"
            />
          </div>
          <div className={classes.ProfileForm_MainElementContainer}>
            <p>
              Name<span className={classes.ProfileForm_Important}>*</span>
            </p>
            <input
              value={Name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </div>
          <div className={classes.ProfileForm_MainElementContainer}>
            <p>
              Decription
              <span className={classes.ProfileForm_Important}>*</span>
            </p>
            <input
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter Description"
            />
          </div>
          <div className={classes.ProfileForm_MainElementContainer}>
            <p>
              Email<span className={classes.ProfileForm_Important}>*</span>
            </p>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </div>
        </form>
      </div>
      <div className={classes.ProfileForm_ProfilePic}>
        <div className={classes.ProfileForm_ImageContainer}>
          <img src={ProfilePic} alt="ProfilePicture" />
        </div>
        <div className={classes.ProfileForm_UpdateButtons}>
          <p>Edit Profile Picture</p>
          <div className={classes.ProfileForm_ButtonContainer}>
            <button
              onClick={(e) => RemoveProfilePic()}
              className={`${classes.ProfileForm_Buttons} ${classes.ProfileForm_Remove}`}
            >
              Remove
            </button>
            <button
              onClick={(e) => {
                uploadPictureHandler();
              }}
              className={`${classes.ProfileForm_Buttons} ${classes.ProfileForm_Update}`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
