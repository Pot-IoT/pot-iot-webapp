import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  overviewContainer: {
    padding: "2% 5%",
  },
  overviewTextContainer: {
    display: "flex",
    margin: "0 auto",
  },
  numberofDevice: {
    marginBottom: "20px",
  },
  numberContainer: {
    marginTop: "20px",
  },
  divider: {
    margin: "0 5%",
    height: "80px",
  },
}));
export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.overviewContainer}>
      <Typography align="left" className={classes.title} variant="h4">
        Overview
      </Typography>
      <div className={classes.overviewTextContainer}>
        <div className={classes.numberContainer}>
          <Typography
            align="left"
            className={classes.numberofDevice}
            variant="h5"
          >
            3
          </Typography>
          <div>Connected Devices</div>
        </div>
        <Divider className={classes.divider} orientation="vertical" />
        <div className={classes.numberContainer}>
          <Typography
            align="left"
            className={classes.numberofDevice}
            variant="h5"
          >
            5
          </Typography>
          <div>Active Devices</div>
        </div>
        <Divider className={classes.divider} orientation="vertical" />
        <div className={classes.numberContainer}>
          <Typography
            align="left"
            className={classes.numberofDevice}
            variant="h5"
          >
            8
          </Typography>
          <div>Total # of Devices</div>
        </div>
      </div>
    </div>
  );
};
