import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import Grid from '@material-ui/core/Grid';





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
  const handleClose = () => {
    setAnchorEl(null);
  };

 /*  const menuClick = () => {
    setOpen(!open);
  }; */

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
              Menu
            </Button>

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
                    {/* <MenuItem>
                      <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                    </MenuItem> */}
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
                {/* Links showing after user logout */}
                {/* <MenuItem>
                  {loggedOut && (
                    <>
                      <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography>
                      <NavLink to="/login"> Login </NavLink>
                    </>
                  )}
                </MenuItem> */}
              </MenuList>
            </Collapse>
          </Box>
          {/* END OF MOBILE VIEW */}


          {/* DESKTOP */}
          <Box component="span" display={{ xs: 'none', lg: 'block', xl: 'block' }}>

            {/* <Grid item xl={12} className={styles.testGrid}> */}
              {/* Logged in as User */}
              {loggedIn && (
                <>
                  <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
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

              {/* Links showing after user logout */}
              {loggedOut && (
                <>
                  <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography>
                  {/* <NavLink className={commonStyles.backgroundColor} to="/login"> Login </NavLink> */}
                </>
              )}
            {/* </Grid> */}

          </Box>
          {/* END OF DESKTOP */}

        </Toolbar>
      </AppBar>
    </header>
  );
};
export default Header;

{/* <Typography variant="h6"><FontAwesomeIcon icon="clock" /> Tidsbanken </Typography> */ }
