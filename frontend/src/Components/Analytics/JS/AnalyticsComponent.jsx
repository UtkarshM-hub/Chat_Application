import React, { useEffect, useState } from "react";
import classes from "../CSS/AnalyticsComponent.module.css";
import { useSelector } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  ArcElement,
} from "chart.js";

const date = new Date();
const AnalyticsComponent = () => {
  const todayDate = date.getDate();
  let week;
  if (todayDate >= 1 && todayDate <= 7) {
    week = 1;
  }
  if (todayDate >= 8 && todayDate <= 15) {
    week = 2;
  }
  if (todayDate >= 16 && todayDate <= 23) {
    week = 3;
  }
  if (todayDate >= 24 && todayDate <= 31) {
    week = 4;
  }
  const analytics = useSelector((state) => state.Analytics);
  const [ActiveElement, setActiveElement] = useState("Orders");
  const [CurrentAnalytics, setCurrentAnalytics] = useState();
  const [ChartData, setChartData] = useState();
  const [ShowBy, setShowBy] = useState("Weekly");
  const [Week, setWeek] = useState(week);
  const [CurrentviewingState, setCurrentviewingState] = useState("Days");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler,
    ArcElement
  );

  useEffect(() => {
    setCurrentAnalytics(analytics.currentMonth);
  }, [analytics]);

  useEffect(() => {
    if (CurrentAnalytics !== undefined) {
      if (ShowBy === "Weekly") {
        if (ActiveElement === "Orders") {
          setChartData(
            CurrentAnalytics.Orders.Items[Week - 1].data.map((item) => item)
          );
          return;
        }
        if (ActiveElement === "Revenue") {
          setChartData(
            CurrentAnalytics.Revenue.Items[Week - 1].data.map((item) => item)
          );
          return;
        }
        if (ActiveElement === "Visits") {
          setChartData(
            CurrentAnalytics.Visits.Items[Week - 1].data.map((item) => item)
          );
          return;
        }
      }
      if (ShowBy === "Monthly") {
        if (ActiveElement === "Orders") {
          setChartData(CurrentAnalytics.Orders.data.map((item) => item));
          return;
        }
        if (ActiveElement === "Revenue") {
          setChartData(CurrentAnalytics.Revenue.data.map((item) => item));
          return;
        }
        if (ActiveElement === "Visits") {
          setChartData(CurrentAnalytics.Visits.data.map((item) => item));
          return;
        }
      }
    }
  }, [ActiveElement, CurrentAnalytics, Week, ShowBy]);

  return (
    <div className={classes.AnalyticsComponent}>
      <div className={classes.AnalyticsComponent_AnalyticsOptions}>
        <div className={classes.AnalyticsComponent_header}>
          <h3>Chart</h3>
        </div>
        <div className={classes.AnalyticsComponent_Types}>
          <div
            onClick={(e) => setActiveElement("Orders")}
            className={`${classes.AnalyticsComponent_TypesElement} ${
              ActiveElement === "Orders" ? classes.ActiveElement : ""
            }`}
          >
            <p>Orders</p>
          </div>
          <div
            onClick={(e) => setActiveElement("Revenue")}
            className={`${classes.AnalyticsComponent_TypesElement} ${
              ActiveElement === "Revenue" ? classes.ActiveElement : ""
            }`}
          >
            <p>Revenue</p>
          </div>
          <div
            onClick={(e) => setActiveElement("Visits")}
            className={`${classes.AnalyticsComponent_TypesElement} ${
              ActiveElement === "Visits" ? classes.ActiveElement : ""
            }`}
          >
            <p>Visits</p>
          </div>
        </div>
        <div className={classes.AnalyticsComponent_Options}>
          <div className={classes.AnalyticsComponent_OptionsContainer}>
            <p>Select:</p>
            <select
              defaultValue="Weekly"
              onChange={(e) => setShowBy(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
          {ShowBy === "Weekly" && (
            <div className={classes.AnalyticsComponent_OptionsContainer}>
              <p>Week:</p>
              <select
                defaultValue={week}
                onChange={(e) => setWeek(e.target.value)}
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
                <option value={4}>fourth</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {CurrentAnalytics !== undefined && (
        <div className={classes.AnalyticsComponent_MainContainer}>
          <Bar
            className={classes.AnalyticsComponent_Chart}
            data={{
              labels:
                ShowBy === "Weekly"
                  ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                  : ["First Week", "Second Week", "Third Week", "Fourth Week"],
              datasets: [
                {
                  // data: [25, 32, 22, 39, 34, 22, 23],
                  data: ChartData,
                  fill: true,
                  backgroundColor: [
                    "#7DE274",
                    "#7EE0E7",
                    "#9068FE",
                    "#CC7272",
                    "#7EE0E7",
                    "#7EE0E7",
                  ],
                  barThickness: 35,
                },
              ],
            }}
            width={550}
            options={{
              // maintainAspectRatio:false,
              // responsive: true,
              // datasetStrokeWidth : 3,
              // pointDotStrokeWidth : 4,
              scales: {
                // ticks:{
                //   grid:{
                //     display:false
                //   },
                //   precision:0
                //   },
                yAxes: {
                  ticks: {
                    beginAtZero: true,
                    precision: 0,
                  },
                  grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                    display: false,
                  },
                },
                xAxes: {
                  ticks: {
                    precision: 0,
                    color: "white",
                  },
                  gridLines: {
                    display: false,
                  },
                  grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsComponent;
