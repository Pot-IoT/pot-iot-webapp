import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  getDeviceList,
  newDevice,
  toggleIsLoading,
} from "../Dashboard/store/actionCreators";
import { removeDevice } from "./store/actionCreators";
import EmptyDeviceList from "../common/EmptyDeviceList";
import NewDeviceModal from "../common/NewDeviceModal";
import Loading from "../common/Loading";
import DeviceManangerModal from "./DeviceManagerModal";
import "./devices.scss";

const Devices = (props) => {
  const {
    isLoading,
    deviceList,
    getDeviceListDispatch,
    toggleIsLoadingDispatch,
    newDeviceDispatch,
    removeDeviceDispatch,
  } = props;
  const userToken = window.localStorage.getItem("user_token");

  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);
  const [deviceManagerModalOpen, setDeviceManagerModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});

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
  const handleClickDevice = (deviceDetails) => {
    setSelectedDevice(deviceDetails);
    setDeviceManagerModalOpen(true);
  };
  return localStorage.getItem("user_token") ? (
    <div>
      {deviceList.length === 0 ? (
        <EmptyDeviceList handleAddNewDevice={handleAddNewDevice} />
      ) : (
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
                <tr
                  className="device-board__table__row"
                  onClick={() => handleClickDevice(device)}
                >
                  <td>{device.device_status}</td>
                  <td>{device.signal_strength}</td>
                  <td>{device.battery}</td>
                  <td>{device.name}</td>
                  <td>{device.communication_interval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <NewDeviceModal
        newDeviceModalOpen={newDeviceModalOpen}
        setNewDeviceModalOpen={setNewDeviceModalOpen}
        addNewDevice={addNewDevice}
      />
      {deviceManagerModalOpen && (
        <DeviceManangerModal
          open={deviceManagerModalOpen}
          onClose={setDeviceManagerModalOpen}
          device={selectedDevice}
          removeDeviceDispatch={removeDeviceDispatch}
        />
      )}
      {isLoading && <Loading />}
    </div>
  ) : (
    <Redirect to="/login" />
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
  removeDeviceDispatch: removeDevice,
};
export default connect(mapStateToProps, mapDispatchToProps)(Devices);
