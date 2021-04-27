import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { newDevice, toggleIsLoading } from "../Dashboard/store/actionCreators";
import { removeDevice, addNewDevice } from "./store/actionCreators";
import EmptyDeviceList from "../common/EmptyDeviceList";
import NewDeviceModal from "../common/NewDeviceModal";
import DeleteDeviceModal from "./DeleteDeviceModal";
import "./devices.scss";
import { showDeviceStatus, showBatteryRemaining } from "../common/helpers";
import AddDeviceSuccessModal from "./AddDeviceSuccessModal";

const Devices = (props) => {
  const {
    toggleIsLoadingDispatch,
    newDeviceDispatch,
    removeDeviceDispatch,
  } = props;
  const userToken = window.localStorage.getItem("user_token");

  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);
  const [deleteDeviceModalOpen, setDeleteDeviceModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({});
  const history = useHistory();
  const { deviceList } = useSelector((state) => state.dashboard);

  const handleAddNewDevice = () => {
    setNewDeviceModalOpen(true);
  };
  const addNewDevice = (deviceDetails) => {
    toggleIsLoadingDispatch(true);
    newDeviceDispatch(deviceDetails, userToken);
  };
  const handleClickDevice = (deviceDetails) => {
    setSelectedDevice(deviceDetails);
    history.push("/devices/device-manager?id=" + deviceDetails.imei);
  };
  const handleDeleteDevice = () => {
    removeDeviceDispatch(
      selectedDevice.imei,
      selectedDevice.pin_code,
      userToken
    );
  };
  const handleOpenDeleteDeviceModal = () => {
    setDeleteDeviceModalOpen(true);
  };

  return localStorage.getItem("user_token") ? (
    <div>
      {deviceList.length === 0 ? (
        <EmptyDeviceList handleAddNewDevice={handleAddNewDevice} />
      ) : (
        <div className="device-board">
          <div className="device-board__header">
            <div className="device-board__header__title">Device List</div>
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
                <td>Power</td>
                <td>Device Name</td>
                <td>Transmission Interval</td>
              </tr>
              {deviceList.map((device, idx) => (
                <tr
                  key={idx}
                  className="device-board__table__row"
                  onClick={() => handleClickDevice(device)}
                >
                  <td>{showDeviceStatus(device.device_status)}</td>
                  <td>{showBatteryRemaining(device.battery)}</td>
                  <td>{device.name}</td>
                  <td>
                    {device.communication_mode > 0 &&
                    device.communication_interval > 0
                      ? `Mode ${device.communication_mode} - Every ${device.communication_interval}mins`
                      : "--"}
                  </td>
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
      {deleteDeviceModalOpen && (
        <DeleteDeviceModal
          open={deleteDeviceModalOpen}
          onClose={setDeleteDeviceModalOpen}
          device={selectedDevice}
          handleDeleteDevice={handleDeleteDevice}
        />
      )}
      <AddDeviceSuccessModal />
    </div>
  ) : (
    <Redirect to="/login" />
  );
};
const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  newDeviceDispatch: newDevice,
  removeDeviceDispatch: removeDevice,
  addNewDeviceDispatch: addNewDevice,
};
export default connect(null, mapDispatchToProps)(Devices);
