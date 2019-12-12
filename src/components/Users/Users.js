import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Infobox from '../../components/common/infobox/Infobox';
import bookingpicture from '../../pic/undraw_booking_33fn.svg';

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
  }

  render() {
    return (
      <React.Fragment>
         <Infobox className="infoBox" infoboxId="calendarHelpInfo" image={<img src={bookingpicture} alt="Booking" height="100px"/>}>
            <h2>Employees page</h2>
            <p>Here you can see your all managers in your region</p>
            <h3>Employees status</h3>
            <p>The ones that are in red are in vacation and not available at the moment</p>
          </Infobox>
        <h1 className="userPageH1">Group Managers</h1>
        <div className="userPage">{this.state.users}</div>
      </React.Fragment>
    );
  }
}
export default Users;
