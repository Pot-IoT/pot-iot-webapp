import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import NewDeviceModal from "../Dashboard/NewDeviceModal";
import {
  getDeviceList,
  newDevice,
  toggleIsLoading,
} from "../Dashboard/store/actionCreators";
import "./devices.scss";

const Devices = (props) => {
  const {
    deviceList,
    getDeviceListDispatch,
    toggleIsLoadingDispatch,
    newDeviceDispatch,
  } = props;
  const userToken = window.localStorage.getItem("user_token");

  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);
  useEffect(() => {
    getDeviceListDispatch(userToken);
  }, []);

  const handleAddNewDevice = () => {
    setNewDeviceModalOpen(true);
  };
  const addNewDevice = (deviceDetails) => {
    toggleIsLoadingDispatch(true);
    newDeviceDispatch(deviceDetails, userToken);
  };
  return (
    <div className="device-board">
      <div className="device-board__header">
        <div className="device-board__header__title">Devices</div>
        <Button
          variant="contained"
          color="primary"
          className="device-board__header__add-btn"
          onClick={handleAddNewDevice}
        >
          Add Device
        </Button>
      </div>
      <table className="device-board__table">
        <tbody>
          <tr className="device-board__table__header">
            <td>Status</td>
            <td>Signal</td>
            <td>Battery</td>
            <td>Device Name</td>
            <td>Transmission Interval</td>
          </tr>
          {deviceList.map((device) => (
            <tr className="device-board__table__body">
              <td>{device.device_status}</td>
              <td>{device.signal_strength}</td>
              <td>{device.battery}</td>
              <td>{device.name}</td>
              <td>{device.communication_interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewDeviceModal
        newDeviceModalOpen={newDeviceModalOpen}
        setNewDeviceModalOpen={setNewDeviceModalOpen}
        addNewDevice={addNewDevice}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  let deviceList = state.dashboard.deviceList;
  return {
    isLoading: state.dashboard.isLoading,
    deviceList,
  };
};
const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  getDeviceListDispatch: getDeviceList,
  newDeviceDispatch: newDevice,
};
export default connect(mapStateToProps, mapDispatchToProps)(Devices);
