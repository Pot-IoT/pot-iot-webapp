import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Dialog, Button } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

export default () => {
  const newDeviceDetail = useSelector(
    (state) => state.dashboard.newDeviceDetail
  );
  return (
    <Dialog
      className="addDeviceSuccessModal"
      open={Object.keys(newDeviceDetail).length > 0}
    >
      <CheckCircle className="addDeviceSuccessModal__title" />
      <div className="addDeviceSuccessModal__desc">
        Device is successfully added. Please save your{" "}
        <strong>Device ID</strong> and <strong>Private Key</strong> properly.
        You will need them to connect through the <strong>Post Address</strong>{" "}
        listed below.
      </div>
      <TextField
        className="addDeviceSuccessModal__textfield"
        variant="outlined"
        margin="normal"
        required
        label="Device ID"
        InputProps={{
          readOnly: true,
        }}
        value={newDeviceDetail.imei}
      />
      <TextField
        className="addDeviceSuccessModal__textfield"
        variant="outlined"
        margin="normal"
        label="Private Key"
        multiline
        rows={4}
        InputProps={{
          readOnly: true,
        }}
        value={newDeviceDetail.private_key}
      />
      <TextField
        className="addDeviceSuccessModal__textfield"
        variant="outlined"
        margin="normal"
        label="Post Address"
        InputProps={{
          readOnly: true,
        }}
      />
      <div className="addDeviceSuccessModal__buttons">
        <Button
          variant="contained"
          color="primary"
          className="addDeviceSuccessModal__buttons__cta"
        >
          Save to local
        </Button>
      </div>
    </Dialog>
  );
};
