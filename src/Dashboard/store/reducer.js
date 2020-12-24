import * as actionTypes from "./constants";

const defaultState = {
  isLoading: false,
  deviceList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      return state.set("isLoading", action.data);
    case actionTypes.CHANGE_DEVICELIST:
      return state.set("deviceList", action.data);
    case actionTypes.GET_DEVICELIST:
      return state.set("deviceList", action.data);
    default:
      return {};
  }
};
