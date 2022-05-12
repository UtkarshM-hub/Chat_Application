import React from "react";
import classes from "../CSS/SettingsBar.module.css";
import { NavLink, useHistory } from "react-router-dom";

const SettingsBar = () => {
  const history = useHistory();
  return (
    <div className={classes.SettingsBar}>
      <div
        onClick={(e) => history.push("/Settings/Profile")}
        className={classes.SettingsBar_Elements}
      >
        <NavLink to="/Settings/Profile" activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div
        onClick={(e) => history.push("/Settings/General")}
        className={classes.SettingsBar_Elements}
      >
        <NavLink to="/Settings/General" activeClassName={classes.active}>
          General Details
        </NavLink>
      </div>
      {/* <div
        onClick={(e) => history.push("/Settings/Payments")}
        className={classes.SettingsBar_Elements}
      >
        <NavLink to="/Settings/Payments" activeClassName={classes.active}>
          Payments
        </NavLink>
      </div> */}
    </div>
  );
};

export default SettingsBar;
