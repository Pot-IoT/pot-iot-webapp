import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./devices.scss";

const useStyles = makeStyles((theme) => ({
  modalButton: {
    width: "25%",
    margin: "0 auto 20px",
    display: "inline-block",
  },
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
  modalTitle: {
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
  },
}));

export default (props) => {
  const classes = useStyles();
  const { open, onClose, device, removeDeviceDispatch } = props;
  const userToken = window.localStorage.getItem("user_token");
  const [deviceName, setDeviceName] = useState(device.name || "");
  const [description, setDescription] = useState(device.description || "");
  const [deviceNameErr, setDeviceNameErr] = useState(false);
  const [descCharRemain, setDescCharRemain] = useState(
    100 - device.description.length
  );
  const handleDevicenameChange = (e) => {
    setDeviceName(e.target.value);
    setDeviceNameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{1,29}$/.test(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescCharRemain(100 - e.target.value.length);
  };
  const handleDeleteDevice = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this device from your list?"
      )
    ) {
      removeDeviceDispatch(device.imei, device.pin_code, userToken);
    }
  };

  return (
    <Dialog
      className="device-manager"
      open={open}
      fullWidth
      onClose={() => onClose(false)}
      maxWidth="sm"
    >
      <div className="device-manager__title">Edit your device</div>
      <div className="device-manager__textfield">
        <TextField
          className="device-manager__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="IMEI"
          value={device.imei}
          disabled
        />
      </div>
      <div className="device-manager__textfield">
        <TextField
          className="device-manager__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="Device Name"
          value={deviceName}
          onChange={handleDevicenameChange}
          error={deviceNameErr}
          FormHelperTextProps={{
            className: deviceNameErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Please enter 2 to 30 characters"
        />
      </div>
      <div className="device-manager__textfield">
        <TextField
          className="device-manager__textfield__box"
          variant="outlined"
          margin="normal"
          label={
            description.length === 0
              ? "Description"
              : `Desciption (${descCharRemain} characters left)`
          }
          multiline
          rows={4}
          inputProps={{ maxLength: 100 }}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="device-manager__textfield">
        <div className="device-manager__textfield__label">Status</div>
        <div className="device-manager__textfield__value">
          {device.device_status}
        </div>
      </div>
      <div className="device-manager__textfield">
        <div className="device-manager__textfield__label">
          Transmission Interval
        </div>
        <div className="device-manager__textfield__value">
          {device.communication_interval}
        </div>
      </div>
      {/* <div className="device-manager__textfield">
        <div className="device-manager__textfield__label">
          Custom Instruction
        </div>
        <div className="device-manager__textfield__value"></div>
      </div> */}
      <div className="device-manager__buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          OK
        </Button>
      </div>
      <div className="device-manager__buttons">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteDevice}
        >
          Delete Device
        </Button>
        <Button variant="contained" color="secondary">
          Shut Down Device
        </Button>
      </div>
    </Dialog>
  );
};
