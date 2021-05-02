import * as actionTypes from "./constants";

const defaultState = {
  fileDownloadLink: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FILE_DOWNLOAD_LINKS:
      return Object.assign(state, { fileDownloadLink: action.data });
    default:
      return state;
  }
};
