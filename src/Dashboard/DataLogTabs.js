import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tabs, Tab, TextField, MenuItem } from "@material-ui/core";
import { NotListedLocation } from "@material-ui/icons";
import GoogleAPI from "./GoogleAPI";
import moment from "moment";

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
  details: {
    padding: "0 10%",
  },
  logTitles: {
    display: "flex",
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
function LocationInfoMissing() {
  return (
    <div>
      {/* <NotListedLocation /> */}
      <picture>
        <source
          media="(min-width:768px)"
          srcSet="//via.placeholder.com/600x400"
        />
        <img src="//via.placeholder.com/300x400" alt="" />
      </picture>
      <Typography align="center" variant="h5">
        Oops...We can't find this device
        <br />
        Please check your device's GPS or status
      </Typography>
    </div>
  );
}
export default (props) => {
  const { currentDevice, getLogs, commandLog } = props;
  console.log("????", currentDevice.gps);
  const deviceLocation =
    currentDevice.gps && currentDevice.gps.length
      ? JSON.parse(currentDevice.gps)
      : {};
  const classes = useStyles();
  const closest5Days = [0, 1, 2, 3, 4].map((element) => {
    return moment().subtract(element, "days").format("YYYY-MM-DD");
  });
  const logTypeList = ["Device Log", "Communication Log"];
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(closest5Days[0]);
  const [currentLogType, setCurrentLogType] = useState(logTypeList[0]);

  const handleChangeTab = (e, newValue) => {
    console.log(newValue);
    if (newValue === 1 && Object.keys(commandLog).length === 0) {
      getLogs(closest5Days);
    }
    setCurrentTab(newValue);
  };
  const handleSelectedDateChange = (e) => setSelectedDate(e.target.value);
  const handleCurrentLogTypeChange = (e) => setCurrentLogType(e.target.value);
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
          <Typography align="left" className={classes.title} variant="h6">
            LED Status:
          </Typography>
          <Typography className={classes.details}>
            {currentDevice.led_status > 0 ? "ON" : "OFF"}
          </Typography>
          <Typography align="left" className={classes.title} variant="h6">
            Acceleration:
          </Typography>
          <Typography variant="h6">{currentDevice.acceleration}</Typography>
        </div>
        {/* <Divider className={classes.divider} orientation="vertical" /> */}
        <div className={classes.locationInfo}>
          <Typography align="left" className={classes.title} variant="h4">
            Location:
          </Typography>
          <Typography align="left" className={classes.title} variant="h7">
            {currentDevice.gps &&
              currentDevice.gps !== "" &&
              `Latitude: ${deviceLocation.lat}, Longitude: ${deviceLocation.lng}`}
          </Typography>
          {!currentDevice.gps || currentDevice.gps === "" ? (
            <LocationInfoMissing />
          ) : (
            <GoogleAPI location={currentDevice.gps} />
          )}
        </div>
      </TabPanel>
      <TabPanel
        currentTab={currentTab}
        tabIndex={1}
        aria-labelledby="log"
        className={classes.logContainer}
      >
        <div className={classes.logTitles}>
          <Typography align="left" className={classes.title} variant="h7">
            Select Date:&nbsp;
          </Typography>
          <TextField
            select
            label=""
            value={selectedDate}
            onChange={handleSelectedDateChange}
          >
            {closest5Days.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography align="left" className={classes.title} variant="h7">
            Log Type:&nbsp;
          </Typography>
          <TextField
            select
            label=""
            value={currentLogType}
            onChange={handleCurrentLogTypeChange}
          >
            {logTypeList.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          {!commandLog || Object.keys(commandLog).length === 0 ? (
            <Typography align="left" variant="h7">
              Log is empty
            </Typography>
          ) : (
            <Typography align="left" className={classes.title} variant="h7">
              {"Log Name: " + commandLog[selectedDate]["log_name"]}
              {"Log: " + commandLog[selectedDate]["log"]}
            </Typography>
          )}
        </div>
      </TabPanel>
    </div>
  );
};
