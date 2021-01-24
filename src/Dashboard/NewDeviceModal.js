import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Dialog, DialogTitle, Button } from "@material-ui/core";

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
  textField: {
    width: "400px",
    margin: "15px auto",
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
  const { newDeviceModalOpen, addNewDevice, setNewDeviceModalOpen } = props;
  const [IMEI, setIMEI] = useState("");
  const [pincode, setPincode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");

  const [IMEIErr, setIMEIErr] = useState(false);
  const [pincodeErr, setPincodeErr] = useState(false);
  const [deviceNameErr, setDeviceNameErr] = useState(false);
  const [descCharRemain, setDescCharRemain] = useState(100);

  const handleIMEIChange = (e) => {
    setIMEI(e.target.value);
    setIMEIErr(!/^[0-9][0-9]{14}$/.test(e.target.value));
  };
  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setPincodeErr(!/^[A-Z0-9][A-Z0-9]{7}$/.test(e.target.value));
  };
  const handleDevicenameChange = (e) => {
    setDeviceName(e.target.value);
    setDeviceNameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,29}$/.test(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescCharRemain(100 - e.target.value.length);
  };

  const handleSubmitNewDevice = () => {
    addNewDevice({
      product_id: "PoT-IoT Tracker",
      imei: IMEI,
      pin_code: pincode,
      name: deviceName,
      description: description,
    });
  };

  return (
    <Dialog
      open={newDeviceModalOpen}
      fullWidth
      onClose={() => setNewDeviceModalOpen(false)}
      maxWidth="sm"
    >
      <DialogTitle className={classes.modalTitle}>Add a new device</DialogTitle>
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        label="Product"
        autoFocus
        value="Pot-IoT Tracker"
        disabled
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        label="IMEI"
        placeholder="Please enter the 15 digits number on your device"
        onChange={handleIMEIChange}
        error={IMEIErr}
        FormHelperTextProps={{
          className: IMEIErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Please enter a valid IMEI, which is the 15 digit number on your device"
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        label="Pin"
        placeholder="Please enter the 8 digits number on your device"
        onChange={handlePincodeChange}
        error={pincodeErr}
        FormHelperTextProps={{
          className: pincodeErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Pin Code is a 8 digits combination of numbers and letters"
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        label="Device Name"
        placeholder="Give your device a name（2 to 30 characters)"
        onChange={handleDevicenameChange}
        error={deviceNameErr}
        FormHelperTextProps={{
          className: deviceNameErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Device name has to be a combination of letters and numbers with length between 3 and 30"
      />
      <TextField
        className={classes.textField}
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
        placeholder="Provide more information about your device...(no more than 100 characters)"
        onChange={handleDescriptionChange}
      />
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={handleSubmitNewDevice}
          disabled={
            IMEI === "" ||
            pincode === "" ||
            deviceName === "" ||
            IMEIErr ||
            pincodeErr ||
            deviceNameErr
          }
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={() => setNewDeviceModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};
