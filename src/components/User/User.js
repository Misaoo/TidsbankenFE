import React, { Component } from "react";
import axios from "axios";

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
        this.props.match.params.user_id,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      this.setState({
        name: res.data.name,
        lastName: res.data.lastName,
        profilePic: res.data.profilePic
      });
    });
    let tempRequests = [];
    axios(
      process.env.REACT_APP_API_URL +
        "/request/approved/" +
        this.props.match.params.user_id,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      console.log(res.data);
      res.data.map(request => {
        tempRequests.push(
          <div key={request.requestId}>{request.dates.toString()}</div>
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
      <React.Fragment>
        <img src={this.state.profilePic} alt="" />
        <h1>
          {this.state.name} {this.state.lastName}
        </h1>
        <h3>Vacations</h3>
        {this.state.requests}
      </React.Fragment>
    );
  }
}
export default User;
