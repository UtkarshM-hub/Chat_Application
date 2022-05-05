import React from "react";
import classes from "../CSS/ProfileDropDown.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const ProfileDropDown = () => {
  return (
    <div className={classes.ProfileDropDown}>
      <div className={classes.ProfileDropDown_MainContainer}>
        <div className={classes.ProfileDropDown_Element}>
          <AccountCircleOutlinedIcon />
          <p>Profile</p>
        </div>
        {/* <div className={classes.ProfileDropDown_Element}>
          <ShoppingCartOutlinedIcon />
          <p>Cart</p>
        </div> */}
        <div className={classes.ProfileDropDown_Element}>
          <LogoutOutlinedIcon />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
