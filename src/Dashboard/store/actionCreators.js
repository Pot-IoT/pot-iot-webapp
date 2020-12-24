import * as actionTypes from "./constants";
import { getDeviceListRequest } from "../../api/dashboard";

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
    console.log("hhhh", userToken);
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
          }
        }
      });
  };
};
