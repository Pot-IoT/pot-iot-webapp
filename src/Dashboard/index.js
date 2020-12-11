import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Loading from "../common/Loading";

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
  modalInput: {
    width: "80%",
    margin: "0 auto 20px",
  },
  modalButton: {
    width: "20%",
    margin: "0 auto 20px",
  },
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
}));
export default (props) => {
  const classes = useStyles();
  const deviceList = [
    { name: "apple", location: { lat: 47.444, lng: -122.176 } },
    { name: "banana", location: { lat: 40.444, lng: -120.176 } },
    { name: "carrot", location: { lat: 50, lng: -122 } },
  ];
  const userToken = window.localStorage.getItem("user_token");
  const [currentDevice, setCurrentDevice] = useState(deviceList[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("//115.29.191.198:8080/changeUsername?token=" + userToken, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success === true) {
          localStorage.setItem("data", data.data);
        }
      });
  }, []);

  const handleChange = (e) => {
    setCurrentDevice(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,29}$/.test(e.target.value));
  };
  const handleSubmitUsername = () => {
    setIsLoading(true);
    fetch("//115.29.191.198:8080/changeUsername?token=" + userToken, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setModalOpen(false);
        if (data.success === true) {
          alert("Username successfully changed!");
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            default:
              console.log("data", data);
          }
        }
      });
  };

  return localStorage.getItem("user_token") ? (
    <div>
      <Navbar setChangeUsernameModalOpen={setModalOpen} />
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
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        height={250}
        width={700}
      >
        <DialogTitle>Please type your new username here:</DialogTitle>
        <TextField
          variant="outlined"
          margin="normal"
          label="Username"
          name="username"
          className={classes.modalInput}
          autoFocus
          onChange={handleUsernameChange}
          error={usernameErr}
          FormHelperTextProps={{
            className: usernameErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Username has to be a combination of letters and numbers with length between 3 and 30, and it has to be different from your current username."
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={handleSubmitUsername}
          disabled={usernameErr}
        >
          OK
        </Button>
      </Dialog>
      {isLoading && <Loading />}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};
