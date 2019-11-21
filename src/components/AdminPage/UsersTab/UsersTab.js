import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UserNav from "./UserNav/UserNav";
import UserCard from "./UserCard/UserCard";
import AddUser from "./AddUser/AddUser";
import "../general.css";

class UsersTab extends Component {
  //let address = props.address;
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.props.updateStyling({
      general: {},
      requests: {},
      users: { backgroundColor: "red" }
    });
    this.getUsers();
  }
  getUsers() {
    let tempArr = [];
    axios(process.env.REACT_APP_API_URL + "/user/all", {
      method: "GET",
      withCredentials: true
    }).then(res => {
      res.data.map(user => {
        tempArr.push(
          <UserCard
            key={user.userId}
            user={user}
            updateUsers={this.getUsers.bind(this)}
          />
        );
      });
      this.setState({
        users: tempArr
      });
    });
  }
  render() {
    return (
      <div className="userTab">
        <Router>
          <UserNav updateUsers={this.getUsers.bind(this)} />
          <Switch>
            <Route
              path="/admin/users/allUsers"
              render={() => (
                <div className="userContent">{this.state.users}</div>
              )}
            ></Route>
            <Route
              path="/admin/users/addUser"
              render={() => <AddUser />}
            ></Route>
            <Redirect exact from="/admin/users" to="/admin/users/allUsers" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default UsersTab;
