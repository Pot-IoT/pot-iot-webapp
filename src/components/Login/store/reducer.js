import * as actionTypes from "./constants";

const defaultState = {
  username: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {
        username: action.data,
      };
    default:
      return state;
  }
};
