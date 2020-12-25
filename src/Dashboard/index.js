import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Overview from "./Overview";
import GoogleAPI from "./GoogleAPI";
import SensorDetail from "./SensorDetail";
import NewDeviceModal from "./NewDeviceModal";
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
import {
  getDeviceList,
  newDevice,
  toggleIsLoading,
} from "./store/actionCreators";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    maxWidth: "1440px",
    backgroundColor: "#f5f5f5",
    margin: "0 auto",
  },
  divider: {
    margin: "0 5%",
  },
  deviceSectionHeader: {
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
const Dashboard = (props) => {
  const {
    isLoading,
    deviceList,
    totalNumber,
    totalOffline,
    totalOnline,
    toggleIsLoadingDispatch,
    getDeviceListDispatch,
    newDeviceDispatch,
  } = props;
  const classes = useStyles();
  // const deviceList = [
  //   { name: "apple", location: { lat: 47.444, lng: -122.176 } },
  //   { name: "banana", location: { lat: 40.444, lng: -120.176 } },
  //   { name: "carrot", location: { lat: 50, lng: -122 } },
  // ];
  const userToken = window.localStorage.getItem("user_token");
  const [currentDevice, setCurrentDevice] = useState({});
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDeviceListDispatch(userToken);
  }, []);

  const handleChange = (e) => {
    setCurrentDevice(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,29}$/.test(e.target.value));
  };
  const handleSubmitUsername = () => {
    // setIsLoading(true);
    fetch("//115.29.191.198:8080/changeUsername?token=" + userToken, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setIsLoading(false);
        setUsernameModalOpen(false);
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
  const handleAddNewDevice = () => {
    setNewDeviceModalOpen(true);
  };
  const addNewDevice = (deviceDetails) => {
    toggleIsLoadingDispatch(true);
    newDeviceDispatch(deviceDetails, userToken);
  };

  return localStorage.getItem("user_token") ? (
    <div>
      <Navbar setChangeUsernameModalOpen={setUsernameModalOpen} />
      <div className={classes.dashboardContainer}>
        <Overview
          totalNumber={totalNumber}
          totalOffline={totalOffline}
          totalOnline={totalOnline}
        />
        <Divider className={classes.divider} />
        <div className={classes.deviceSectionHeader}>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewDevice}
          >
            New Device
          </Button>
        </div>
        <div className={classes.thingInfo}>
          <Paper className={classes.thingInfoCard}>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Device ID
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.ID || "--"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Device Name
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.name || "--"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Device Description
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.description || "--"}
            </Typography>
          </Paper>
          <Paper className={classes.thingInfoCard}>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Start Time
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.on_time || "--:--:----"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Offline Time
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.off_time || "--:--:----"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Connection Duration
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.off_time - currentDevice.on_time || "--"}
            </Typography>
          </Paper>
          <Paper className={classes.thingInfoCard}>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Connection Mode and Interval
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.communication_mode &&
              currentDevice.communication_interval
                ? currentDevice.communication_mode +
                  "/" +
                  currentDevice.communication_interval
                : "--"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Last Communication time
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.last_communication || "--:--:----"}
            </Typography>
            <Typography align="left" className={classes.deviceDetailTitle}>
              Next Communication time
            </Typography>
            <Typography align="left" className={classes.deviceDetailValue}>
              {currentDevice.next_communication || "--:--:----"}
            </Typography>
          </Paper>
        </div>
        <div className={classes.sensorLocationContainer}>
          <SensorDetail />
          <GoogleAPI location={currentDevice.gps} />
        </div>
      </div>
      <Dialog
        open={usernameModalOpen}
        onClose={() => setUsernameModalOpen(false)}
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
      <NewDeviceModal
        newDeviceModalOpen={newDeviceModalOpen}
        setNewDeviceModalOpen={setNewDeviceModalOpen}
        addNewDevice={addNewDevice}
      />
      {isLoading && <Loading />}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};
const mapStateToProps = (state) => {
  let deviceList = state.dashboard.deviceList;
  let totalOnline = 0;
  deviceList.forEach((element) => {
    if (element.device_status >= 1) totalOnline += 1;
  });
  return {
    isLoading: state.dashboard.isLoading,
    deviceList,
    totalOnline,
    totalOffline: deviceList.length - totalOnline,
    totalNumber: deviceList.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsLoadingDispatch(isLoading) {
      dispatch(toggleIsLoading(isLoading));
    },
    getDeviceListDispatch(userToken) {
      dispatch(getDeviceList(userToken));
    },
    newDeviceDispatch(deviceDetails, userToken) {
      dispatch(newDevice(deviceDetails, userToken));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
