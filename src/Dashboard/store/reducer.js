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
    default:
      return state;
  }
};
