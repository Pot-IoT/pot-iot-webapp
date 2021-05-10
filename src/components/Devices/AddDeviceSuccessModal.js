import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Dialog, Button } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import XLSX from "xlsx";
import { fileUploadURL } from "../common/staticData";

export default () => {
  const { name, imei, private_key } = useSelector(
    (state) => state.dashboard.newDeviceDetail
  );
  const handleDownload = () => {
    const newSheet = XLSX.utils.aoa_to_sheet([
      ["Device Name", "Device ID", "Private Key", "Post Address"],
      [name, imei, private_key, fileUploadURL],
    ]);
    const newBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newBook, newSheet, "credentials");
    XLSX.writeFile(newBook, name + "-credientials.xlsx").then(
      window.location.reload()
    );
  };
  return (
    <Dialog className="addDeviceSuccessModal" open={name !== undefined}>
      <CheckCircle className="addDeviceSuccessModal__title" />
      <div className="addDeviceSuccessModal__desc">
        Device is successfully added. Please save your{" "}
        <strong>Device ID</strong> and <strong>Private Key</strong> properly.
        You will need them to connect through the <strong>Post Address</strong>{" "}
        listed below.
        <br />
        <strong className="addDeviceSuccessModal__desc__alert">
          ***You won't be able to access this private key anytime later, please
          save it now!***
        </strong>
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
        value={imei}
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
        value={private_key}
      />
      {/* <TextField
        className="addDeviceSuccessModal__textfield"
        variant="outlined"
        margin="normal"
        label="Post Address"
        InputProps={{
          readOnly: true,
        }}
        value={fileUploadURL}
      /> */}
      <div className="addDeviceSuccessModal__buttons">
        <Button
          variant="contained"
          color="primary"
          className="addDeviceSuccessModal__buttons__cta"
          onClick={handleDownload}
        >
          Save to local
        </Button>
      </div>
    </Dialog>
  );
};
