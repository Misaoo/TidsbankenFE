import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { Redirect } from 'react-router-dom';

const AuthRoute = (props: any) => {

    const { user } = useContext(AuthContext);
    const { component: Component } = props;

    console.log(user);

    return (
        <>
            {user && user.name ? <Component  {...props} /> : <Redirect to="/login" />}
        </>
    )
}

export default AuthRoute;