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
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Collapse from '@material-ui/core/Collapse';




/*
  The header component is responsible for displaying the links in the header bar.
  Different links are displayed depending if the user is logged in, logged out or if they are a logged in admin.
  Here notifications are also handled.
*/

const Header = (props: any) => {
  const { user } = useContext(AuthContext);
  const [liArray, setLiArray] = useState<any[]>([]); // Used for li html elements
  const [update, setUpdate] = useState<any>([]); // Used for li html elements

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


  /* Material ui varibles */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (

    <header className={styles.module}>
      <AppBar position="static" className={styles.module}>
        <Toolbar>

          {/* This box component only shows on mobile and tablet */}
          <Box component="span" display={{ xs: 'block', sm: 'block', md: 'none' }}>
            {/* Toggle button */}
            <Button size="small" className={styles.menuBtn} onClick={menuClick}> <FontAwesomeIcon icon="clock" /> Menu </Button>
          </Box>


          {/* MOBILE VIEW WITH COLLAPSE */}
          <Box component="span" display={{ xs: 'block', sm: 'block', md: 'none' }}>
            {/* Link menu */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box component="span" display="block">

                {/* Logged in as User */}
                {loggedIn && (
                  <>
                    <NavLink activeClassName={styles.activeLinks} to="/dashboard" onClick={menuClick}> Dashboard </NavLink>
                    <Dropdown activeClassName={styles.activeLinks}  title={(user && user.name) || "Menu"} onClick={menuClick}>
                      <ul className={commonStyles.dropdown}>
                        <li>
                          <NavLink to="/profile"> Profile </NavLink>
                        </li>
                        <li>
                          <NavLink to="/logout"> Logout </NavLink>
                        </li>
                      </ul>
                    </Dropdown>
                    {/* <Dropdown activeClassName={styles.activeLinks}  title={(user && user.name) || "Menu"} onClick={menuClick}>
                      <ul >
                        <li>
                          <NavLink to="/profile"> Profile </NavLink>
                        </li>
                        <li>
                          <NavLink to="/logout"> Logout </NavLink>
                        </li>
                      </ul>
                    </Dropdown> */}
                  </>
                )}

                {/* Logged in as Admin */}
                {loggedInAdmin && (
                  <>
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
                  </>
                )}

                {/* Links showing after user logout */}
                {loggedOut && (
                  <>
                    {/* <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography> */}
                    <NavLink to="/login"> Login </NavLink>
                  </>
                )}

              </Box>
            </Collapse>
          </Box>
          {/* END OF MOBILE VIEW */}


          {/* DESKTOP */}
          <Box component="span" display={{ xs: 'none', lg: 'block', xl: 'block' }}>
            {/* Logged in as User */}
            {loggedIn && (
              <>
                <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
                <Dropdown activeClassName={styles.activeLinks} title={(user && user.name) || "Menu"}>
                  <ul className={commonStyles.dropdown}>
                    <li>
                      <NavLink activeClassName={styles.activeLinks} to="/profile"> Profile </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                    </li>
                  </ul>
                </Dropdown>
              </>
            )}

            {/* Logged in as Admin */}
            {loggedInAdmin && (
              <>
                <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken</NavLink>
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


