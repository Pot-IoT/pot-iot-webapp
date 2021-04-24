import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Edit as EditIcon,
  EditOutlined as EditIconOutlined,
} from "@material-ui/icons";
import { toggleIsLoading } from "../Dashboard/store/actionCreators";
import {
  removeDevice,
  changeDeviceName,
  changeDeviceDescription,
  addNewDevice,
} from "./store/actionCreators";
import { showDeviceStatus, showBatteryRemaining } from "../common/helpers";
import "./devices.scss";
import { useDemoData } from "@material-ui/x-grid-data-generator";

const useStyles = makeStyles((theme) => ({
  modalButton: {
    width: "25%",
    margin: "0 auto 20px",
    display: "inline-block",
  },
  hideErrMsg: {
    display: "none",
  },
  errMsg: {
    display: "block",
  },
  modalTitle: {
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
  },
}));

const DeviceManagerPage = (props) => {
  const classes = useStyles();
  const {
    handleOpenDeleteDeviceModal,
    changeDeviceNameDispatch,
    changeDeviceDescriptionDispatch,
    addNewDeviceDispatch,
  } = props;
  const deviceList = useSelector((state) => state.dashboard.deviceList);
  const curID = window.location.search.split("=")[1];
  const device = deviceList.filter((item) => item.imei === curID)[0] || {
    imei: "",
    name: "",
    description: "",
  };
  const userToken = window.localStorage.getItem("user_token");

  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDeviceNameErr, setNewDeviceNameErr] = useState(false);
  const [descCharRemain, setDescCharRemain] = useState(
    100 - device.description.length
  );
  const [editingProperty, setEditingProperty] = useState(null);
  const [hovering, setHovering] = useState({});
  const [editorOpen, setEditorOpen] = useState(false);

  const handleDevicenameChange = (e) => {
    setNewDeviceName(e.target.value);
    setNewDeviceNameErr(!/^[a-zA-Z0-9][a-zA-Z0-9]{1,29}$/.test(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    setDescCharRemain(100 - e.target.value.length);
  };
  const handleSubmitChange = () => {
    switch (editingProperty) {
      case "name":
        changeDeviceNameDispatch({
          imei: device.imei,
          name: newDeviceName,
          userToken,
        });
        break;
      case "description":
        changeDeviceDescriptionDispatch({
          imei: device.imei,
          description: newDescription,
          userToken,
        });
        break;
    }
  };
  const handleClickEdit = (property) => {
    switch (property) {
      case "name":
        setNewDeviceName(device.name);
        break;
      case "description":
        setNewDescription(device.description);
        break;
    }
    setEditingProperty(property);
    setEditorOpen(true);
  };
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  console.log("edp", editingProperty, "nn", newDeviceName);
  const [page, setPage] = React.useState(0);
  const DeviceInfoEditor = () => (
    <Dialog
      open={editorOpen}
      onClose={() => setEditorOpen(false)}
      className="device-manager-page__dialog"
    >
      {editingProperty === "name" && (
        <>
          <DialogTitle className="device-manager-page__dialog__title">
            Change Device Name
          </DialogTitle>
          <TextField
            className="device-manager-page__dialog__textfield"
            variant="outlined"
            margin="normal"
            required
            label="Device Name"
            value={newDeviceName}
            onChange={handleDevicenameChange}
            error={newDeviceNameErr}
            FormHelperTextProps={{
              className: newDeviceNameErr ? classes.errMsg : classes.hideErrMsg,
            }}
            helperText="Please enter 2 to 30 characters"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.modalButton}
            onClick={handleSubmitChange}
            disabled={newDeviceName === "" || newDeviceNameErr}
          >
            OK
          </Button>
        </>
      )}
      {editingProperty === "description" && (
        <>
          <DialogTitle className="device-manager-page__dialog__title">
            Change Device Description
          </DialogTitle>
          <TextField
            className="device-manager-page__dialog__textfield"
            variant="outlined"
            margin="normal"
            label={
              newDescription
                ? "Description"
                : `Desciption (${descCharRemain} characters left)`
            }
            value={newDescription}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
            inputProps={{ maxLength: 100 }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.modalButton}
            onClick={handleSubmitChange}
            disabled={newDescription === ""}
          >
            OK
          </Button>
        </>
      )}
    </Dialog>
  );

  return (
    <div className="device-manager-page">
      <div className="device-manager-page__path">
        <a href="/devices">Device List</a>&nbsp;/&nbsp;{device.name}
      </div>
      <div className="device-manager-page__section-title">Device Info</div>
      <div className="device-manager-page__flex-row">
        <div className="device-manager-page__flex-row__textfield">
          <TextField
            className="device-manager-page__flex-row__textfield__box"
            variant="outlined"
            margin="normal"
            required
            label="Device Name"
            value={device.name}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <a
                    className="device-manager-page__flex-row__textfield__box__edit"
                    onClick={() => handleClickEdit("name")}
                    // onMouseEnter={() => handleHoverEditIcon("name")}
                  >
                    {hovering.name ? <EditIcon /> : <EditIconOutlined />}
                  </a>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="device-manager-page__flex-row__textfield">
          <TextField
            className="device-manager-page__flex-row__textfield__box"
            variant="outlined"
            margin="normal"
            required
            label="IMEI"
            value={device.imei}
            disabled
          />
        </div>
      </div>
      <div className="device-manager-page__flex-row">
        <div className="device-manager-page__flex-row__textfield">
          <div className="device-manager-page__flex-row__textfield__label">
            Device Status
          </div>
          <div className="device-manager-page__flex-row__textfield__value">
            {showDeviceStatus(device.device_status)}
          </div>
        </div>
        <div className="device-manager-page__flex-row__textfield">
          <div className="device-manager-page__flex-row__textfield__label">
            Power Status
          </div>
          <div className="device-manager-page__flex-row__textfield__value">
            {showBatteryRemaining(device.battery)}
          </div>
        </div>
      </div>
      <div className="device-manager-page__flex-row">
        <div className="device-manager-page__flex-row__textfield">
          <TextField
            className="device-manager-page__flex-row__textfield__box"
            variant="outlined"
            margin="normal"
            label={
              newDescription
                ? "Description"
                : `Desciption (${descCharRemain} characters left)`
            }
            multiline
            rows={4}
            inputProps={{ maxLength: 100 }}
            value={device.description}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <a
                    className="device-manager-page__flex-row__textfield__box__edit"
                    onClick={() => handleClickEdit("description")}
                  >
                    {hovering.name ? <EditIcon /> : <EditIconOutlined />}
                  </a>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="device-manager-page__section-title">Device Data</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          page={page}
          onPageChange={(params) => {
            setPage(params.page);
          }}
          pageSize={5}
          pagination
          {...data}
        />
      </div>
      {DeviceInfoEditor()}
    </div>
  );
};

const mapDispatchToProps = {
  toggleIsLoadingDispatch: toggleIsLoading,
  removeDeviceDispatch: removeDevice,
  changeDeviceNameDispatch: changeDeviceName,
  changeDeviceDescriptionDispatch: changeDeviceDescription,
  addNewDeviceDispatch: addNewDevice,
};
export default connect(null, mapDispatchToProps)(DeviceManagerPage);
