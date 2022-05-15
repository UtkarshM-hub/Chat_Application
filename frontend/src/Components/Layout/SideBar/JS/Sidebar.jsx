import React from "react";
import classes from "../CSS/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faChartLine,
  faShoppingBag,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import {
  HomeOutlined,
  SettingsOutlined,
  BarChartOutlined,
  SellOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.Sidebar_Main}>
        <NavLink
          exact
          to="/"
          activeClassName={classes.active}
          className={classes.Sidebar_IconContainer}
        >
          <HomeOutlined />
        </NavLink>
        <NavLink
          to="/inventory"
          activeClassName={classes.active}
          className={classes.Sidebar_IconContainer}
        >
          <Inventory2Outlined />
        </NavLink>
        <NavLink
          to="/Sales"
          activeClassName={classes.active}
          className={classes.Sidebar_IconContainer}
        >
          <SellOutlined />
        </NavLink>
        <NavLink
          to="/Analytics"
          activeClassName={classes.active}
          className={classes.Sidebar_IconContainer}
        >
          <BarChartOutlined />
        </NavLink>
        <NavLink
          to="/settings"
          activeClassName={classes.active}
          className={`${classes.Sidebar_IconContainer}`}
        >
          <SettingsOutlined />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
