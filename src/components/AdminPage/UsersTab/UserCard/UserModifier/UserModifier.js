import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "./UserModifier.module.css";
import axios from "axios";
import PictureUpload from "./PictureUpload/PictureUpload";

class UserModifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      profilePic: this.props.user.profilePic,
      isAdmin: this.props.user.isAdmin,
      twoFacAut: this.props.user.twoFacAut,
      passwordTop: "",
      passwordBottom: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios(process.env.REACT_APP_API_URL + "/user/" + this.props.user.userId, {
      method: "PATCH",
      withCredentials: true,
      data: {
        name: this.state.name,
        lastName: this.state.lastName,
        email: this.state.email,
        profilePic: this.state.profilePic,
        isAdmin: this.state.isAdmin,
        twoFacAut: this.state.twoFacAut
      }
    }).then(() => {
      this.props.updateList();
    });

    event.preventDefault();
  }
  handleSubmitPassword(event) {
    axios(
      process.env.REACT_APP_API_URL +
        "/user/" +
        this.props.user.userId +
        "/update_password",
      {
        method: "POST",
        withCredentials: true,
        data: {
          password: this.state.passwordBottom
        }
      }
    ).then(() => {
      this.setState({
        passwordTop: "",
        passwordBottom: ""
      });
    });
    event.preventDefault();
  }
  handleSubmitDeleteUser(event) {
    axios(process.env.REACT_APP_API_URL + "/user/" + this.props.user.userId, {
      method: "DELETE",
      withCredentials: true
    }).then(() => {
      this.props.updateList();
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
            <h1>Edit User</h1>
            <br></br>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="name"
                variant="outlined"
                label="Name"
                defaultValue={this.props.user.name}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="lastName"
                variant="outlined"
                label="Last Name"
                defaultValue={this.props.user.lastName}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                defaultValue={this.props.user.email}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <br></br>
              <b>Administrator</b>
              <br></br>
              <input
                type="radio"
                name="isAdmin"
                value={1}
                defaultChecked={this.state.isAdmin === 1}
                onChange={this.handleChange}
              ></input>
              <label>True</label>
              <br></br>
              <input
                type="radio"
                name="isAdmin"
                value={0}
                defaultChecked={this.state.isAdmin === 0}
                onChange={this.handleChange}
              ></input>
              <label>False</label>
              <br></br>
              <b>2FA</b>
              <br></br>
              <input
                type="radio"
                name="twoFacAut"
                value={1}
                defaultChecked={this.state.twoFacAut === 1}
                onChange={this.handleChange}
              ></input>
              <label>True</label>
              <br></br>
              <input
                type="radio"
                name="twoFacAut"
                value={0}
                defaultChecked={this.state.twoFacAut === 0}
                onChange={this.handleChange}
              ></input>
              <label>False</label>
              <br></br>
              <Button variant="contained" type="submit" color="secondary">
                Submit
              </Button>
            </form>
          </div>
          <div></div>
          <div className={styles.contentLeft}>
            <h3>Set new password</h3>
            <form onSubmit={this.handleSubmitPassword}>
              <TextField
                name="passwordTop"
                variant="outlined"
                label="Password"
                type="password"
                value={this.state.passwordTop}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="passwordBottom"
                variant="outlined"
                label="Verify password"
                type="password"
                value={this.state.passwordBottom}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <Button
                disabled={
                  !(
                    this.state.passwordTop === this.state.passwordBottom &&
                    !(this.state.passwordBottom === "") &&
                    !(this.state.passwordTop === "")
                  )
                }
                variant="contained"
                color="primary"
                type="submit"
              >
                Set new password
              </Button>
            </form>
            <div>
              <PictureUpload
                profilePic={this.props.user.profilePic}
                userId={this.props.user.userId}
                updateList={this.props.updateList}
              />
            </div>
            <div>
              <h3>Delete User</h3>
              <form onSubmit={this.handleSubmitDeleteUser}>
                <Button variant="contained" type="submit" color="secondary">
                  Delete User
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserModifier;
