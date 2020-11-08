import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Container,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { useHistory } from "react-router-dom";
import Copyright from "../../common/Copyright";
import Loading from "../../common/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modalButton: {
    width: "20%",
    margin: "0 auto 20px",
  },
  modal: {
    width: "500px",
    height: "300px",
    margin: "300px auto",
    padding: "40px",
    border: "2px solid #000",
    boxShadow: "2px",
    backgroundColor: "#fff",
  },
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");

  const [oldPwdErr, setOldPwdErr] = useState(false);
  const [newPwdErr, setNewPwdErr] = useState(false);
  const [confirmNewPwdErr, setConfirmNewPwdErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();

  const handleOldPwdChange = (e) => {
    setOldPwd(e.target.value);
    setOldPwdErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{5,20}$/.test(e.target.value));
  };
  const handleNewPwdChange = (e) => {
    setNewPwd(e.target.value);
    setNewPwdErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{5,20}$/.test(e.target.value));
  };
  const handleConfirmNewPwdChange = (e) => {
    setConfirmNewPwd(e.target.value);
    setConfirmNewPwdErr(e.target.value !== newPwd);
  };
  const { needOldPwd } = props;

  function handleChangePassword() {
    setIsLoading(true);
    let requestObj = { password: newPwd };
    if (needOldPwd) requestObj.oldPassword = oldPwd;
    let token = window.location.search;
    fetch(`//115.29.191.198:8080/resetPassword${token}`, {
      method: "POST",
      body: JSON.stringify(requestObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success === true) {
          setModalOpen(true);
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                'Link expired, click "forget password" again on login page'
              );
              break;
            case "EMAIL_INVALID_ERROR":
              // might need change soon
              alert("Email invalid");
              break;
            default:
              console.log(("data", data));
          }
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          {needOldPwd && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              onChange={handleOldPwdChange}
              error={oldPwdErr}
              FormHelperTextProps={{
                className: oldPwdErr ? classes.errMsg : classes.hideErrMsg,
              }}
              helperText="Password has to be a combination of letters and numbers with length between 6 and 20"
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            onChange={handleNewPwdChange}
            error={newPwdErr}
            FormHelperTextProps={{
              className: newPwdErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Password has to be a combination of letters and numbers with length between 6 and 20"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            onChange={handleConfirmNewPwdChange}
            error={confirmNewPwdErr}
            FormHelperTextProps={{
              className: confirmNewPwdErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="New passwords don't match"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleChangePassword}
            disabled={
              oldPwdErr ||
              newPwdErr ||
              confirmNewPwdErr ||
              (needOldPwd && oldPwd === "") ||
              newPwd === "" ||
              confirmNewPwd === ""
            }
          >
            {needOldPwd ? "Change Password" : "Reset Password"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} height={250}>
        <DialogTitle>Password successfully modified!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click the button below to go to login page.
          </DialogContentText>
        </DialogContent>
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          // onClick={() => history.push("/login")}
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </Button>
      </Dialog>
      {isLoading && <Loading />}
    </Container>
  );
}
