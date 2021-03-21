import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    margin: "50px auto",
    width: "fit-content",
  },
  emptylistPic: {
    display: "block",
    margin: "100px auto",
  },
  newDeviceBtn: {
    marginRight: "100px",
  },
}));

export default function EmptyDeviceList(props) {
  const { handleAddNewDevice } = props;
  const classes = useStyles();
  return (
    <div>
      <picture>
        <source
          media="(min-width:768px)"
          srcSet="//via.placeholder.com/600x400"
        />
        <img
          className={classes.emptylistPic}
          src="//via.placeholder.com/300x400"
          alt=""
        />
      </picture>
      <Typography align="center" variant="h2">
        You don't have any device yet.
      </Typography>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewDevice}
          className={classes.newDeviceBtn}
        >
          New Device
        </Button>
        <Button variant="outlined" color="primary">
          How Dashboard works?
        </Button>
      </div>
    </div>
  );
}
