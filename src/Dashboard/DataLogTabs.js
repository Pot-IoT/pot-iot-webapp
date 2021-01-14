import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import GoogleAPI from "./GoogleAPI";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "2% 5%",
  },
  sensorLocationContainer: {
    display: "flex",
  },
  sensorDetailContainer: {
    width: "720px",
    height: "720px",
  },
  logContainer: {
    width: "100%",
    height: "720px",
  },
}));

function TabPanel(props) {
  const { children, currentTab, tabIndex, ...others } = props;
  return (
    <div hidden={currentTab !== tabIndex} {...others}>
      {currentTab === tabIndex && children}
    </div>
  );
}
export default (props) => {
  const { currentDevice } = props;
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (e, newValue) => {
    console.log(newValue);
    setCurrentTab(newValue);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleChangeTab}>
          <Tab label="Data" id="data" />
          <Tab label="Log" id="log" />
        </Tabs>
      </AppBar>
      <TabPanel
        currentTab={currentTab}
        tabIndex={0}
        aria-labelledby="data"
        className={classes.sensorLocationContainer}
      >
        <div className={classes.sensorDetailContainer}>
          <Typography align="left" className={classes.title} variant="h4">
            Sensor Details
          </Typography>
          <Typography align="left" className={classes.title} variant="h5">
            LED Status
          </Typography>
          <Typography variant="h6">
            {currentDevice.led_status > 0 ? "ON" : "OFF"}
          </Typography>
          <Typography align="left" className={classes.title} variant="h5">
            Acceleration
          </Typography>
          <Typography variant="h6">{currentDevice.acceleration}</Typography>
        </div>
        <GoogleAPI location={currentDevice.gps} />
      </TabPanel>
      <TabPanel
        currentTab={currentTab}
        tabIndex={1}
        aria-labelledby="log"
        className={classes.logContainer}
      ></TabPanel>
    </div>
  );
};
