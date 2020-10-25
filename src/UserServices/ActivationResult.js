import React, { useState, useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Copyright from "../common/Copyright";
import Loading from "../common/Loading";
import { useHistory } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(true);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("//115.29.191.198:8080/activateAccount" + window.location.search, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if (data.success === true) {
          setActivationSuccess(true);
          setTimeout(() => history.push("/login"), 3000);
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              if (window.confirm("Link expired, click OK to resend email")) {
                history.push("/user-services/reactivate-account");
              }
              break;
            case "EMAIL_INVALID_ERROR":
              alert("Please retry with a valid email address");
              break;
            default:
              console.log("data", data);
          }
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {activationSuccess ? (
              <CheckCircleOutlineIcon />
            ) : (
              <HighlightOffIcon />
            )}
          </Avatar>
          <Typography variant="h5">
            {activationSuccess
              ? "Account successfully activated! Redirecting to login page..."
              : "Activation failed"}
          </Typography>
        </div>
      )}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
