import React from "react";
import { Router, Switch } from "react-router-dom";
import AuthRoute from "./components/authRoute";
import EventCalender from "./components/eventcalender";
import Modal from "./components/modal";
import Login from "./screens/login";
import EventList from "./screens/eventList";

import SignUp from "./screens/signUp";
import history from "./history";

const App = () => {
  return (
    <div className="ui">
      <Router history={history}>
        <div>
          <Switch>
            <AuthRoute path="/" exact component={SignUp} type="guest" />
            <AuthRoute path="/login" exact component={Login} type="guest" />
            <AuthRoute path="/modal" exact component={Modal} type="private" />
            <AuthRoute
              path="/events"
              exact
              component={EventList}
              type="private"
            />
            <AuthRoute path="/calender" exact component={EventCalender} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
