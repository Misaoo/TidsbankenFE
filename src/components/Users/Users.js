import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard/UserCard";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
    this.getUsers();
  }
  getUsers() {
    let tempArr = [];
    axios(process.env.REACT_APP_API_URL + "/authorize", {
      method: "POST",
      withCredentials: true
    })
      .then(userdata => {
        axios(process.env.REACT_APP_API_URL + "/user/all", {
          method: "GET",
          withCredentials: true
        })
          .then(res => {
            res.data.map(user => {
              if (user.userId != userdata.data.userId) {
                tempArr.push(
                  <UserCard
                    key={user.userId}
                    user={user}
                    updateUsers={this.getUsers.bind(this)}
                  />
                );
              }
            });
            this.setState({
              users: tempArr
            });
          })
          .catch(error => {
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              window.location.href = "/logout";
            }
          });
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.href = "/logout";
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="userPageH1">All Users</h1>
        <div className="userPage">{this.state.users}</div>
      </React.Fragment>
    );
  }
}
export default Users;
