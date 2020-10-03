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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://pot-iot.com/">
        Pot-IoT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
}));

export default function ForgetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErr(
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    );
  };
  async function handleContinue() {
    let response = await fetch("//115.29.191.198:8080/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      mode: "no-cors",
    });
    console.log("response", response);
    setModalOpen(true);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={handleEmailChange}
            error={emailErr}
            FormHelperTextProps={{
              className: emailErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Please enter a valid email address"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleContinue}
            disabled={emailErr || email === ""}
          >
            Continue
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} height={250}>
        <DialogTitle>Check your email inbox!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An email with a link to set new password has been sent to the email
            address you entered.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
