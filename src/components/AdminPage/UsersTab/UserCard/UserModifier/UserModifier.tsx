import React, { useState } from "react";
import axios from "axios";

import Modal from '../../../../common/modal/Modal';
import removepicture from '../../../../../pic/undraw_notify_88a4.svg';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./UserModifier.module.css";
import styles2 from '../../../../../css/Modal.module.css';
import SettingsStyles from '../../../../../css/profile/SettingComponent.module.css';
import commonStyles from '../../../../../css/Common.module.css';

const UserModifier = (props: any) => {
  let [name, setName] = useState(props.user.name)
  let [lastName, setLastName] = useState(props.user.lastName)
  let [email, setEmail] = useState(props.user.email)
  let [showModal3, setShowModal3] = useState(false)

  function handleChangeName(event: any) { setName(event.target.value)}
  function handleChangeLastName(event: any) {setLastName(event.target.value)}
  function handleChangeEmail(event: any) {setEmail(event.target.value)}

  function handleSubmit(event: any) {
    axios(process.env.REACT_APP_API_URL + "/user/" + props.user.userId, {
      method: "PATCH",
      withCredentials: true,
      data: {
        name: name,
        lastName: lastName,
        email: email,
        profilePic : props.user.profilePic
      }
    })
      .then(() => {
        props.updateList(true);
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });

    event.preventDefault();
  }

  function handleSubmitDeleteUser(event: any) {
    axios(process.env.REACT_APP_API_URL + "/user/" + props.user.userId, {
      method: "DELETE",
      withCredentials: true
    })
      .then(() => {
        props.updateList(true);
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
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
              <h2>Edit User</h2>
              <span className={styles2.closeButton} onClick={event => props.setDisplay()}><FontAwesomeIcon icon="times" /></span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.textField}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Name"
                  defaultValue={props.user.name}
                  onChange={handleChangeName}
                  fullWidth
                ></TextField>
              </div>
              <div className={styles.textField}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  label="Last Name"
                  defaultValue={props.user.lastName}
                  onChange={handleChangeLastName}
                  fullWidth
                ></TextField>
              </div>
              <div className={styles.textField}>
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  defaultValue={props.user.email}
                  onChange={handleChangeEmail}
                  fullWidth
                ></TextField>
              </div>
                <div className={styles.textField}>
                  <Button className={styles.buttonSep} variant="contained" type="submit" color="secondary">
                    Save
                  </Button>
                  {props.user.isAdmin === 0 && (
                    <Button variant="contained" color="secondary" onClick={() => setShowModal3(true)}>
                      Delete User
                    </Button>
                  )}
                </div>
            </form>
          </div>
            {showModal3 === true && (
                <Modal display={showModal3} setDisplay={setShowModal3} title="Delete User">
                  <p>Are you sure? The user will be permanently deleted and will not be recoverable.</p>
                  <div className={SettingsStyles.twoFactorAuthimg}><img src={removepicture} alt="2fa"/></div>
                  <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} onClick={handleSubmitDeleteUser}>Delete User</button>
                </Modal>
              )
            }
          </div>
      </div>
    )
}

export default UserModifier;