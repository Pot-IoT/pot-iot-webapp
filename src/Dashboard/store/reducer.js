import * as actionTypes from "./constants";

const defaultState = {
  isLoading: true,
  deviceList: [],
  commandLog: {},
  addDeviceSuccess: false,
  newDeviceDetail: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      return Object.assign(state, { isLoading: action.data });
    case actionTypes.CHANGE_DEVICELIST:
      let { deviceList, ...restState2 } = state;
      return {
        deviceList: action.data,
        ...restState2,
      };
    case actionTypes.CHANGE_COMMAND_LOG:
      let { commandLog, ...restState3 } = state;
      let newCommandLog = action.data.reduce((acc, cur) => {
        if (cur.success == true) {
          // first 10 char represents the time
          acc[cur.data.log.slice(0, 10)] = cur.data;
        }
        return acc;
      }, {});
      return {
        commandLog: newCommandLog,
        ...restState3,
      };
    case actionTypes.TOGGLE_ADD_DEVICE_SUCCESS_MODAL:
      return Object.assign(state, { addDeviceSuccess: action.data });
    case actionTypes.ADD_NEW_DEVICE_DETAIL:
      return Object.assign(state, { newDeviceDetail: action.data });
    default:
      return state;
  }
};
