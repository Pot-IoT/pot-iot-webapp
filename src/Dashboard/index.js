import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Overview from "./Overview";
import NewDeviceModal from "../common/NewDeviceModal";
import DataLogTabs from "./DataLogTabs";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Typography,
  TextField,
  MenuItem,
  Paper,
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
  Battery90,
  Battery80,
  Battery60,
  Battery50,
  Battery30,
  Battery20,
  BatteryAlert,
  Error,
} from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Loading from "../common/Loading";
import EmptyDeviceList from "../common/EmptyDeviceList";
import {
  getDeviceList,
  newDevice,
  toggleIsLoading,
  getCommandLog,
} from "./store/actionCreators";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    maxWidth: "1440px",
    backgroundColor: "#f5f5f5",
    margin: "0 auto",
    padding: "0 0 5%",
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
  icon: {
    padding: "0 1%",
  },
}));
const Dashboard = (props) => {
  const {
    isLoading,
    deviceList,
    totalNumber,
    totalOffline,
    totalOnline,
    commandLog,
    toggleIsLoadingDispatch,
    getDeviceListDispatch,
    newDeviceDispatch,
    getCommandLogDispatch,
  } = props;
  const classes = useStyles();
  const userToken = window.localStorage.getItem("user_token");
  const [currentDevice, setCurrentDevice] = useState({});
  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);

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
  const handleAddNewDevice = () => {
    setNewDeviceModalOpen(true);
  };
  const addNewDevice = (deviceDetails) => {
    toggleIsLoadingDispatch(true);
    newDeviceDispatch(deviceDetails, userToken);
  };
  const getLogs = (logTimeArr) => {
    getCommandLogDispatch(userToken, currentDevice.imei, logTimeArr);
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
    switch (Math.floor(currentDevice.battery / 10)) {
      case 10:
      case 9:
        return <BatteryFull />;
      case 8:
        return <Battery90 />;
      case 7:
        return <Battery80 />;
      case 6:
      case 5:
        return <Battery60 />;
      case 4:
        return <Battery50 />;
      case 3:
      case 2:
        return <Battery30 />;
      case 1:
        return <Battery20 />;
      case 0:
        return <BatteryAlert />;
      default:
        return <BatteryUnknown />;
    }
  };

  return localStorage.getItem("user_token") ? (
    <div>
      {totalNumber === 0 ? (
        <EmptyDeviceList handleAddNewDevice={handleAddNewDevice} />
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
            <div className={classes.icon}>{showSignalStrength()}</div>
            <div className={classes.icon}>{showBatteryRemaining()}</div>
            <strong>Command in queue: </strong>
            {currentDevice.device_command}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewDevice}
              className={classes.newDeviceBtnAtEnd}
            >
              Add Device
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
                {moment(currentDevice.on_time).format() || "--:--:----"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Offline Time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {moment(currentDevice.off_time).format() || "--:--:----"}
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
                {currentDevice.communication_mode > 0 &&
                currentDevice.communication_interval > 0
                  ? `Mode ${currentDevice.communication_mode} - Every ${currentDevice.communication_interval}mins`
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
                {moment(currentDevice.last_communication).format() ||
                  "--:--:----"}
              </Typography>
              <Typography
                align="left"
                className={classes.deviceDetailTitle}
                variant="h6"
              >
                Next Communication time
              </Typography>
              <Typography align="left" className={classes.deviceDetailValue}>
                {currentDevice.communication_interval > 0
                  ? moment(currentDevice.last_communication)
                      .add(currentDevice.communication_interval, "minutes")
                      .format()
                  : "--:--:----"}
              </Typography>
            </Paper>
          </div>
          <DataLogTabs
            currentDevice={currentDevice}
            getLogs={getLogs}
            commandLog={commandLog}
          />
        </div>
      )}
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
    commandLog: state.dashboard.commandLog,
  };
};
const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  getDeviceListDispatch: getDeviceList,
  newDeviceDispatch: newDevice,
  getCommandLogDispatch: getCommandLog,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
