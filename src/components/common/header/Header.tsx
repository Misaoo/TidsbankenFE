import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Material Ui */
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

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
        <NavLink to={"/requests/" + value.requestId}>{value.message}</NavLink>
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
  const loggedOut =
    Object.entries(user as object).length === 0 &&
    (user as object).constructor === Object;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
  return (

    <header className={styles.module}>
      <AppBar position="static" className={styles.module}>
        <Toolbar>

          {/* Loggin as regular user */}
          {loggedIn && (
            <div className="NavlinkContainer">
              
              <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
              <NavLink activeClassName={styles.activeLinks} to="/users"> Users </NavLink>
              <Dropdown title={(user && user.name) || "Menu"}>
                <ul className={commonStyles.dropdown}>
                  <li>
                    <NavLink activeClassName={styles.activeLinks} to="/profile"> Profile </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                  </li>
                </ul>
              </Dropdown>
            </div>
          )} 

        {/* Loggin as Admin */}
        {loggedInAdmin && (
            <div className="NavlinkContainer">
              <NavLink to="/"><FontAwesomeIcon icon="clock" /> TB</NavLink>
              <NavLink activeClassName={styles.activeLinks} to="/dashboard">Dashboard</NavLink>
              <NavLink activeClassName={styles.activeLinks} to="/users">Users</NavLink>
              <Dropdown title={(user && user.name) || "Menu"}>
                <ul className={commonStyles.dropdown}>
                  <li>
                    <NavLink activeClassName={styles.activeLinks} to="/admin">Admin</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.activeLinks} to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.activeLinks} to="/logout">Logout</NavLink>
                  </li>
                </ul>
              </Dropdown>
            </div>
          )}

          {/* Links showing after user logout */}
           {loggedOut && (
            <>
             <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography>
              <NavLink className={commonStyles.backgroundColor} to="/login"> Login </NavLink>
            </>
          )} 

        </Toolbar>
      </AppBar>
    </header>
  );
};
export default Header;


