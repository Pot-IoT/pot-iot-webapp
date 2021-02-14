import * as actionTypes from "./constants";

const defaultState = {
  isLoading: true,
  deviceList: [],
  commandLog: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      return {
        isLoading: action.data,
        deviceList: state.deviceList,
      };
    case actionTypes.CHANGE_DEVICELIST:
      return {
        deviceList: action.data,
      };
    case actionTypes.CHANGE_COMMAND_LOG:
      return {
        commandLog: action.data,
      };
    default:
      return state;
  }
};
