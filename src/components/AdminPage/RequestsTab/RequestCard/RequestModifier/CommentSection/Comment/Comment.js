import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import styles from "../../RequestModifier.module.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      text: this.props.comment.comment,
      commenter: "User " + this.props.comment.userId + ": "
    };
    this.getName();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    if (!(this.state.text === this.props.comment.comment)) {
      axios(
        process.env.REACT_APP_API_URL +
          "/request/" +
          this.props.comment.requestId +
          "/comment/" +
          this.props.comment.commentId,
        {
          method: "PATCH",
          withCredentials: true,
          data: {
            comment: this.state.text
          }
        }
      ).then(() => {
        this.props.updateComments();
      });
    }

    event.preventDefault();
  }
  togglePopup() {
    axios(process.env.REACT_APP_API_URL + "/authorize", {
      method: "POST",
      withCredentials: true
    }).then(res => {
      if (res.data.userId === this.props.comment.userId) {
        this.setState({
          popup: !this.state.popup
        });
      }
    });
  }
  deleteComment() {
    axios(
      process.env.REACT_APP_API_URL +
        "/request/" +
        this.props.comment.requestId +
        "/comment/" +
        this.props.comment.commentId,
      {
        method: "DELETE",
        withCredentials: true
      }
    ).then(() => {
      this.props.updateComments();
    });
  }
  getName() {
    axios(
      process.env.REACT_APP_API_URL + "/user/" + this.props.comment.userId,
      {
        method: "GET",
        withCredentials: true
      }
    ).then(res => {
      this.setState({
        commenter: res.data.name + " " + res.data.lastName
      });
    });
  }
  render() {
    let edited = "";
    if (!(this.props.comment.createdAt === this.props.comment.updatedAt)) {
      edited = "(edited)";
    }
    return (
      <div className={styles.comment} onClick={() => this.togglePopup()}>
        <b>{this.state.commenter}: </b>
        {this.props.comment.comment} <b>{edited}</b>
        {this.state.popup && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                name="text"
                label="Edit comment here..."
                variant="outlined"
                defaultValue={this.props.comment.comment}
                onClick={event => event.stopPropagation()}
                onChange={this.handleChange}
                multiline
              ></TextField>
              <Button type="submit" color="primary">
                Edit
              </Button>
            </form>
            <Button onClick={() => this.deleteComment()} color="secondary">
              Delete comment
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default Comment;
