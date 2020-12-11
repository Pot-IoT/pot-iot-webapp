const actionTypes = {
  GET_DEVICELIST: "GET_DEVICELIST",
};

const defaultState = {
  deviceList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEVICELIST:
      return state.set("deviceList", action.data);
  }
};
