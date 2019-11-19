import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./AddUser.css";
import AddPicture from "./AddPicture/AddPicture";

class PictureUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      email: "",
      passwordTop: "",
      passwordBottom: "",
      profilePic: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios(process.env.REACT_APP_API_URL + "/user", {
      method: "POST",
      withCredentials: true,
      data: {
        name: this.state.name,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.passwordBottom,
        profilePic: this.state.profilePic
      }
    }).then(() => {
      this.setState({
        name: "",
        lastName: "",
        email: "",
        passwordTop: "",
        passwordBottom: "",
        profilePic: ""
      });
    });
    event.preventDefault();
  }
  setPicture(image) {
    this.setState({
      profilePic: image
    });
  }

  render() {
    return (
      <div>
        <h1>Add user</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="userSubmit">
            <div className="inputFields">
              <div>
                <h4>Required Fields</h4>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <br></br>
                <TextField
                  name="lastName"
                  variant="outlined"
                  label="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <br></br>
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <br></br>
                <TextField
                  name="passwordTop"
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={this.state.passwordTop}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <br></br>
                <TextField
                  name="passwordBottom"
                  variant="outlined"
                  label="Verify password"
                  type="password"
                  value={this.state.passwordBottom}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                {this.state.passwordTop !== "" &&
                  this.state.passwordBottom !== this.state.passwordTop && (
                    <div>
                      <br></br>
                      <b>
                        <font color="red">Password fields does not match</font>
                      </b>
                    </div>
                  )}
                <br></br>
              </div>
              <div></div>
              <div>
                <h4>Upload Picture (Optional)</h4>
                <AddPicture
                  setPicture={this.setPicture.bind(this)}
                  imageState={this.state.profilePic}
                />
              </div>
            </div>
            <Button
              disabled={
                !(
                  this.state.name !== "" &&
                  this.state.lastName !== "" &&
                  this.state.passwordTop === this.state.passwordBottom &&
                  !(this.state.passwordBottom === "") &&
                  !(this.state.passwordTop === "")
                )
              }
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Add User
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default PictureUpload;
