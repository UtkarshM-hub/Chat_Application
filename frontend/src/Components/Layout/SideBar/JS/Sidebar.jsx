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

const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.Sidebar_Main}>
        <div className={classes.Sidebar_IconContainer}>
          <HomeOutlined />
        </div>
        <div className={classes.Sidebar_IconContainer}>
          <Inventory2Outlined />
        </div>
        <div className={classes.Sidebar_IconContainer}>
          <SellOutlined />
        </div>
        <div className={classes.Sidebar_IconContainer}>
          <BarChartOutlined />
        </div>
        <div className={classes.Sidebar_IconContainer}>
          <SettingsOutlined />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
