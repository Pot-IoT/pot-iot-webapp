import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
// import ChangeUsername from "./ChangeUsername";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import ResetPassword from "./ResetPassword.js";

function App() {
  let match = useRouteMatch();
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path={`${match.url}/change-username`}>
            <ChangeUsername />
          </Route> */}
          <Route path={`${match.url}/forget-password`}>
            <ForgetPassword />
          </Route>
          <Route path={`${match.url}/reset-password`}>
            <ResetPassword />
          </Route>
          <Route path={`${match.url}/change-password`}>
            <ChangePassword needOldPwd={true} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;