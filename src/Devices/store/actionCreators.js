import * as actionTypes from "./constants";
import {
  removeDeviceRequest,
  modifyDeviceName,
  modifyDeviceDescription,
  newDeviceCommand,
  getFileDownloadLinkRequest,
} from "../../api/devices";
import { toggleIsLoading } from "../../Dashboard/store/actionCreators";

export const updateFileDownloadLinks = (data) => ({
  type: actionTypes.UPDATE_FILE_DOWNLOAD_LINKS,
  data,
});

export const removeDevice = (imei, pin_code, userToken) => {
  return (dispatch) => {
    removeDeviceRequest(imei, pin_code, userToken)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          alert("Device is successfully deleted!");
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

export const addNewDevice = (args) => {
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

export const getFileDownloadLink = (imei) => {
  return (dispatch) => {
    getFileDownloadLinkRequest(imei)
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateFileDownloadLinks(data));
      });
  };
};
