import React, { useState, useContext, useRef } from 'react';
import styles from '../../css/Login.module.css';
import commonStyles from '../../css/Common.module.css';
import { Redirect } from 'react-router-dom';
import Popover from '../common/popover/Popover';
import AuthContext from '../auth/AuthContext';
import API from '../../api/API';
var jwtDecode = require('jwt-decode');

/* Handling of login functionality */

const LoginComponent = (props: any) => {
    const {setUser} = useContext(AuthContext);
    let inputRef = useRef<HTMLInputElement>(null);          // handles the input
    const [success, setSuccess] = useState(false);          // handles if the user has a successfull login
    const [error, setError] = useState(false);              // handles error
    const [loggedIn, setLoggedIn] = useState(false);        // handles if the user has a successfull login
    const [message, setMessage] = useState("");             // What message to show user if he/she get unsuccesfull login
    const [btnDisabled, setBtnDisabled] = useState(false);  // disables the button when user have an unsuccesful login
    const [input, setInput] = useState({                    // Input for email and password
        email: "",
        password: ""
    });

    /**********************/
    /* SUBMIT */
    /**********************/
    
    /* Checkes if the user entered a correct email and password for logged in */
    const handleSubmit = async (event: any) => {
        setMessage('')
        event.preventDefault();
        setBtnDisabled(true)
        try {
            let response = await API.login(input.email, input.password);
            if (response.status === 200) {  
              let jwtDe = jwtDecode(response.data.jwt)
                setUser(jwtDe)
                localStorage.setItem('jwt', response.data.jwt);
                setSuccess(true);
                setLoggedIn(true);
                setBtnDisabled(false)
            }
        } catch (error) {
              setBtnDisabled(false)
              if(error.response.status === 401 ){
                setError(true)
                setMessage('User was not found')
              } else if(error.response.status === 402 ){
                setError(true)
                setMessage('Invalid email and/or password')
              }
        }
    }

    /**********************/
    /* INPUT FIELDS */
    /**********************/

    //Takes input from input fields
    const handleChange = (event: any) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    /**********************/
    /* HTML */
    /**********************/

  return (
    <>
      {success && loggedIn ? <Redirect to="/dashboard" /> : ""}
      <div id={styles.login_wrapper}>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <label className={commonStyles.label} htmlFor="email">
            Email
          </label>
          <input
            required
            name="email"
            className={commonStyles.input}
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={input.email}
            ref={inputRef}
          />
          <label className={commonStyles.label} htmlFor="password">
            Password
          </label>
          <input
            required
            name="password"
            className={commonStyles.input}
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={input.password}
          />

          <button
            className={commonStyles.button}
            type="submit"
            disabled={btnDisabled}
          >
            Login
          </button>
          
          {error && <p id={styles.errorMessage}>{message}</p>}

          <Popover
            trigger="Forgot password?"
            triggerId={styles.forgot_password}
            id={styles.popOver}
          >
            Password reset is not yet implemented.
          </Popover>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
