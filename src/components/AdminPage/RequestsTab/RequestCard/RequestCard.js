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
      dates: [],
      loading : false,
    };
    let keyVal = 0;
    this.props.request.dates.map(date => {
      return this.state.dates.push(
        <li key={keyVal++}>{new Date(date).toLocaleDateString("se")}</li>
      );
    });
  }
  componentDidMount() {
    this.state.loading = true
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
        this.state.loading= false

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
        {/* { && <p>loading</p>} */}
        {this.state.showPopup && this.state.loading == false && (
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
          <br />
          <b>Start date:</b> <ul>{this.state.dates[0]}</ul>
          <b>End date:</b> <ul>{this.state.dates[this.state.dates.length - 1]}</ul>
          <br />
          <b>Employee:</b> {this.state.name} {this.state.lastName}
        </div>
      </div>
    );
  }
}

export default RequestCard;
