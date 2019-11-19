import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import GeneralTab from "./GeneralTab/GeneralTab";
import RequestTab from "./RequestsTab/RequestTab";
import UsersTab from "./UsersTab/UsersTab";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <h1>Admin Page</h1>
          <Navbar />
          <Switch>
            <Route
              path="/admin/general"
              render={props => <GeneralTab {...props} />}
            ></Route>
            <Route
              path="/admin/requests"
              render={props => <RequestTab {...props} />}
            ></Route>
            <Route
              path="/admin/users"
              render={props => <UsersTab {...props} />}
            ></Route>
            <Redirect exact from="/admin" to="/admin/general" />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default AdminPage;
