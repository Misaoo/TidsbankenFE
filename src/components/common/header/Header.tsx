import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/*
  The header component is responsible for displaying the links in the header bar.
  Different links are displayed depending if the user is logged in, logged out or if they are a logged in admin.
*/

const Header = (props: any) => {
  const { user } = useContext(AuthContext);

  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;
  const loggedOut =
    Object.entries(user as object).length === 0 &&
    (user as object).constructor === Object;

  return (
    <header className={styles.module}>
      <Link to="/" className={styles.logo}><FontAwesomeIcon icon="clock" /> TB</Link>
      {loggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>         
          <Link to="/users">Users</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
      {loggedInAdmin && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
      {loggedInSuperUser && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </>
        )
      }

      {loggedOut && (
        <>
          <Link className={commonStyles.backgroundColor} to="/login">Login</Link>
        </>
      )}
    </header>
  );
};

export default Header;
