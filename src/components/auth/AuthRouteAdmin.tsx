import React, { useContext, useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import AuthContext, { userType } from "./AuthContext";
import API from '../../api/API';

/*
    AuthRoute is a Higher Order Component (HOC) that either returns a component or redirects to login depending if the user is authenticated or not.
    We wrap routes that should be protected (meaning not accessible without being logged in) in this HOC.
*/

const AuthRouteAdmin = (props: any) => {
    const { user } = useContext(AuthContext);
    const { component: Component } = props;

    const auth = () => {
        if(user!.name === undefined) {
            return API.authorize()
                .then((res: any) => {
                    if (res.status === 200) {
                        return true
                    }
                })
                .catch(() => {
                    // returns 401, unauthorized
                    localStorage.removeItem('jwt')
                    return false
                })
        } else {
            return (user && user!.hasOwnProperty("name") && user!.hasOwnProperty("isAdmin")) && user!.isAdmin === 1 || user!.isAdmin === 2
        }
    } 

    return <>{auth() ? <Component {...props} /> : <Redirect to="/unauthorized" />}</>
}


export default AuthRouteAdmin;