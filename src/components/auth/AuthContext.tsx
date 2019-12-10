import React from 'react';

export type authType = {
    user: userType,
    setUser: any,
}

export type userType = {
    name: string,
    lastName: string,
    isAdmin: number,
    twoFacAut: number,
    userId: number,
<<<<<<< HEAD
=======
    region : String
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
}

const AuthContext = React.createContext<Partial<authType>>({});

// Setting displayname for the context to allow to easier see the context in Reacts developer tools.
AuthContext.displayName = "AuthContext";

export default AuthContext;