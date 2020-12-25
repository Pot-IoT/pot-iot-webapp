import { combineReducers } from "redux";
import { reducer as dashboardReducer } from "../Dashboard/store/index";

export default combineReducers({
  dashboard: dashboardReducer,
});
