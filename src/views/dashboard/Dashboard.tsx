import React, { useContext } from 'react';
import AuthContext from "../../components/auth/AuthContext";
import Calendar from '../../components/dashboard/calendar/Calendar';
import Users from '../../components/Users/Users'
const Dashboard = (props:any) => {
    const { user } = useContext(AuthContext);
    const loggedIn =
        user &&
        user.hasOwnProperty("name") &&
        user.hasOwnProperty("isAdmin") &&
        user.isAdmin === 0;
    const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
    const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;

    return (
      <>
        {loggedIn && (
            <Calendar />
        )}

        {loggedInAdmin && (
            <Calendar />
        )}

        {loggedInSuperUser && (
            <Users/>
        )}
      </>
    )
}

export default Dashboard;