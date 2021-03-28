import * as actionTypes from "./constants";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_IS_LOADING:
      let { isLoading, ...restState1 } = state;
      return {
        isLoading: action.data,
        ...restState1,
      };
    default:
      return state;
  }
};
