import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import UserServices from "./UserServices";
import Home from "./pages/HomePage/Home";
import Documentation from "./pages/Documentation/Documentation";
import Pricing from "./pages/Pricing/Pricing";
import "./App.scss";
import store from "./store/index";

function App() {
  return (
    <Provider store={store} className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/documentation" exact component={Documentation} />
          <Route path="/pricing" exact component={Pricing} />
          <Route path="/devices">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/user-services">
            <UserServices />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
