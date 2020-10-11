import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
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
import { useHistory } from "react-router-dom";
import Copyright from "../common/copyright";

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
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [usernameErr, setUsernameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [confrimPwdErr, setConfirmPwdErr] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{2,30}$/.test(e.target.value));
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErr(
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    );
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
    setPwdErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{5,20}$/.test(e.target.value));
  };
  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
    setConfirmPwdErr(e.target.value !== pwd);
  };
  function handleSignUp() {
    fetch("//115.29.191.198:8080/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: pwd,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setModalOpen(true);
        } else {
          switch (data.result.message) {
            case "EMAIL_DUPLICATE_ERROR":
              alert("This email address is already registered!");
              break;
            case "REGISTRATION_EMAIL_ERROR":
              alert(
                "Failed to send activation email. Please enter a valid email address."
              );
              break;
            default:
              console.log("data", data);
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
          Sign Up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            onChange={handleUsernameChange}
            error={usernameErr}
            FormHelperTextProps={{
              className: usernameErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Username has to be a combination of letters and numbers with length between 3 and 30"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            onChange={handleEmailChange}
            error={emailErr}
            FormHelperTextProps={{
              className: emailErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Please enter a valid email address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handlePwdChange}
            error={pwdErr}
            FormHelperTextProps={{
              className: pwdErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Password has to be a combination of letters and numbers with length between 6 and 20"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            onChange={handleConfirmPwdChange}
            error={confrimPwdErr}
            FormHelperTextProps={{
              className: confrimPwdErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Passwords don't match"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
            disabled={
              usernameErr ||
              emailErr ||
              pwdErr ||
              confrimPwdErr ||
              username === "" ||
              email === "" ||
              pwd === "" ||
              confirmPwd === ""
            }
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} height={250}>
        <DialogTitle>Congratulations for joining Pot-IoT!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An email with an acitivation link has been sent to your email
            address above, please activate and login.
          </DialogContentText>
        </DialogContent>
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={() => history.push("/login")}
        >
          OK
        </Button>
      </Dialog>
    </Container>
  );
}
