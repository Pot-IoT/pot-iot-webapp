import * as actionTypes from "./constants";
import { getDeviceListRequest, addNewDeviceRequest } from "../../api/dashboard";

export const toggleIsLoading = (data) => ({
  type: actionTypes.TOGGLE_IS_LOADING,
  data,
});
export const changeDeviceList = (data) => ({
  type: actionTypes.CHANGE_DEVICELIST,
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
          alert("Device is successfully added!");
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
          }
        }
      });
  };
};
