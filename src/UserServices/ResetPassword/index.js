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
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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
  modal: {
    width: "500px",
    height: "300px",
    margin: "300px auto",
    padding: "40px",
    border: "2px solid #000",
    boxShadow: "2px",
    backgroundColor: "#fff",
  },
}));

export default function ResetPassword(props) {
  const classes = useStyles();
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  // api is placeholder
  async function handleResetPassword() {
    let response = await fetch("//115.29.191.198:8080/login", {
      method: "POST",
      body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd }),
    });
    console.log(response);
    setModalOpen(true);
    setTimeout(() => history.push("/signin"), 3000);
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="Old Password"
            type="password"
            onChange={(e) => setOldPwd(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            onChange={(e) => setConfirmNewPwd(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleResetPassword}
          >
            Change Password
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} height={250}>
        <DialogTitle>Password successfully reset!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click the button below to go to login page.
          </DialogContentText>
        </DialogContent>
        <Button
          variant="contained"
          color="primary"
          className={classes.modalButton}
          onClick={() => history.push("/signin")}
        >
          Login
        </Button>
      </Dialog>
    </Container>
  );
}
