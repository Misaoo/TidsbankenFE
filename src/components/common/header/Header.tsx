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
  Here notifications are also handled.
*/

const Header = (props: any) => {
  const { user } = useContext(AuthContext);
  const [liArray, setLiArray] = useState<any[]>([]); // Used for li html elements
  const [update, setUpdate] = useState<any>([]); // Used for li html elements
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    callNotifications();
  }, []);

  useEffect(() => {
    setNotificationCount(update.length);
  }, [update]);

  const callNotifications = () => {
    axios(process.env.REACT_APP_API_URL + "/notification", {
      method: "GET",
      withCredentials: true
    }).then(response => {
      setUpdate(response.data);
    });
  }

  const removeNotification = (value: any) => {
    return axios(process.env.REACT_APP_API_URL + "/notification/" + value, {
      method: "DELETE",
      withCredentials: true
    }).then(() => {
      getNotifications();
    });
  }

  const getNotifications = () => {
    callNotifications();
    const liElement = update.map((value: any) => {
      return <li
        onClick={() => removeNotification(value.notificationId)}
        key={value.notificationId}
        className={commonStyles.dropdown}>
        <Link to={"/requests/"+ value.requestId}>{value.message}</Link>
      </li>
    });
    setLiArray(liElement);
  }

  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
    const loggedInSuperAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;
    const loggedOut =
    Object.entries(user as object).length === 0 &&
    (user as object).constructor === Object;

  return (
    <header className={styles.module}>
      <Link to="/" className={styles.logo}><FontAwesomeIcon icon="clock" /> TB</Link>
      {loggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>         
          <Dropdown title={(user && user.name) || "Menu"}>
            <ul className={commonStyles.dropdown}>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </Dropdown>
          <Dropdown
            title={`Notifications ${notificationCount > 0 ? '*' : ''}`}
            cb={getNotifications}
          >
            <ul>{liArray}</ul>
          </Dropdown>
          <Link to="/users">Users</Link>
        </>
      )}
      {loggedInAdmin && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Dropdown title={(user && user.name) || "Menu"}>
            <ul className={commonStyles.dropdown}>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </Dropdown>
          <Dropdown
            title={`Notifications ${notificationCount > 0 ? '*' : ''}`}
            cb={getNotifications}
          >
            <ul>{liArray}</ul>
          </Dropdown>
          <Link to="/users">Users</Link>
          <Link to="/admin">Admin</Link>
        </>
      )}
      {loggedInSuperAdmin && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Dropdown title={(user && user.name) || "Menu"}>
            <ul className={commonStyles.dropdown}>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </Dropdown>
          <Dropdown
            title={`Notifications ${notificationCount > 0 ? '*' : ''}`}
            cb={getNotifications}
          >
            <ul>{liArray}</ul>
          </Dropdown>
          <Link to="/users">Users</Link>
          <Link to="/admin">Admin</Link>
        </>
      )}
      {loggedOut && (
        <>
          <Link className={commonStyles.backgroundColor} to="/login">Login</Link>
        </>
      )}
    </header>
  );
};

export default Header;
