import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute = (props: any) => {
    const { component: Component } = props;
    return <>{sessionStorage.getItem("auth") ? <Component {...props} /> : <Redirect to="/login" />}</>
}

export default AuthRoute;