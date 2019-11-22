import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import GeneralTab from "./GeneralTab/GeneralTab";
import RequestTab from "./RequestsTab/RequestTab";
import UsersTab from "./UsersTab/UsersTab";
import "./general.css";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      style: {
        general: {},
        requests: {},
        users: {}
      }
    };
  }
  updateStyling(style) {
    this.setState({
      style: style
    });
  }

  render() {
    return (
      <div className="adminPage">
        <Router>
          <h1>Admin Page</h1>
          <Navbar style={this.state.style} />
          <Switch>
            <Route
              path="/admin/general"
              render={props => {
                return (
                  <GeneralTab
                    {...props}
                    updateStyling={this.updateStyling.bind(this)}
                  />
                );
              }}
            ></Route>
            <Route
              path="/admin/requests"
              render={props => {
                return (
                  <RequestTab
                    {...props}
                    updateStyling={this.updateStyling.bind(this)}
                  />
                );
              }}
            ></Route>
            <Route
              path="/admin/users"
              render={props => {
                return (
                  <UsersTab
                    {...props}
                    updateStyling={this.updateStyling.bind(this)}
                  />
                );
              }}
            ></Route>
            <Redirect exact from="/admin" to="/admin/general" />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default AdminPage;
