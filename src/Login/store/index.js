const actionTypes = {
  GET_USERINFO: "GET_USERINFO",
};

const defaultState = {
  userInfo: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERINFO:
      return state.set("userInfo", action.data);
  }
};
