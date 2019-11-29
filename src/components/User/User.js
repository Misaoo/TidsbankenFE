import React, { Component } from "react";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      profilePic: "",
      requests: []
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
          lastName: res.data.lastName,
          profilePic: res.data.profilePic
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
    let tempRequests = [];
    axios(
      process.env.REACT_APP_API_URL +
        "/request/approved/" +
        this.props.computedMatch.params.user_id,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      res.data.map(request => {
        let tempDates = [];
        var dateIndex = 0;
        request.dates.map(date => {
          tempDates.push(
            <li key={dateIndex++}>{new Date(date).toLocaleDateString("se")}</li>
          );
        });
        tempRequests.push(
          <li className="requestCardUser" key={request.requestId}>
            <Link to={`/requests/${request.requestId}`}>
              <ul>{tempDates}</ul>
            </Link>
          </li>
        );
      });
      if (tempRequests.length === 0) {
        tempRequests = "This user does not have any approved vacations";
      }
      this.setState({
        requests: tempRequests
      });
    });
  }

  render() {
    return (
      <div>
        <div className="userPageContainer">
          <div className="userWrapper">
            <div className="userPictureContainer">
              <img className="userPicture" src={this.state.profilePic} alt="" />
            </div>
            <h1>
              {this.state.name} {this.state.lastName}
            </h1>
          </div>
          <div className="vacationWrapper">
            <h2>Vacations</h2>
            <ul>{this.state.requests}</ul>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
