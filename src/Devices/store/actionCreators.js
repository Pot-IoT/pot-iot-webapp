// import * as actionTypes from "./constants";
import { removeDeviceRequest } from "../../api/devices";
import { toggleIsLoading } from "../../Dashboard/store/actionCreators";

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
