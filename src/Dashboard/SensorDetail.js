import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sensorDetailContainer: {
    width: "720px",
    height: "720px",
  },
  title: {
    padding: "2% 5%",
  },
}));
export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.sensorDetailContainer}>
      <Typography align="left" className={classes.title} variant="h4">
        Sensor Details
      </Typography>
      <Typography align="left" className={classes.title} variant="h5">
        Acceleration
      </Typography>
      <Typography variant="h6">Lorem ipsum dolor sit amet</Typography>
      <Typography align="left" className={classes.title} variant="h5">
        Heat
      </Typography>
      <Typography variant="h6">Lorem ipsum dolor sit amet</Typography>
    </div>
  );
};
