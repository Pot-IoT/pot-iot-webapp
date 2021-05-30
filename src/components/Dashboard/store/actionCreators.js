import * as actionTypes from "./constants";
import {
  getDeviceListRequest,
  addNewDeviceRequest,
  getCommandLogRequest,
} from "../../../api/dashboard";

export const toggleIsLoading = (data) => ({
  type: actionTypes.TOGGLE_IS_LOADING,
  data,
});
export const changeDeviceList = (data) => ({
  type: actionTypes.CHANGE_DEVICELIST,
  data,
});
export const changeCommandLog = (data) => ({
  type: actionTypes.CHANGE_COMMAND_LOG,
  data,
});
export const toggleAddDeviceSuccessModal = (data) => ({
  type: actionTypes.TOGGLE_ADD_DEVICE_SUCCESS_MODAL,
  data,
});
export const addNewDeviceDetail = (data) => ({
  type: actionTypes.ADD_NEW_DEVICE_DETAIL,
  data,
});
export const getDeviceList = (userToken) => {
  return (dispatch) => {
    getDeviceListRequest(userToken)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          dispatch(changeDeviceList(data.data));
        } else {
          switch (data.result.message) {
            case "TOKEN_AURHENTICATION_ERROR":
              alert(
                "Login session expired, please refresh page to login again."
              );
              break;
            default:
              console.log(data);
          }
        }
      });
  };
};
export const newDevice = (deviceDetails, userToken) => {
  return (dispatch) => {
    addNewDeviceRequest(deviceDetails, userToken)
      .then((response) => response.json())
      .then((data) => {
        dispatch(toggleIsLoading(false));
        if (data.success === true) {
          dispatch(addNewDeviceDetail(data.data));
          // dispatch(toggleAddDeviceSuccessModal(true));
          // dispatch(getDeviceList(userToken));
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
            case "DEVICE_ALREADY_REGISTERED_ERROR":
              alert("Device is already added");
              break;
            case "DEVICE_CAPACITY_EXCEED_ERROR":
              alert("You can only add up to 10 devices!");
            default:
              console.log(data.result.message);
          }
        }
      });
  };
};
export const getCommandLog = (userToken, imei, logTimeArr) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    Promise.all(getCommandLogRequest(userToken, imei, logTimeArr))
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        dispatch(toggleIsLoading(false));
        // if (data.success === true) {
        dispatch(changeCommandLog(data));
        // }
        // else {
        //   switch (data.result.message) {
        //     case "TOKEN_AURHENTICATION_ERROR":
        //       alert(
        //         "Login session expired, please refresh page to login again."
        //       );
        //       break;
        //     case "DEVICE_INVALID_ERROR":
        //       alert("Device doesn't exist");
        //       break;
        //     case "COMMAND_LOG_NOT_FOUND_ERROR":
        //       alert("Command Log doesn't exist");
        //       break;
        //     default:
        //       console.log(data.result.message);
        //   }
        // }
      });
  };
};
