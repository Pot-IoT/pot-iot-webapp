import React, { useState } from "react";
import { TextField, Dialog, Button } from "@material-ui/core";
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
  const { open, onClose, device, handleDeleteDevice } = props;

  const [pincode, setPincode] = useState("");
  const [confirmPinCode, setConfirmPinCode] = useState("");
  const [pincodeErr, setPincodeErr] = useState(false);
  const [confirmPincodeErr, setConfirmPincodeErr] = useState(false);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setPincodeErr(!/^[A-Z0-9][A-Z0-9]{7}$/.test(e.target.value));
  };
  const handleConfirmPincodeChange = (e) => {
    setConfirmPinCode(e.target.value);
    setConfirmPincodeErr(e.target.value === pincode);
  };

  return (
    <Dialog
      className="device-manager"
      open={open}
      fullWidth
      onClose={() => onClose(false)}
      maxWidth="sm"
    >
      <div className="device-manager__title">Delete your device</div>
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
          label="Pin"
          placeholder="Please enter the 8 digits number on your device"
          onChange={handlePincodeChange}
          value={pincode}
          error={pincodeErr}
          FormHelperTextProps={{
            className: pincodeErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Pin Code is a 8 digits combination of numbers and letters"
        />
      </div>
      <div className="device-manager__textfield">
        <TextField
          className="device-manager__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="Confirm Pin"
          placeholder="Please confirm you PIN"
          value={confirmPinCode}
          onChange={handleConfirmPincodeChange}
          error={confirmPincodeErr}
          FormHelperTextProps={{
            className: confirmPincodeErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Pin Codes don't match"
        />
      </div>
      <div className="device-manager__buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteDevice}
          disabled={
            pincode === "" ||
            pincodeErr ||
            confirmPinCode === "" ||
            confirmPincodeErr
          }
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};
