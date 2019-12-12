import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthRoute from "./components/auth/AuthRoute";
import AuthRouteAdmin from "./components/auth/AuthRouteAdmin";
import Auth from "./components/auth/Auth";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./App.css";
import Header from "./components/common/header/Header";
import ViewNotFound from "./views/common/ViewNotFound";
import Unauthorized from "./views/common/Unauthorized"
import ProfileView from "./views/profile/ProfileView";
import Login from "./views/login/Login";
import TwoFactorAuth from "./views/login/TwoFactorAuth";
import Dashboard from "./views/dashboard/Dashboard";
import Logout from "./components/logout/Logout";
import AdminPage from "./components/AdminPage/AdminPage";
import Users from "./components/Users/Users";
import Requests from "./views/requests/Requests";
import User from "./components/User/User";

import {
  faAngleDown,
  faAngleDoubleDown,
  faAngleUp,
  faCaretLeft,
  faCaretRight,
  faCalendarPlus,
  faTimes,
  faQuestionCircle,
  faExclamationCircle,
  faCheckCircle,
  faClock,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown, faAngleDoubleDown, faAngleUp, faCaretLeft, faCaretRight, faCalendarPlus, faTimes, faQuestionCircle, faExclamationCircle, faCheckCircle, faClock, faBars);

const App: React.FC = () => {
  return (
    <div className="App">
      <Auth>
        <Router>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/login" component={Login} />
            <Route path="/2fa" component={TwoFactorAuth} />
            <Route path="/unauthorized" component={Unauthorized} />
            <AuthRoute path="/profile" component={ProfileView} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/logout" component={Logout} />
            <AuthRoute path="/requests/:id" component={Requests} />
            <AuthRouteAdmin path="/admin" component={AdminPage} />
            <AuthRouteAdmin path="/users" component={Users} />
            <AuthRouteAdmin path="/user/:user_id" component={User} />
            <Route component={ViewNotFound} />
          </Switch>
        </Router>
      </Auth>
    </div>
  );
};

export default App;
