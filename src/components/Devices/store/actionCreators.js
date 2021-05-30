import * as actionTypes from "./constants";
import {
  removeDeviceRequest,
  modifyDeviceName,
  modifyDeviceDescription,
  newDeviceCommand,
  getFileDownloadLinkRequest,
  deleteFileRequest,
} from "../../../api/devices";
import { toggleIsLoading } from "../../Dashboard/store/actionCreators";

export const updateFileDownloadLinks = (data) => ({
  type: actionTypes.UPDATE_FILE_DOWNLOAD_LINKS,
  data,
});

export const removeDevice = (args) => {
  return (dispatch) => {
    removeDeviceRequest(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          alert("Device is successfully deleted!");
          window.location.href = "/devices";
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            case "DEVICE_INVALID_ERROR":
              alert("Device doesn't exist");
              break;
            case "DEVICE_PIN_CODE_ERROR":
              alert("Pin Code Error");
              break;
            default:
              console.log(data.result.message);
          }
        }
      });
  };
};

export const changeDeviceName = (args) => {
  return (dispatch) => {
    modifyDeviceName(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          alert("Device name successfully changed!");
          window.location.reload();
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            case "DEVICE_INVALID_ERROR":
              alert("Device doesn't exist");
              break;
            default:
              console.log(data.result.message);
          }
        }
      });
  };
};

export const changeDeviceDescription = (args) => {
  return (dispatch) => {
    modifyDeviceDescription(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          alert("Device description successfully changed!");
          window.location.reload();
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            case "DEVICE_INVALID_ERROR":
              alert("Device doesn't exist");
              break;
            default:
              console.log(data.result.message);
          }
        }
      });
  };
};

export const addNewDeviceCommand = (args) => {
  return (dispatch) => {
    newDeviceCommand(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          alert("New Command Successfully Added!");
          window.location.reload();
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            case "DEVICE_INVALID_ERROR":
              alert("Device doesn't exist");
              break;
            default:
              console.log(data.result.message);
          }
        }
      });
  };
};

export const getFileDownloadLink = (args) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    getFileDownloadLinkRequest(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.error) {
          alert(data.message);
        } else {
          dispatch(updateFileDownloadLinks(data));
        }
      });
  };
};

export const deleteFile = (args) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    deleteFileRequest(args)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.error) {
          console.log(data);
        } else {
          alert("File is deleted successfully!");
          window.location.reload();
        }
      });
  };
};
