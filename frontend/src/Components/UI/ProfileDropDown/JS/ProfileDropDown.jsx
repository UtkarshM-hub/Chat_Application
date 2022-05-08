import React from "react";
import classes from "../CSS/ProfileDropDown.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useHistory } from "react-router-dom";

const ProfileDropDown = () => {
  const history = useHistory();
  return (
    <div className={classes.ProfileDropDown}>
      <div className={classes.ProfileDropDown_MainContainer}>
        <div
          className={classes.ProfileDropDown_Element}
          onClick={(e) => history.push("/Settings/Profile")}
        >
          <AccountCircleOutlinedIcon />
          <p>Profile</p>
        </div>
        <div
          className={classes.ProfileDropDown_Element}
          onClick={(e) => history.push("/MyOrders")}
        >
          <LocalMallOutlinedIcon />
          <p>My Orders</p>
        </div>
        <div className={classes.ProfileDropDown_Element}>
          <LogoutOutlinedIcon />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
