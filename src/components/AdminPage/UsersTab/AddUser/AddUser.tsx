import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./AddUser.css";
import commonStyles from "../../../../css/Common.module.css";

const AddUser = (props:any) => {
  let [name, setName] = useState("")
  let [lastName, setLastName] = useState("")
  let [email, setEmail] = useState("")
  let [passwordTop, setPasswordTop] = useState("")
  let [passwordBottom, setPasswordBottom] = useState("")
  let [successMessage, setSuccessMessage] = useState("")
  let [errorMessage, setErrorMessage] =useState("")
  
  function handleChangeName(event: any) { setName(event.target.value)}
  function handleChangeLastName(event: any) {setLastName(event.target.value)}
  function handleChangeEmail(event: any) {setEmail(event.target.value)}
  function handleChangePasswordTop(event: any) { setPasswordTop(event.target.value)}
  function handleChangePasswordBottom(event: any) {setPasswordBottom(event.target.value)}

  useEffect(() => {
    props.updateStyling(props.styling)
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault();
    axios(process.env.REACT_APP_API_URL + "/user", {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('jwt')
      },
      data: {
        name: name,
        lastName: lastName,
        email: email,
        password: passwordBottom,
      }
    })
      .then((response) => {
          setSuccessMessage("User has been successfully created")
          setTimeout(() => setSuccessMessage(""), 3000)     

          setName("")
          setLastName("")
          setEmail("")
          setPasswordTop("")
          setPasswordBottom("")
      })
      .catch(error => {
        if(error.response.status === 400) {
          setErrorMessage("User already exist")   
          setTimeout(() => setErrorMessage(""), 3000)     
        } else {
          setErrorMessage("Something went wrong, try again")
          setTimeout(() => setErrorMessage(""), 3000)
        }
      });
  }

return (
      <form onSubmit={handleSubmit}>
        <div className="userSubmit">
          <h2>Required Fields</h2>
          <div className="textField">
            <TextField
              name="name"
              variant="outlined"
              label="Name"
              value={name}
              onChange={handleChangeName}
              fullWidth
              autoComplete="off"
              inputProps={{form: {autocomplete: "off"}}}
            ></TextField>
          </div>
          <br></br>
          <div className="textField">
            <TextField
              className="textField"
              name="lastName"
              variant="outlined"
              label="Last Name"
              value={lastName}
              onChange={handleChangeLastName}
              fullWidth
              autoComplete="off"
              inputProps={{form: {autocomplete: "off"}}}
            ></TextField>
          </div>
          <br></br>
          <div className="textField">
            <TextField
              className="textField"
              name="email"
              variant="outlined"
              label="Email"
              value={email}
              onChange={handleChangeEmail}
              fullWidth
              autoComplete="off"
              inputProps={{form: {autocomplete: "off"}}}
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
              value={passwordTop}
              onChange={handleChangePasswordTop}
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
              value={passwordBottom}
              onChange={handleChangePasswordBottom}
              fullWidth
            ></TextField>
          </div>
          {passwordTop !== "" &&
            passwordBottom !== passwordTop && (
              <div>
                <br></br>
                <b>
                  <label>Password fields do not match</label>
                </b>
              </div>
            )}

            {successMessage !== "" && (
              <>
                <br></br>
                <b><label className={commonStyles.successLabel}>{successMessage}</label></b>
              </>
              )}
            {errorMessage !== "" && (
              <>
                <br></br>
                <b><label className={commonStyles.badLabel}>{errorMessage}</label></b>
              </>
              )}
          <button
          className={commonStyles.button}
          disabled={
            !(
              name !== "" &&
              lastName !== "" &&
              passwordTop === passwordBottom &&
              !(passwordBottom === "") &&
              !(passwordTop === "")
            )
          }
          type="submit"
          >
            Add User
          </button>
        </div>
      </form>
    )
}

export default AddUser;