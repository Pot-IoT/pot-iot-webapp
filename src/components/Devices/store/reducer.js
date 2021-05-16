import * as actionTypes from "./constants";

const defaultState = {
  fileDownloadList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FILE_DOWNLOAD_LINKS:
      return Object.assign(state, { fileDownloadList: action.data });
    default:
      return state;
  }
};
