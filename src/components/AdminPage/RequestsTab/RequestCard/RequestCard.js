import React, { Component } from "react";
import axios from "axios";
import RequestModifier from "./RequestModifier/RequestModifier";
import "../../general.css";

class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      name: '',
      lastName: "",
      statusText: "",
      dates: []
    };
    let keyVal = 0;
    this.props.request.dates.map(date => {
      this.state.dates.push(
        <li key={keyVal++}>{new Date(date).toLocaleDateString("se")}</li>
      );
    });
  }
  componentDidMount() {
    axios(
      process.env.REACT_APP_API_URL + "/user/" + this.props.request.userId,
      {
        method: "GET",
        withCredentials: true
      }
    )
      .then(res => {
        this.setState({
          name: res.data.name,
          lastName: res.data.lastName
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
  }
  setPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className="cardBody">
        {this.state.showPopup && (
          <RequestModifier
            requesterName={this.state.name}
            requesterLastName={this.state.lastName}
            requestData={this.props.request}
            setDisplay={this.setPopup.bind(this)}
            updateList={this.props.updateData}
          />
        )}
        <div
          className="cardContent"
          onClick={() => {
            this.setPopup();
          }}
        >
          <b>Request ID:</b> {this.props.request.requestId}
          <br />
          <b>Dates:</b> <ul>{this.state.dates}</ul>
          <br />
          <b>Requester:</b> {this.state.name} {this.state.lastName}
        </div>
      </div>
    );
  }
}

export default RequestCard;
