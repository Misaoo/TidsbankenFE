import React, { useState, useEffect } from 'react';
import AuthContext, { userType } from './AuthContext';
import API from '../../api/API';

const Auth = (props: any) => {

    const [user, setUser] = useState<userType>({} as userType);
    const [authed, setAuthed] = useState<any>();

    const setUserInfo = (user: userType) => {
        setUser(user);
    }

    useEffect(() => {
        try {
            API.authorize()
                .then(res => {
                    if (res.status === 200) {
                        setUser(res.data as userType);
                        setAuthed(true);
                        sessionStorage.setItem("auth", JSON.stringify(new Date()));
                    }
                })
        } catch (error) {
            setAuthed(false);
            console.log(error);
            sessionStorage.removeItem("auth");
        }
    }, []);


    return (
        <>
            {<AuthContext.Provider value={{user, setUser: setUserInfo}}>
                {props.children}
            </AuthContext.Provider>}
        </>
    )
}

export default Auth;