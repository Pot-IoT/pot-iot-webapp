import React from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import "./Pricing.css";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const useStyle = makeStyles((theme) => ({
  grid: {
    width: "80%",
    margin: "0px",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: "1px solid grey",
    borderRadius: "20px",
  },
}));

function Pricing() {
  const classes = useStyle();
  return (
    <div className="home">
        <Navbar />
        <div className="pricing-page-root">
        <div className="pricing-top-section" id="pricing-top-section">
            <h3 class="heading color-black">Pricing</h3>
            <div class="text-top color-black">
            Pot-Iot Platform is using for <h2> FREE </h2> but with limited conditions. 
            We won't consider to charge now since we are in the very early stage and keep polishing the product in order to improve the user expericen. 
            The Basic plan is shown as below, and if you want more capacity or even a customized feature, please contact us to know more details:
            support@pot-iot.com.
            </div>
            <br />
            <Link to="/signup">
            <Button buttonSize="btn--wide" buttonColor="blue">
                {" "}
                Try for free{" "}
            </Button>
            </Link>
        </div>
        <div className="pricing-body">
            <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} md={6}>
                <Paper
                className={classes.paper}
                style={{
                    textAlign: "left",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
                >
                <h1 class="color-black" style={{ fontSize: "24px" }}>
                    Basic
                </h1>
                <h1
                    style={{
                    color: "black",
                    width: "100%",
                    fontSize: "48px",
                    padding: "1rem",
                    }}
                >
                    $0/month
                </h1>
                <div
                    class="color-black"
                    style={{
                    alignContent: "flex-start",
                    width: "100%",
                    fontSize: "16px",
                    }}
                >
                    <h3> - 10 connected devices</h3>
                    <h3> - 1 GB data storaging per device</h3>
                    <h3> - Accessable for all features</h3>
                    <h3> - Ten thousand times API call </h3>
                </div>
                <br />
                {/* <h4>
                    {" "}
                    Your pay will be treated as donation for supporting us to
                    maintain current service, as well as keep producing better
                    solutions!{" "}
                </h4> */}
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper
                className={classes.paper}
                style={{
                    textAlign: "center",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
                >
                <h2> More Capacity?</h2>
                <h2>Customized Features?</h2>
                <br />
                <h3>Contact us via email: support@pot-iot.com</h3>
                </Paper>
            </Grid>
            </Grid>
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default Pricing;
