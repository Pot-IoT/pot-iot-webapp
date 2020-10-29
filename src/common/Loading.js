import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    padding: "300px",
    backgroundColor: "#fff",
    opacity: 0.8,
    zIndex: 1,
  },
  circle: {
    width: "80px",
    height: "80px",
    border: "5px solid #0052cc",
    borderRadius: "50%",
    borderBottomColor: "#f3f3f3",
    margin: "0 auto 50px",
    animation: "$spin 0.8s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.circle}></div>
      <Typography variant="h3" color="textSecondary" align="center">
        Loading...
      </Typography>
    </div>
  );
}
