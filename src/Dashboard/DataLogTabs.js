import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Tabs, Tab, Divider } from "@material-ui/core";
import GoogleAPI from "./GoogleAPI";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "2% 5%",
  },
  sensorLocationContainer: {
    display: "flex",
  },
  sensorDetailContainer: {
    width: "50%",
    paddingRight: "5%",
    marginBottom: "2%",
    borderRight: "1px rgba(0, 0, 0, 0.12) solid",
  },
  logContainer: {
    width: "100%",
    height: "100%",
  },
  divider: {
    margin: "0 5%",
  },
  locationInfo: {
    width: "50%",
    padding: "0 2% 2% 5%",
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
      <div position="static">
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Data" id="data" />
          <Tab label="Log" id="log" />
        </Tabs>
      </div>
      <TabPanel
        currentTab={currentTab}
        tabIndex={0}
        aria-labelledby="data"
        className={classes.sensorLocationContainer}
      >
        <div className={classes.sensorDetailContainer}>
          <Typography align="left" className={classes.title} variant="h4">
            Sensor Details:
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
        {/* <Divider className={classes.divider} orientation="vertical" /> */}
        <div className={classes.locationInfo}>
          <Typography align="left" className={classes.title} variant="h4">
            Location:
          </Typography>
          <GoogleAPI location={currentDevice.gps} />
        </div>
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
