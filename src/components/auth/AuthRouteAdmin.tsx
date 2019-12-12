import React, { useContext } from "react";

import { Redirect } from 'react-router-dom';
import AuthContext from "./AuthContext";

/*
    AuthRoute is a Higher Order Component (HOC) that either returns a component or redirects to login depending if the user is authenticated or not.
    We wrap routes that should be protected (meaning not accessible without being logged in) in this HOC.
*/


const AuthRouteAdmin = (props: any) => {
    const { user } = useContext(AuthContext);
    const loggedInAdmin =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin == 1 ;
    const loggedInSuperAdmin =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin == 2 ;
    const { component: Component } = props;
    return <>{loggedInAdmin || loggedInSuperAdmin ? <Component {...props} /> : <Redirect to="/unauthorized" />}</>
}


export default AuthRouteAdmin;