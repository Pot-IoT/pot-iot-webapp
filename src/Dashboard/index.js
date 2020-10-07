import React, { useState } from "react";
import Navbar from "./Navbar";
import Overview from "./Overview";
import GoogleAPI from "./GoogleAPI";
import SensorDetail from "./SensorDetail";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Typography,
  TextField,
  MenuItem,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    maxWidth: "1440px",
    backgroundColor: "#f5f5f5",
    margin: "0 auto",
  },
  divider: {
    margin: "0 5%",
  },
  dropdown: {
    margin: "20px 0 20px 5%",
    display: "flex",
  },
  sensorLocationContainer: {
    display: "flex",
  },
  thingInfo: {
    display: "flex",
  },
  thingInfoCard: {
    width: "25%",
    height: "400px",
    margin: "20px 5%",
  },
}));
export default (props) => {
  const classes = useStyles();
  const deviceList = [
    { name: "apple", location: { lat: 47.444, lng: -122.176 } },
    { name: "banana", location: { lat: 40.444, lng: -120.176 } },
    { name: "carrot", location: { lat: 50, lng: -122 } },
  ];
  const [currentDevice, setCurrentDevice] = useState(deviceList[0]);
  const handleChange = (e) => {
    setCurrentDevice(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className={classes.dashboardContainer}>
        <Overview />
        <Divider className={classes.divider} />
        <div className={classes.dropdown}>
          <Typography align="left" className={classes.title} variant="h4">
            Device:&nbsp;
          </Typography>
          <TextField
            select
            label=""
            value={currentDevice}
            onChange={handleChange}
          >
            {deviceList.map((option) => (
              <MenuItem key={option.name} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.thingInfo}>
          <Paper className={classes.thingInfoCard} />
          <Paper className={classes.thingInfoCard} />
          <Paper className={classes.thingInfoCard} />
        </div>
        <div className={classes.sensorLocationContainer}>
          <SensorDetail />
          <GoogleAPI location={currentDevice.location} />
        </div>
      </div>
    </div>
  );
};
