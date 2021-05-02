import { combineReducers } from "redux";
import { reducer as loginReducer } from "../components/Login/store/index";
import { reducer as dashboardReducer } from "../components/Dashboard/store/index";
import { reducer as deviceReducer } from "../components/Devices/store/index";

export default combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  device: deviceReducer,
});
