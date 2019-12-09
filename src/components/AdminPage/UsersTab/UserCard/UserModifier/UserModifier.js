import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "./UserModifier.module.css";
import axios from "axios";
import PictureUpload from "./PictureUpload/PictureUpload";
import removepicture from '../../../../../pic/undraw_notify_88a4.svg';
import Modal from '../../../../common/modal/Modal';
import SettingsStyles from '../../../../../css/profile/SettingComponent.module.css';
import commonStyles from '../../../../../css/Common.module.css';

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
      passwordBottom: "",
      showModal3: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
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
      }
    })
      .then(() => {
        this.props.updateList();
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
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
    })
      .then(() => {
        this.props.updateList();
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.href = "/logout";
        }
      });
    event.preventDefault();
  }

  /*******************************/
  /* DELETE USER */
  /*******************************/

  deleteModal() { 
    this.setState({
      showModal3: true
    }); 
  }       // is called when the user pressed the delete account button. This makes the popup show. 

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
              <div className={styles.textField}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Name"
                  defaultValue={this.props.user.name}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
              </div>
              <div className={styles.textField}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  label="Last Name"
                  defaultValue={this.props.user.lastName}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
              </div>
              <div className={styles.textField}>
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  defaultValue={this.props.user.email}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
              </div>
                <div className={styles.textField}>
                  <Button variant="contained" type="submit" color="secondary">
                    Submit
                  </Button>
                </div>
            </form>
          </div>
          <div></div>
          <div className={styles.contentLeft}>
            {this.props.user.isAdmin === 0 && (
              <div>
                <h3>Delete User</h3>
                <form onSubmit={this.handleSubmitDeleteUser}>
                  <Button variant="contained" color="secondary" onClick={this.deleteModal}>
                    Delete User
                  </Button>
                </form>
              </div>
            )}
            {this.state.showModal3 === true && (
                <Modal display={this.state.showModal3}  title="Delete User">
                  <p>Are you sure? The user will be permanently deleted and will not be recoverable.</p>
                  <div className={SettingsStyles.twoFactorAuthimg}><img src={removepicture} alt="2fa"/></div>
                  <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} onClick={this.handleSubmitDeleteUser}>Delete User</button>
                </Modal>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UserModifier;
