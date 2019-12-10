import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { NavLink } from "react-router-dom";
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

/* Material Ui */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998


/*
  The header component is responsible for displaying the links in the header bar.
  Different links are displayed depending if the user is logged in, logged out or if they are a logged in admin.
<<<<<<< HEAD
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

=======
*/

const Header = (props: any) => {

  const { user } = useContext(AuthContext);

  const [liArray, setLiArray] = useState<any[]>([]); // Used for li html elements
  const [update, setUpdate] = useState<any>([]); // Used for li html elements
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
<<<<<<< HEAD
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;
=======
  const loggedInAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
    const loggedInSuperAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
  const loggedOut =
    Object.entries(user as object).length === 0 &&
    (user as object).constructor === Object;

<<<<<<< HEAD
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
      {loggedInSuperUser && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link>
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
=======

  /* Material ui varibles */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const anchorRef = React.useRef<HTMLButtonElement>(null);


 
  return (

    <header className={styles.module}>

      <AppBar position="static" className={styles.module}>
        <Toolbar>

          {/* MOBILE VIEW WITH COLLAPSE */}
          <Box component="span" display={{ xs: 'block', sm: 'block', md: 'none' }}>

            {/* Toggle button */}
            <Button
              className={styles.menuBtn}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <FontAwesomeIcon icon="bars" />
            </Button>
            <span>
            <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>

            </span>

            {/* Link menu */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <MenuList autoFocusItem={open} id="menu-list-grow">

                {/* Logged in as User */}
                {loggedIn && (
                  <div>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/dashboard" onClick={handleClose}> Dashboard </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/profile" onClick={handleClose}> {(user && user.name)} </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/logout" onClick={handleClose}> Logout </NavLink>
                    </MenuItem>
                  </div>
                )}

                {/* Logged in as Admin */}
                {loggedInAdmin && (
                  <div>
                    
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/dashboard" onClick={handleToggle}> Dashboard </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/users" onClick={handleToggle}> Users </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/users" onClick={handleToggle}> Users </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/admin" onClick={handleToggle}> Admin tool </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/profile" onClick={handleToggle}> {(user && user.name)} </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/logout" onClick={handleToggle}> Logout </NavLink>
                    </MenuItem>
                  </div>
                )}

                {loggedInSuperAdmin && (
                  <div>
                    
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/dashboard" onClick={handleToggle}> Dashboard </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/users" onClick={handleToggle}> Users </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/admin" onClick={handleToggle}> Admin tool </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/profile" onClick={handleToggle}> {(user && user.name)} </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/logout" onClick={handleToggle}> Logout </NavLink>
                    </MenuItem>
                  </div>
                )}

              </MenuList>
            </Collapse>
          </Box>
          {/* END OF MOBILE VIEW */}


          {/* DESKTOP */}
          <Box component="span" display={{ xs: 'none', md: 'block', lg: 'block', xl: ' block' }}>

              {/* Logged in as User */}
              {loggedIn && (
                <>
                  <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/users"> Users </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/profile"> {(user && user.name)} </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                </>
              )}

              {/* Logged in as Admin */}
              {loggedInAdmin && (
                <>
                  <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/users"> Users </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/admin"> Admin tool </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/profile"> {(user && user.name)} </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                </>
              )}
              {loggedInSuperAdmin && (
                <>
                  <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/users"> Users </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/admin"> Admin tool </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/profile"> {(user && user.name)} </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                </>
              )}

              {/* Links showing after user logout */}
              {loggedOut && (
                <>
                  <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography>
                  {/* <NavLink className={commonStyles.backgroundColor} to="/login"> Login </NavLink> */}
                </>
              )}

          </Box>
          {/* END OF DESKTOP */}

        </Toolbar>
      </AppBar>
    </header>
  );
};
export default Header;

{/* <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography> */ }
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
