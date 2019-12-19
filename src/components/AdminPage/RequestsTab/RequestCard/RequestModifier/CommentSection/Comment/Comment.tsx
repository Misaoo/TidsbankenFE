import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import styles from "../../RequestModifier.module.css";

const Comment = (props: any) => {
  useEffect(() => {
    getName();
  }, []);

  const [commentState, setCommentState] = useState({
    popup: false,
    text: props.comment.comment,
    commenter: "User " + props.comment.userId + ": ",
    isAdmin: false
  });

  const handleChange = (event: any) => {
    setCommentState({ 
      ...commentState,
      [event.target.name]: event.target.value 
    });
  }

  const handleSubmit = (event: any) => {
    if (!(commentState.text === props.comment.comment)) {
      axios(
        process.env.REACT_APP_API_URL +
          "/request/" +
          props.comment.requestId +
          "/comment/" +
          props.comment.commentId,
        {
          method: "PATCH",
          withCredentials: true,
          data: {
            comment: commentState.text
          }
        }
      )
      .then(() => {
        props.updateComments();
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
    }
    event.preventDefault();
  }

  const togglePopup = () => {
    axios(process.env.REACT_APP_API_URL + "/authorize", {
      method: "POST",
      withCredentials: true
    })
      .then(res => {
        if (
          res.data.userId === props.comment.userId &&
          new Date(props.comment.createdAt) >
            new Date(Date.now() - 60 * 60 * 24 * 1000)
        ) {
        setCommentState({
            ...commentState,
            popup: !commentState.popup
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.href = "/logout";
        }
      });
  }

  const deleteComment = () => {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        props.comment.requestId +
        "/comment/" +
        props.comment.commentId,
      {
        method: "DELETE",
        withCredentials: true
      }
    ).then(() => {
      props.updateComments();
    });
  }

  const getName = () => {
    axios(
      process.env.REACT_APP_API_URL + "/user/" + props.comment.userId,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      setCommentState({
        ...commentState,
        isAdmin: res.data.isAdmin === 1,
        commenter: res.data.name + " " + res.data.lastName
      });
    });
  }

  return (
    <div className={styles.comment} onClick={() => togglePopup()}>
      <b>
        {commentState.commenter} {commentState.isAdmin && <b>(admin)</b>} :{" "}
      </b>
      {props.comment.comment} <b>{props.comment.createdAt === props.comment.updatedAt ? "" : "(edited)"}</b>
      {commentState.popup && (
        <div>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="text"
              label="Edit comment here..."
              variant="outlined"
              defaultValue={props.comment.comment}
              onClick={event => event.stopPropagation()}
              onChange={handleChange}
              multiline
            ></TextField>
            <Button type="submit" color="primary">
              Edit
            </Button>
          </form>
          <Button onClick={() => deleteComment()} color="secondary">
            Delete comment
          </Button>
        </div>
      )}
    </div>
  )
}

export default Comment;
