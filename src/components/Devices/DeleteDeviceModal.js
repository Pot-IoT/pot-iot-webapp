import React, { useState } from "react";
import { TextField, Dialog, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./devices.scss";

// const useStyles = makeStyles((theme) => ({
//   modalButton: {
//     width: "25%",
//     margin: "0 auto 20px",
//     display: "inline-block",
//   },
//   hideErrMsg: {
//     display: "none",
//   },
//   errMsg: {
//     display: "block",
//   },
//   modalTitle: {
//     textAlign: "center",
//   },
//   buttonGroup: {
//     display: "flex",
//   },
// }));

export default (props) => {
  // const classes = useStyles();
  const { open, onClose, device, handleDeleteDevice } = props;

  const [privateKey, setPrivateKey] = useState("");
  // const [confirmPrivateKey, setConfirmPrivateKey] = useState("");
  // const [privateKeyErr, setPrivateKeyErr] = useState(false);
  // const [confirmPrivateKeyErr, setConfirmPrivateKeyErr] = useState(false);

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
    // setPrivateKeyErr(!/^[A-Z0-9][A-Z0-9]{7}$/.test(e.target.value));
  };
  // const handleConfirmPrivateKeyChange = (e) => {
  //   setConfirmPrivateKey(e.target.value);
  //   setConfirmPrivateKeyErr(e.target.value === privateKey);
  // };

  return (
    <Dialog
      className="delete-device"
      open={open}
      fullWidth
      onClose={() => onClose(false)}
      maxWidth="sm"
    >
      <div className="delete-device__title">Delete your device</div>
      <div className="delete-device__textfield">
        <TextField
          className="delete-device__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="Device ID"
          value={device.imei}
          disabled
        />
      </div>
      {/* <div className="delete-device__textfield">
        <TextField
          className="delete-device__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="Private Key"
          placeholder="Please enter your device's private key"
          onChange={handlePrivateKeyChange}
          value={privateKey}
          // error={privateKeyErr}
          // FormHelperTextProps={{
          //   className: privateKeyErr ? classes.errMsg : classes.hideErrMsg,
          // }}
          // helperText="Pin Code is a 8 digits combination of numbers and letters"
        />
      </div> */}
      {/* <div className="delete-device__textfield">
        <TextField
          className="delete-device__textfield__box"
          variant="outlined"
          margin="normal"
          required
          label="Confirm Pin"
          placeholder="Please confirm you PIN"
          value={confirmPrivateKey}
          onChange={handleConfirmPrivateKeyChange}
          error={confirmPrivateKeyErr}
          FormHelperTextProps={{
            className: confirmPrivateKeyErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Pin Codes don't match"
        />
      </div> */}
      <div className="delete-device__buttons">
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
          onClick={() => handleDeleteDevice(privateKey)}
          // disabled={
          //   privateKey === ""
          //    ||
          //   privateKeyErr
          //    ||
          //   confirmPrivateKey === "" ||
          //   confirmPrivateKeyErr
          // }
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};
