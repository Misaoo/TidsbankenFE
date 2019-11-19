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
    axios(process.env.REACT_APP_API_URL + "/user/all", {
      method: "GET",
      withCredentials: true
    }).then(res => {
      console.log(res.data);
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
      <React.Fragment>
        <h1>All Users</h1>
        <div className="userPage">{this.state.users}</div>
      </React.Fragment>
    );
  }
}
export default Users;
