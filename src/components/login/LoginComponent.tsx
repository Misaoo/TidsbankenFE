import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from '../../css/Login.module.css';
import commonStyles from '../../css/Common.module.css';
import { Redirect } from 'react-router-dom';
import Popover from '../common/popover/Popover';
import AuthContext from '../auth/AuthContext';
import API from '../../api/API';

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
    const [ls, setLs] = useState({                          // handles how many minuts and seconds it is left on the cooldown
        minutesLeft: 0,
        secondsLeft: 0,
    });

    /**********************/
    /* SUBMIT */
    /**********************/
    
    /* Checkes if the user entered a correct email and password for logged in */
    const handleSubmit = async (event: any) => {
        setMessage('')
        event.preventDefault();
        try {
            let response = await API.login(input.email, input.password);
            if (response.status === 200) {
                setUser(response.data);
                sessionStorage.setItem("auth", JSON.stringify(new Date()));
                setSuccess(true);
                setLoggedIn(true);
            }
        } catch (error) {
              if(error.response.status === 401 ){
                setError(true)
                setMessage('User is not found')
              } else if(error.response.status === 402 ){
                setError(true)
                setMessage('Invalid email or password')
              }
            /*if (error.response.status === 401 || error.response.status === 504) {
                setError(true);
                let errorData = error.response.data;
                if (errorData.hasOwnProperty("timeOut") || errorData['numOfAttemptedLogins'] === 5) {
                    setMessage(`5 attemts made please try again in ${ls.minutesLeft} min and ${ls.secondsLeft} sec`)
                    setCounterInLocalStorage();
                    timer();
                    setBtnDisabled(true);
                } else {
                    setMessage(`You have ${(5 - errorData['numOfAttemptedLogins'])} attempts left`);
                }
            }
            // If TwoFactorAuthentication
            if (error.response.status === 418) {
                setSuccess(true);
                setLoggedIn2fa(true);
            }*/
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
    /* Localhost */
    /**********************/
    // When the user update the page while having a timeout becouse user entered wrong password before, he/she must see a the timer. We store the timer in localhost and on server and make sure its correct. 
    
    useEffect(() => {
        setMessage(`5 attemts made please try again in ${ls.minutesLeft} min and ${ls.secondsLeft} sec`);
    }, [ls])

    const timeLeft = (): number => {
        return Number(localStorage.getItem("timeTo")) - Date.now();
    }

    const setCounterInLocalStorage = () => {
        const timeTo = new Date().getTime() + (5 * 60000);
        localStorage.setItem("timeTo", timeTo.toString());
    }

    const timer = () => {
        let timer: number = window.setInterval(() => {
            let timeDelta: number = timeLeft();
            if (timeDelta < 0) {
                window.clearInterval(timer);
                setError(false);
                setMessage("");
                localStorage.removeItem("timeTo");
                setBtnDisabled(false);
            } else {
                let minutes = Math.floor((timeDelta % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeDelta % (1000 * 60)) / 1000);
                setLs({
                    ...ls,
                    minutesLeft: minutes,
                    secondsLeft: seconds,
                });
                setMessage(`5 attemts made please try again in ${ls.minutesLeft} min and ${ls.secondsLeft} sec`);
            }
        }, 1000);
    }

  useEffect(() => {
    const getTimeLeft = () => {
      if (localStorage.getItem("timeTo")) {
        if (timeLeft() > 0) {
          timer();
          setBtnDisabled(true);
          setError(true);
        } else {
          setBtnDisabled(false);
          localStorage.removeItem("timeTo");
        }
      }
    };
    getTimeLeft();
    (inputRef.current as any).focus();
    // eslint-disable-next-line
  }, []);


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
            name="password"
            className={commonStyles.input}
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={input.password}
          />
          <p id={styles.errorMessage}>{error && message}</p>

          <button
            className={commonStyles.button}
            type="submit"
            disabled={btnDisabled}
          >
            Login
          </button>

          <Popover
            trigger="Forgot password?"
            triggerId={styles.forgot_password}
            id={styles.popOver}
          >
            Please contact your administrator for a new password
          </Popover>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
