import React, { Component } from "react";
import axios from "axios";
import "./User.css";
import UserCard from "../Users/UserCard";
import Infobox from '../../components/common/infobox/Infobox';
import bookingpicture from '../../pic/undraw_booking_33fn.svg';

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
            axios(process.env.REACT_APP_API_URL + "/user/group/" + this.state.groupId, {
              method: "GET",
              withCredentials: true
            })
              .then(res => {
                res.data.map(user => {
                  if (user.userId !== userdata.data.userId) {
      
                    return axios(process.env.REACT_APP_API_URL + "/request/onvacation/" + user.userId, {
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
                  } else {
                    return "wrong"
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
    this.getUsers()
  }

  getUsers() {
   
  }

  render() {
    return (
      <React.Fragment>
            <Infobox className="infoBox" infoboxId="calendarHelpInfo" image={<img src={bookingpicture} alt="Booking" height="100px"/>}>
            <h2>Employees page</h2>
            <p>Here you can see your all employees in one group</p>
            <h3>Employees status</h3>
            <p>The ones that are in red are in vacation and not available at the moment</p>
          </Infobox>
      <h1 className="userPageH1">Group Employees</h1>
      <p className="userPageH1">   Group Manager  : {this.state.name} {this.state.lastName}</p>
      <div className="userPage">{this.state.users}</div>
    </React.Fragment>
    );
  }
}
export default User;
