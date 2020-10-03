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
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
}));

export default function ForgetPassword() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  async function handleResendEmail() {}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CheckCircleOutlineIcon />
        </Avatar>
        <Typography variant="h5">Account successfully activated!</Typography>
        {/* <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleResendEmail}
        >
          Resend Email
        </Button> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {/* <Dialog open={modalOpen} onClose={() => setModalOpen(false)} height={250}>
        <DialogTitle>Check your email inbox!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An email with a link to set new password has been sent to the email
            address you entered.
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
    </Container>
  );
}
