import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../api/API';
import AuthContext from '../auth/AuthContext';

const Logout = (props: any) => {
    const { setUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.logout()
            .then(res => {
                if (res.status === 200) {
                    setUser({});
                    setSuccess(true);
                } else {
                    setError(true);
                }
            })
    }, [setUser]);

    return (
        <>
            {success && <Redirect to="/login" />}
            {error && <p>Something went wrong with the logout, please try again</p>}
        </>
    )
}

export default Logout;