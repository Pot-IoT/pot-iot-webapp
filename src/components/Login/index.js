import React, { useState } from "react";
import { connect } from "react-redux";
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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import Copyright from "../common/Copyright";
import Loading from "../common/Loading";

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

function Login(props) {
  // const { setUsernameDispatch } = props;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErr(
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    );
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };
  function handleLogin() {
    setIsLoading(true);
    fetch("//115.29.191.198:8080/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: pwd }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.success === true) {
          localStorage.setItem("user_token", data.data.token);
          // setUsernameDispatch(data.data.username);
          localStorage.setItem("username", data.data.username);
          history.push("/devices");
        } else {
          switch (data.result.message) {
            case "EMAIL_INVALID_ERROR":
              alert("Email is not registered.");
              break;
            case "ACCOUNT_INACTIVE_ERROR":
              if (
                window.confirm(
                  "Email is not activated yet, click OK to resend activate email"
                )
              ) {
                history.push("./user-services/reactivate-account");
              }
              break;
            case "WRONG_PASSWORD_ERROR":
              setPwdErr(true);
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
          Sign in
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePwdChange}
            error={pwdErr}
            FormHelperTextProps={{
              className: pwdErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Incorrect Password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
            disabled={emailErr || email === "" || pwd === ""}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/user-services/forget-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {isLoading && <Loading />}
    </Container>
  );
}
const mapDispatchToProps = {
  // setUsernameDispatch: setUsername,
};

export default connect(null, mapDispatchToProps)(Login);
