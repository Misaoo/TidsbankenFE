import React, { useState, useEffect } from 'react';
import AuthContext, { userType } from './AuthContext';
import API from '../../api/API';

/*
    On mount the Auth Component makes a request to /authorize to check whether the current user is 
    logged in or not (logged in meaning if their session is valid).

    If the response is 200 OK the user session is valid and we add the user info (as returned in the response data)
    to the AuthContext.

    We also add a timestamp to localstorage to allow for easy checking during the session if the session is valid.
    A future improvement might be to retrieve the timestamp for when the session expires from the backend request. 
    And do some checking if that timestamp is in the future or past to allow for quicker authentication without having
    to make requests to authorize.

*/

const Auth = (props: any) => {

    const [user, setUser] = useState<userType>({} as userType);

    const setUserInfo = (user: userType) => {
        setUser(user);
    }

    useEffect(() => {
        API.authorize()
            .then((res: any) => {
                if (res.status === 200) {
                    setUser(res.data as userType);
                }
            })
            .catch(() => {
                // returns 401, unauthorized
                localStorage.removeItem('jwt')
            })
    }, [])

    /*
        Here we add the user and a help function to add user to the context, to the context provider. meaning that any children of this component will have access to the user info
        by accessing the context.
    */
    return (
        <>
            {<AuthContext.Provider value={{user, setUser: setUserInfo}}>
                {props.children}
            </AuthContext.Provider>}
        </>
    )
}

export default Auth;