import React, { Component } from "react";
import axios from "axios";
import RequestModifier from "./RequestModifier/RequestModifier";

class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      name: this.props.request.requestId,
      lastName: "",
      statusText: ""
    };
  }
  componentDidMount() {
    axios(
      process.env.REACT_APP_API_URL + "/user/" + this.props.request.userId,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      this.setState({
        name: res.data.name,
        lastName: res.data.lastName
      });
    });
  }
  setPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <React.Fragment>
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
          onClick={() => {
            this.setPopup();
          }}
          style={{ borderStyle: "solid" }}
        >
          Request ID: {this.props.request.requestId}
          <br />
          Dates: {this.props.request.dates.toString()}
          <br />
          Status: {this.props.request.status}
          <br />
          Requester: {this.state.name} {this.state.lastName}
        </div>
      </React.Fragment>
    );
  }
}

export default RequestCard;
