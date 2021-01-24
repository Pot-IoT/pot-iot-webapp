import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Overview from "./Overview";
import NewDeviceModal from "./NewDeviceModal";
import DataLogTabs from "./DataLogTabs";
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
import {
  SignalCellularOff,
  SignalCellular1Bar,
  SignalCellular2Bar,
  SignalCellular3Bar,
  SignalCellular4Bar,
  BatteryUnknown,
  BatteryFull,
  Battery50,
  Error,
} from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Loading from "../common/Loading";
import {
  getDeviceList,
  newDevice,
  toggleIsLoading,
} from "./store/actionCreators";
import { setUsername } from "../Login/store/actionCreators";

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
    paddingRight: "2%",
    display: "flex",
  },
  thingInfo: {
    display: "flex",
  },
  thingInfoCard: {
    width: "25%",
    height: "400px",
    margin: "20px 5%",
    padding: "2%",
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
  buttonGroup: {
    display: "flex",
    margin: "50px auto",
    width: "fit-content",
  },
  emptylistPic: {
    display: "block",
    margin: "100px auto",
  },
  newDeviceBtn: {
    marginRight: "100px",
  },
  newDeviceBtnAtEnd: {
    marginLeft: "auto",
  },
  deviceDetailValue: {
    marginBottom: "15%",
  },
}));
const Dashboard = (props) => {
  const {
    username,
    isLoading,
    deviceList,
    totalNumber,
    totalOffline,
    totalOnline,
    toggleIsLoadingDispatch,
    getDeviceListDispatch,
    newDeviceDispatch,
    setUsernameDispatch,
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
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameErr, setNewUsernameErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDeviceListDispatch(userToken);
  }, []);
  useEffect(() => {
    if (deviceList.length !== 0) {
      setCurrentDevice(deviceList[0]);
    }
  }, [deviceList]);

  const handleChange = (e) => {
    setCurrentDevice(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setNewUsernameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,29}$/.test(e.target.value));
  };
  const handleSubmitUsername = () => {
    if (newUsername === username) {
      alert("Please enter a different username.");
      return;
    }
    // setIsLoading(true);
    fetch("//115.29.191.198:8080/changeUsername?token=" + userToken, {
      method: "POST",
      body: JSON.stringify({
        username: newUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setIsLoading(false);
        setUsernameModalOpen(false);
        if (data.success === true) {
          setUsernameDispatch(newUsername);
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
  const showSignalStrength = () => {
    switch (currentDevice.signal_strength) {
      case 4:
        return <SignalCellular4Bar />;
      case 3:
        return <SignalCellular3Bar />;
      case 2:
        return <SignalCellular2Bar />;
      case 1:
        return <SignalCellular1Bar />;
      default:
        return <SignalCellularOff />;
    }
  };
  const showBatteryRemaining = () => {
    switch (currentDevice.battery) {
      case "full":
        return <BatteryFull />;
      case "half":
        return <Battery50 />;
      default:
        return <BatteryUnknown />;
    }
  };

  return localStorage.getItem("user_token") ? (
    <div>
      <Navbar
        setChangeUsernameModalOpen={setUsernameModalOpen}
        username={username}
      />
      {totalNumber == 0 ? (
        <div>
          <picture>
            <source
              media="(min-width:768px)"
              srcSet="//via.placeholder.com/600x400"
            />
            <img
              className={classes.emptylistPic}
              src="//via.placeholder.com/300x400"
              alt=""
            />
          </picture>
          <Typography align="center" variant="h2">
            You don't have any device yet.
          </Typography>
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewDevice}
              className={classes.newDeviceBtn}
            >
              New Device
            </Button>
            <Button variant="outlined" color="primary">
              How Dashboard works?
            </Button>
          </div>
        </div>
      ) : (
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
            {showSignalStrength()}
            {showBatteryRemaining()}
            <Error />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewDevice}
              className={classes.newDeviceBtnAtEnd}
            >
              New Device
            </Button>
          </div>
          <div className={classes.thingInfo}>
            <Paper className={classes.thingInfoCard}>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                IMEI
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.imei || "--"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Device Name
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.name || "--"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Device Description
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.description || "--"}
              </Typography>
            </Paper>
            <Paper className={classes.thingInfoCard}>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Start Time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.on_time || "--:--:----"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Offline Time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.off_time || "--:--:----"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Connection Duration
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.off_time - currentDevice.on_time || "--"}
              </Typography>
            </Paper>
            <Paper className={classes.thingInfoCard}>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
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
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Last Communication time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.last_communication || "--:--:----"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Next Communication time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.next_communication || "--:--:----"}
              </Typography>
            </Paper>
          </div>
          <DataLogTabs currentDevice={currentDevice} />
        </div>
      )}
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
          error={newUsernameErr}
          FormHelperTextProps={{
            className: newUsernameErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Username has to be a combination of letters and numbers with length between 3 and 30, and it has to be different from your current username."
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={handleSubmitUsername}
          disabled={newUsername === "" || newUsernameErr}
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
    username: state.login.username,
    isLoading: state.dashboard.isLoading,
    deviceList,
    totalOnline,
    totalOffline: deviceList.length - totalOnline,
    totalNumber: deviceList.length,
  };
};
const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  getDeviceListDispatch: getDeviceList,
  newDeviceDispatch: newDevice,
  setUsernameDispatch: setUsername,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
