import { combineReducers } from "redux";
import { reducer as loginReducer } from "../Login/store/index";
import { reducer as dashboardReducer } from "../Dashboard/store/index";

export default combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
});
