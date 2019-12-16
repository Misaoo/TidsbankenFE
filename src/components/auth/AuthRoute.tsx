import React from "react";

import { Redirect } from 'react-router-dom';

/*
    AuthRoute is a Higher Order Component (HOC) that either returns a component or redirects to login depending if the user is authenticated or not.
    We wrap routes that should be protected (meaning not accessible without being logged in) in this HOC.
*/

const AuthRoute = (props: any) => {
    const { component: Component } = props;
    return <>{sessionStorage.getItem("auth") ? <Component {...props} /> : <Redirect to="/login" />}</>
}

export default AuthRoute;