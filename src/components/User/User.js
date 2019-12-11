import React, { Component } from "react";
import axios from "axios";
import "./User.css";
import UserCard from "../Users/UserCard";

import { Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      profilePic: "",
      groupId : '',
      vacation: '',
      users: []
    };
  }
  componentDidMount() {
    axios(
      process.env.REACT_APP_API_URL +
        "/user/" +
        this.props.computedMatch.params.user_id,
      {
        method: "GET",
        withCredentials: true
      }
    )
      .then(res => {
        console.log('Resuld is : ' + res.data.groupId)
        this.setState({
          name: res.data.name,
          groupId : res.data.groupId,
          lastName: res.data.lastName,
          profilePic: res.data.profilePic
        });
      })
      .then(() => {
        let tempArr = [];
        axios(process.env.REACT_APP_API_URL + "/authorize", {
          method: "POST",
          withCredentials: true
        })
          .then(userdata => {
            console.log('state: ', this.state)
            console.log('groupid: ', this.state.groupId)
            axios(process.env.REACT_APP_API_URL + "/user/group/" + this.state.groupId, {
              method: "GET",
              withCredentials: true
            })
              .then(res => {
                res.data.map(user => {
                  if (user.userId !== userdata.data.userId) {
      
                    axios(process.env.REACT_APP_API_URL + "/request/onvacation/" + user.userId, {
                      method: "GET",
                      withCredentials: true
                    })
                    .then(vacRes => {
                      tempArr.push(
                        <UserCard
                          key={user.userId}
                          user={user}
                          vacation={vacRes.data.vacation}
                          updateUsers={this.getUsers.bind(this)}
                        />
                      );
                      this.setState({
                        users: tempArr
                      });
                    })
                    /*tempArr.push(
                      <UserCard
                        key={user.userId}
                        user={user}
                        updateUsers={this.getUsers.bind(this)}
                      />
                    );*/
                  }
                });
              })
              .catch(error => {
                if (error.status === 401 || error.status === 403) {
                  window.location.href = "/logout";
                }
              });
          })
          .catch(error => {
            if (error.status === 401 || error.status === 403) {
              window.location.href = "/logout";
            }
          });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
       console.log(this.state.groupId)
    /*let tempArr = [];
    axios(process.env.REACT_APP_API_URL + "/authorize", {
      method: "POST",
      withCredentials: true
    })
      .then(userdata => {
        console.log('state: ', this.state)
        console.log('groupid: ', this.state.groupId)
        axios(process.env.REACT_APP_API_URL + "/user/group/d23c2bd6-d042-443a-9b78-e976c0c39918",{//+parent.state.groupId, {
          method: "GET",
          withCredentials: true
        })
          .then(res => {
            res.data.map(user => {
              if (user.userId !== userdata.data.userId) {
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
            if (error.status === 401 || error.status === 403) {
              window.location.href = "/logout";
            }
          });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });*/
    this.getUsers()
  }

  getUsers() {
   
  }

  render() {
    return (
      <React.Fragment>
      <h1 className="userPageH1">Group Employees</h1>
      <p className="userPageH1">   Group Manager  : {this.state.name} {this.state.lastName}</p>
      <div className="userPage">{this.state.users}</div>
    </React.Fragment>
    );
  }
}
export default User;
