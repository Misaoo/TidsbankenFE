import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "../RequestModifier.module.css";
import axios from "axios";
import Comment from "./Comment/Comment";

class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      text: ""
    };
    this.getComments();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        this.props.requestId +
        "/comment",
      {
        method: "POST",
        withCredentials: true,
        data: {
          comment: this.state.text
        }
      }
    ).then(() => {
      this.getComments();
    });
    event.preventDefault();
  }

  getComments() {
    let tempComments = [];
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        this.props.requestId +
        "/comment",
      {
        method: "GET",
        withCredentials: true
      }
    )
      .then(res => {
        res.data.reverse();
        res.data.map(comment => {
          return tempComments.push(
            <Comment
              key={comment.commentId}
              comment={comment}
              updateComments={this.getComments.bind(this)}
            />
          );
        });
        this.setState({
          comments: tempComments
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
  }

  render() {
    return (
      <div className={styles.commentsContainer}>
        <h3>Comments</h3>
        <div className={styles.comments}>{this.state.comments}</div>
        <form className={styles.commentSubmit} onSubmit={this.handleSubmit}>
          <div className={styles.commentTextfield}>
            <TextField
              name="text"
              rows="3"
              fullWidth={true}
              variant="outlined"
              label="Comment here..."
              onChange={this.handleChange}
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
}
export default CommentSection;
