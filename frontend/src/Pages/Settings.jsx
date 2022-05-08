import React, { useEffect } from "react";
import SettingsBar from "../Components/Settings/SettingsBar/JS/SettingsBar";
import SettingsContainer from "../Components/Settings/SettingsContainer/JS/SettingsContainer";
import axios from "axios";
import { ChatActions } from "../Store/store";
import { useDispatch } from "react-redux";

const Settings = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    const GetSettings = async () => {
      await axios
        .post(
          "http://localhost/users/getSettingsHandler",
          JSON.stringify({ userId: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.SetSettings(res.data)));
    };
    GetSettings();
  }, []);
  return <h1>This is it</h1>;
};

export default Settings;
