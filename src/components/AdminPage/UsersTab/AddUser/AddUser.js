import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./AddUser.css";
import AddPicture from "./AddPicture/AddPicture";
import commonStyles from "../../../../css/Common.module.css";

class PictureUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      email: "",
      passwordTop: "",
      passwordBottom: "",
      profilePic: "",
      region : "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.updateStyling(this.props.styling);
    console.log(this.props)
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
        profilePic: this.state.profilePic,
        region : this.state.region
      }
    })
      .then(() => {
        this.setState({
          name: "",
          lastName: "",
          email: "",
          passwordTop: "",
          passwordBottom: "",
          profilePic: "",
          region : ""
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
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
      <div className="outerAddUser">
        <form onSubmit={this.handleSubmit}>
          <div className="userSubmit">
            <div className="inputFields">
              <div>
                <h4>Required Fields</h4>
                <div className="textField">
                  <TextField
                    name="name"
                    variant="outlined"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                  ></TextField>
                </div>
                <br></br>
                <div className="textField">
                  <TextField
                    className="textField"
                    name="lastName"
                    variant="outlined"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    fullWidth
                  ></TextField>
                </div>
                <br></br>
                <div className="textField">
                  <TextField
                    className="textField"
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  ></TextField>
                </div>
                <br></br>
                <div className="textField">
                <TextField
                  className="textField"
                  name="region"
                  variant="outlined"
                  label="Region"
                  value={this.state.region}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
              </div>         
              <br></br>      
                <div className="textField">
                  <TextField
                    className="textField"
                    name="passwordTop"
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={this.state.passwordTop}
                    onChange={this.handleChange}
                    fullWidth
                  ></TextField>
                </div>
                <br></br>
                <div className="textField">
                  <TextField
                    className="textField"
                    name="passwordBottom"
                    variant="outlined"
                    label="Verify password"
                    type="password"
                    value={this.state.passwordBottom}
                    onChange={this.handleChange}
                    fullWidth
                  ></TextField>
                </div>
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
            <button
              className={commonStyles.button}
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
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PictureUpload;
