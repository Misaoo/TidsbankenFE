import React, { useState, useContext, useRef, useEffect } from 'react';
import styles from '../../css/TwoFactorAuth.module.css';
import commonStyles from '../../css/Common.module.css';
import { Redirect } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import API from '../../api/API';

const TwoFactorAuthComponent = (props: any) => {
    const { setUser } = useContext(AuthContext);
    let inputRef = useRef<HTMLInputElement>(null);

    const [token, setToken] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (inputRef.current as any).focus();
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let login = await API.login2fa(token);
            if (login.status === 200) {
                setUser(login.data);
                setSuccess(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(true);
                setMessage(`Something went wrong`);
            }
        }
    }

    const handleChange = (event: any) => {
        setToken(event.target.value);
        if(event.target.value.length >= 5) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
            {success ? <Redirect to="/dashboard" /> : ""}
            <div className={styles.module}>
                <h1>TWO FACTOR AUTHENTICATION</h1>
                <form onSubmit={handleSubmit}>
                    <label className={commonStyles.label} htmlFor="token">Token</label>
                    <input
                        name="token"
                        className={commonStyles.input}
                        type="text"
                        placeholder="Token"
                        onChange={handleChange}
                        value={token}
                        minLength={5}
                        maxLength={6}
                        ref={inputRef}
                    />
                    <p id={styles.errorMessage}>{error && message}</p>
                    <button className={commonStyles.button} type="submit" disabled={disabled}>Authenticate</button>
                </form>
            </div>
        </>
    )
}

export default TwoFactorAuthComponent;