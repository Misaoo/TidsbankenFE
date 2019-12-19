import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styles from "./RequestModifier.module.css";
import axios from "axios";
import CommentSection from "./CommentSection/CommentSection";
import styles2 from '../../../../../css/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestModifier = (props: any) => {
  var dateIndex = 0;
  const [requestModifierState, setRequestModifierState] = useState({
    name: "",
    lastName: "",
    dates: props.requestData.dates.map((date: any) => (
    <li key={dateIndex++}>{new Date(date).toLocaleDateString("se")}</li>
    )),
    pending: props.requestData.status === 0,
    verdict: 0,
    link: "",
    myRequest: true
  });

  axios(process.env.REACT_APP_API_URL + "/authorize", {
    method: "POST",
    withCredentials: true
  }).then((res: any) => {
    setRequestModifierState({
      ...requestModifierState,
      myRequest: props.requestData.userId === res.data.userId
    });
  });

  const handleChangeVerdict = (event: any) => {
    setRequestModifierState({
      ...requestModifierState,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmitVerdict = (event: any) => {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        props.requestData.requestId,
      {
        method: "PATCH",
        withCredentials: true,
        data: {
          status: requestModifierState.verdict
        }
      }
    ).then(() => {
      let link = "";
      if (props.requestData.status === 0) {
        link = process.env.REACT_APP_API_URL + "/request/allPending";
      } else if (props.requestData.status === 1) {
        link = process.env.REACT_APP_API_URL + "/request/allDenied";
      } else {
        link = process.env.REACT_APP_API_URL + "/request/allApproved";
      }
      props.updateList(link);
    });

    event.preventDefault();
  }

  const handleSubmitDelete = (event: any) => {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        props.requestData.requestId,
      {
        method: "DELETE",
        withCredentials: true
      }
    )
      .then(() => {
        let link = "";
        if (props.requestData.status === 0) {
          link = process.env.REACT_APP_API_URL + "/request/allPending";
        } else if (props.requestData.status === 1) {
          link = process.env.REACT_APP_API_URL + "/request/allDenied";
        } else {
          link = process.env.REACT_APP_API_URL + "/request/allApproved";
        }
        props.updateList(link);
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
    event.preventDefault();
  }

  return (
    <div
      className={styles.module}
      onClick={() => {
        props.setDisplay();
      }}
    >
      <div
        className={styles.content}
        onClick={event => event.stopPropagation()}
      >
        <div>
          <div className={styles2.header}>
            <h2>Request {props.requestData.requestId}</h2>
            <span className={styles2.closeButton} onClick={event => props.setDisplay()}><FontAwesomeIcon icon="times" /></span>
          </div>
          <div className={styles.datesOverview}>
            <h2>
              {props.requesterName} {props.requesterLastName}
            </h2>
            <ul>{requestModifierState.dates}</ul>
          </div>
          {requestModifierState.pending && !requestModifierState.myRequest && (
            <div className={styles.verdictForms}>
              <form onSubmit={handleSubmitVerdict} className={styles.verdictForm}>
                <div className={styles.radios}>
                  <input
                    type="radio"
                    name="verdict"
                    value="2"
                    onChange={handleChangeVerdict}
                    placeholder="Approve"
                  ></input>
                  <label>Approve</label>
                  <br></br>
                  <input
                    type="radio"
                    name="verdict"
                    value="1"
                    onChange={handleChangeVerdict}
                    placeholder="Deny"
                  ></input>
                  <label>Deny</label>
                  <br></br>
                </div>
                <br></br>
                <div className={styles.cmdBtns}>
                  <Button variant="contained" type="submit" color="primary">
                    Submit
                  </Button>
                  <Button variant="contained" type="submit" color="secondary" className={styles.requestDeleteButton} onClick={handleSubmitDelete}>
                    Delete
                  </Button>
                </div>
              </form>
            </div>
          )}
          <CommentSection requestId={props.requestData.requestId} />
        </div>
      </div>
    </div>
  );
}

export default RequestModifier;
