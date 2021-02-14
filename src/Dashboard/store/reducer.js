import * as actionTypes from "./constants";

const defaultState = {
  isLoading: true,
  deviceList: [],
  commandLog: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      let { isLoading, ...restState1 } = state;
      return {
        isLoading: action.data,
        ...restState1,
      };
    case actionTypes.CHANGE_DEVICELIST:
      let { deviceList, ...restState2 } = state;
      return {
        deviceList: action.data,
        ...restState2,
      };
    case actionTypes.CHANGE_COMMAND_LOG:
      let { commandLog, ...restState3 } = state;
      return {
        commandLog: action.data,
        ...restState3,
      };
    default:
      return state;
  }
};
