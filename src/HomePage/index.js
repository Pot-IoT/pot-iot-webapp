import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TextField, Dialog, DialogTitle, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getDeviceList,
  toggleIsLoading,
} from "../Dashboard/store/actionCreators";
import Navbar from "../common/Navbar";
import DeviceManagerPage from "../Devices/DeviceManagerPage";
import Devices from "../Devices";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  modalInput: {
    width: "80%",
    margin: "0 auto 20px",
  },
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
const HomePage = (props) => {
  const { getDeviceListDispatch } = props;
  const classes = useStyles();
  const { isLoading } = useSelector((state) => state.dashboard);

  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameErr, setNewUsernameErr] = useState(false);

  const username = localStorage.getItem("username");
  const userToken = window.localStorage.getItem("user_token");

  useEffect(() => {
    getDeviceListDispatch(userToken);
  }, []);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setNewUsernameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,29}$/.test(e.target.value));
  };
  const handleSubmitUsername = () => {
    if (newUsername === username) {
      alert("Please enter a different username.");
      return;
    }
    fetch("//115.29.191.198:8080/changeUsername?token=" + userToken, {
      method: "POST",
      body: JSON.stringify({
        username: newUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsernameModalOpen(false);
        if (data.success === true) {
          localStorage.setItem("username", newUsername);
          alert("Username successfully changed!");
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            default:
              console.log("data", data);
          }
        }
      });
  };
  return (
    <>
      <Navbar
        setChangeUsernameModalOpen={setUsernameModalOpen}
        username={username}
      />
      <Router>
        <Switch>
          <Route path="/devices" exact>
            <Devices />
          </Route>
          <Route path="/devices/device-manager">
            <DeviceManagerPage />
          </Route>
        </Switch>
      </Router>
      <Dialog
        open={usernameModalOpen}
        onClose={() => setUsernameModalOpen(false)}
        height={250}
        width={700}
      >
        <DialogTitle>Please type your new username here:</DialogTitle>
        <TextField
          variant="outlined"
          margin="normal"
          label="Username"
          name="username"
          className={classes.modalInput}
          autoFocus
          onChange={handleUsernameChange}
          error={newUsernameErr}
          FormHelperTextProps={{
            className: newUsernameErr ? classes.errMsg : classes.hideErrMsg,
          }}
          helperText="Username has to be a combination of letters and numbers with length between 3 and 30, and it has to be different from your current username."
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={handleSubmitUsername}
          disabled={newUsername === "" || newUsernameErr}
        >
          OK
        </Button>
      </Dialog>
      {isLoading && <Loading />}
    </>
  );
};
const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  getDeviceListDispatch: getDeviceList,
};
export default connect(null, mapDispatchToProps)(HomePage);
