import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Dialog, DialogTitle, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  //   modal: {
  //     width: "50%",
  //     height: "50%",
  //   },
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

export default (props) => {
  const classes = useStyles();
  const { newDeviceModalOpen, addNewDevice, setNewDeviceModalOpen } = props;
  //   const [product, setProduct] = useState("");
  const [IMEI, setIMEI] = useState("");
  const [pincode, setPincode] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");

  const [IMEIErr, setIMEIErr] = useState(false);
  const [pincodeErr, setPincodeErr] = useState(false);
  const [deviceNameErr, setDeviceNameErr] = useState(false);

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
    setDeviceNameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,30}$/.test(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
      //   className={classes.modal}
      open={newDeviceModalOpen}
      onClose={() => setNewDeviceModalOpen(false)}
      height={500}
      width={1000}
    >
      <DialogTitle>Add a new device</DialogTitle>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Product"
        autoFocus
        value="Pot-IoT Tracker"
        disabled
        // onChange={handleProductChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="IMEI"
        // name="email"
        onChange={handleIMEIChange}
        error={IMEIErr}
        FormHelperTextProps={{
          className: IMEIErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Please enter a valid IMEI, which is the 15 digit number on your device"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Pin Code"
        onChange={handlePincodeChange}
        error={pincodeErr}
        FormHelperTextProps={{
          className: pincodeErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Pin Code is a 8 digit combination of numbers and letters"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Device Name"
        onChange={handleDevicenameChange}
        error={deviceNameErr}
        FormHelperTextProps={{
          className: deviceNameErr ? classes.errMsg : classes.hideErrMsg,
        }}
        helperText="Device name has to be a combination of letters and numbers with length between 3 and 30"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Description"
        onChange={handleDescriptionChange}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.modalButton}
        onClick={handleSubmitNewDevice}
        disabled={IMEI === "" || pincode === "" || deviceName === ""}
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
    </Dialog>
  );
};
