import * as actionTypes from "./constants";

const defaultState = {
  fileDownloadLink: "",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // case actionTypes.TOGGLE_IS_LOADING:
    //   let { isLoading, ...restState1 } = state;
    //   return {
    //     isLoading: action.data,
    //     ...restState1,
    //   };
    case actionTypes.UPDATE_FILE_DOWNLOAD_LINKS:
      return Object.assign(state, { fileDownloadLink: action.data });
    default:
      return state;
  }
};
