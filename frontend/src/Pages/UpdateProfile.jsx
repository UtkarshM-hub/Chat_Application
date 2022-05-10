import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../Components/Profile/ProfileForm/JS/ProfileForm";
import SettingsHeader from "../Components/UI/SettingsHeader/JS/SettingsHeader";
import { ChatActions } from "../Store/store";

const UpdateProfile = () => {
  const userId = localStorage.getItem("userId");
  const userData = useSelector((state) => state.user);
  const [UserName, setUserName] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Email, setEmail] = useState("");
  const [ProfilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const [SetFile, setSetFile] = useState();

  const SaveFormHandler = async () => {
    let data = {
      Name: Name,
      UserName: UserName,
      Email: Email,
      Description: Description,
    };
    if (UserName !== "" && Name !== "" && Description !== "" && Email !== "") {
      await axios
        .post(
          "http://localhost/users/EditUserData",
          JSON.stringify({ userId: userId, data }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  const RemoveProfilePicHandler = async () => {
    await axios
      .post(
        "http://localhost/users/RemoveProfilePic",
        JSON.stringify({ userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        dispatch(ChatActions.setImage({ url: res.data.ProfilePic }));
      });
  };

  const uploadPictureHandler = async () => {
    let imageEle = document.createElement("input");
    imageEle.type = "file";
    imageEle.click();
    imageEle.onchange = async (e) => {
      setSetFile(e.target.files[0]);
      let FileData = new FormData();
      FileData.append("userId", userId);
      FileData.append("picture", SetFile);
      await axios
        .post("http://localhost/users/UpdateProfilePic", FileData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) =>
          dispatch(ChatActions.setImage({ url: res.data.ProfilePic }))
        );
    };
  };

  useEffect(() => {
    setUserName(userData.UserName);
    setName(userData.Name);
    setDescription(userData.Description);
    setEmail(userData.Email);
    setProfilePic(userData.ProfilePic);
  }, [userData]);
  return (
    <div>
      <SettingsHeader
        saveHandler={SaveFormHandler}
        Header="Profile"
        Text="Update your Profile details"
      />
      {userData !== undefined && (
        <ProfileForm
          UserName={UserName}
          Name={Name}
          Description={Description}
          Email={Email}
          ProfilePic={ProfilePic}
          setUserName={setUserName}
          setName={setName}
          setDescription={setDescription}
          setEmail={setEmail}
          RemoveProfilePic={RemoveProfilePicHandler}
          uploadPictureHandler={uploadPictureHandler}
        />
      )}
    </div>
  );
};

export default UpdateProfile;
