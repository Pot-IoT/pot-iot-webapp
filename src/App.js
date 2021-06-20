import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/MainPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserServices from "./components/UserServices";
import ScrollToTop from "./components/HomePageRepo/ScrollToTop";
import Home from "./components/HomePageRepo/HomePage/Home";
import Documentation from "./components/HomePageRepo/Documentation/Documentation";
// import Pricing from "./components/HomePageRepo/Pricing/Pricing";
import "./App.scss";
import store from "./store/index";

function App() {
  return (
    <Provider store={store} className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/documentation" exact component={Documentation} />
          {/* <Route path="/pricing" exact component={Pricing} /> */}
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
