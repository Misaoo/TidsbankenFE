import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import styles from "./RequestModifier.module.css";
import axios from "axios";
import CommentSection from "./CommentSection/CommentSection";

class RequestModifier extends Component {
  constructor(props) {
    super(props);
    var dateIndex = 0;
    this.state = {
      name: "",
      lastName: "",
      dates: this.props.requestData.dates.map(date => (
        <li key={dateIndex++}>{date}</li>
      )),
      pending: this.props.requestData.status === 0,
      verdict: 0,
      link: "",
      myRequest: true
    };
    this.handleChangeVerdict = this.handleChangeVerdict.bind(this);
    this.handleSubmitVerdict = this.handleSubmitVerdict.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    axios(process.env.REACT_APP_API_URL + "/authorize", {
      method: "POST",
      withCredentials: true
    }).then(res => {
      this.setState({
        myRequest: this.props.requestData.userId === res.data.userId
      });
    });
  }
  handleChangeVerdict(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmitVerdict(event) {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        this.props.requestData.requestId,
      {
        method: "PATCH",
        withCredentials: true,
        data: {
          status: this.state.verdict
        }
      }
    ).then(() => {
      let link = "";
      if (this.props.requestData.status === 0) {
        link = process.env.REACT_APP_API_URL + "/request/allPending";
      } else if (this.props.requestData.status === 1) {
        link = process.env.REACT_APP_API_URL + "/request/allDenied";
      } else {
        link = process.env.REACT_APP_API_URL + "/request/allApproved";
      }
      this.props.updateList(link);
    });

    event.preventDefault();
  }
  handleSubmitDelete(event) {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        this.props.requestData.requestId,
      {
        method: "DELETE",
        withCredentials: true
      }
    ).then(() => {
      let link = "";
      if (this.props.requestData.status === 0) {
        link = process.env.REACT_APP_API_URL + "/request/allPending";
      } else if (this.props.requestData.status === 1) {
        link = process.env.REACT_APP_API_URL + "/request/allDenied";
      } else {
        link = process.env.REACT_APP_API_URL + "/request/allApproved";
      }
      this.props.updateList(link);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div
        className={styles.module}
        onClick={() => {
          this.props.setDisplay();
        }}
      >
        <div
          className={styles.content}
          onClick={event => event.stopPropagation()}
        >
          <div>
            <h1>Request {this.props.requestData.requestId}</h1>
            <h5>
              {this.props.requesterName} {this.props.requesterLastName}
            </h5>
            <ul>{this.state.dates}</ul>
            {this.state.pending && !this.state.myRequest && (
              <div>
                <form onSubmit={this.handleSubmitVerdict}>
                  <input
                    type="radio"
                    name="verdict"
                    value="2"
                    onChange={this.handleChangeVerdict}
                  ></input>
                  <label>Approve</label>
                  <br></br>
                  <input
                    type="radio"
                    name="verdict"
                    value="1"
                    onChange={this.handleChangeVerdict}
                  ></input>
                  <label>Deny</label>
                  <br></br>
                  <Button variant="contained" type="submit" color="secondary">
                    Submit
                  </Button>
                </form>
              </div>
            )}
            <div>
              <h3>Delete Request</h3>
              <form onSubmit={this.handleSubmitDelete}>
                <Button variant="contained" type="submit" color="secondary">
                  Delete Request
                </Button>
              </form>
            </div>
          </div>
          <div>
            <CommentSection requestId={this.props.requestData.requestId} />
          </div>
        </div>
      </div>
    );
  }
}

export default RequestModifier;
