import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "../RequestModifier.module.css";
import axios from "axios";
import Comment from "./Comment/Comment";

const CommentSection = (props: any) => {
  const [ commentsState, setCommentsState] = useState({
    comments: [],
    text: ""
  });

  useEffect(() => {
    getComments();
  }, []);

  const handleChange = (event: any) => {
    setCommentsState({
      ...commentsState,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: any) => {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        props.requestId +
        "/comment",
      {
        method: "POST",
        withCredentials: true,
        data: {
          comment: commentsState.text
        }
      }
    ).then(() => {
      getComments();
    });
    event.preventDefault();
  }

  const getComments = () => {
    let tempComments: any = [];
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        props.requestId +
        "/comment",
      {
        method: "GET",
        withCredentials: true
      }
    )
      .then(res => {
        res.data.reverse();
        res.data.map((comment: any) => {
          return tempComments.push(
            <Comment
              key={comment.commentId}
              comment={comment}
              updateComments={getComments}
            />
          );
        });
        setCommentsState({
          ...commentsState,
          comments: tempComments
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
  }

  return (
    <div className={styles.commentsContainer}>
      <h3>Comments</h3>
      <div className={styles.comments}>{commentsState.comments}</div>
      <form className={styles.commentSubmit} onSubmit={handleSubmit}>
        <div className={styles.commentTextfield}>
          <TextField
            name="text"
            rows="1"
            fullWidth={true}
            variant="outlined"
            label="Comment here..."
            onChange={handleChange}
          ></TextField>
        </div>
        <div className={styles.commentButton}>
          <Button variant="contained" type="submit" color="primary">
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CommentSection;
