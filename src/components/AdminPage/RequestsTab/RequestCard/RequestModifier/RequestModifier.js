import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import styles from "./RequestModifier.module.css";
import axios from "axios";
import CommentSection from "./CommentSection/CommentSection";
import styles2 from '../../../../../css/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RequestModifier extends Component {
  constructor(props) {
    super(props);
    var dateIndex = 0;
    this.state = {
      name: "",
      lastName: "",
      dates: this.props.requestData.dates.map(date => (
        <li key={dateIndex++}>{new Date(date).toLocaleDateString("se")}</li>
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
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
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
        },
        headers: {
          Authorization: localStorage.getItem('jwt')
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
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }
    )
      .then(() => {
        let link = "";
        if (this.props.requestData.status === 0) {
          link = process.env.REACT_APP_API_URL + "/request/allPending";
        } else if (this.props.requestData.status === 1) {
          link = process.env.REACT_APP_API_URL + "/request/allDenied";
        } else {
          link = process.env.REACT_APP_API_URL + "/request/allApproved";
        }
        this.props.updateList(link);
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
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
          <div className={styles2.header}>
            <h2>Request {this.props.requestData.requestId}</h2>
            <span className={styles2.closeButton} onClick={event => this.props.setDisplay()}><FontAwesomeIcon icon="times" /></span>
          </div>
          <div className={styles.twoColumns}>
            <div>
              <div className={styles.datesOverview}>
                <h2>
                  {this.props.requesterName} {this.props.requesterLastName}
                </h2>
                <ul>{this.state.dates}</ul>
              </div>

              {this.state.pending && !this.state.myRequest && (
                <div className={styles.verdictForms}>
                  <form onSubmit={this.handleSubmitVerdict} className={styles.verdictForm}>
                    <div className={styles.radios}>
                      <input
                        type="radio"
                        name="verdict"
                        value="2"
                        onChange={this.handleChangeVerdict}
                        placeholder="Approve"
                      ></input>
                      <label className={styles.paddingRight}>Approve</label>
                      <input
                        type="radio"
                        name="verdict"
                        value="1"
                        onChange={this.handleChangeVerdict}
                        placeholder="Deny"
                      ></input>
                      <label>Deny</label>
                    </div>
                    <br></br>
                    <div className={styles.twoColumnsButton}>
                      <Button variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                      <div></div>
                      <Button variant="contained" type="submit" color="secondary" onClick={this.handleSubmitDelete}>
                        Delete
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div>
              <CommentSection requestId={this.props.requestData.requestId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestModifier;
