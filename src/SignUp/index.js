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
  modalButton: {
    width: "20%",
    margin: "0 auto 20px",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  async function handleSignUp() {
    let response = await fetch("//115.29.191.198:8080/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: pwd,
      }),
      mode: "no-cors",
    });
    console.log(response);
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
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
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
