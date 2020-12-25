import * as actionTypes from "./constants";

const defaultState = {
  isLoading: true,
  deviceList: [],
};

export default (state = defaultState, action) => {
  console.log("www", action);
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      return {
        isLoading: action.data,
        deviceList: state.deviceList,
      };
    case actionTypes.CHANGE_DEVICELIST:
      return {
        isLoading: state.isLoading,
        deviceList: action.data,
      };
    default:
      return {};
  }
};
