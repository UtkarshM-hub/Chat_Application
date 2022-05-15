import React, { useEffect } from "react";
import AnalyticsComponent from "../Components/Analytics/JS/AnalyticsComponent";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import { ChatActions } from "../Store/store";
import { useDispatch } from "react-redux";
import axios from "axios";

const Analytics = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getAnalyticsDataHandler = async () => {
      await axios
        .post(
          "http://localhost/Analytics/GetAnalytics",
          JSON.stringify({ userId: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.setAnalytics(res.data)));
    };
    getAnalyticsDataHandler();
  }, []);
  return (
    <Alignment>
      <h1 style={{ color: "white", margin: "0 0 1em 0" }}>Analytics</h1>
      <AnalyticsComponent />
    </Alignment>
  );
};

export default Analytics;
