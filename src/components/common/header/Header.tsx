import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Material Ui */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Collapse from '@material-ui/core/Collapse';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


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
  const loggedInAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
    const loggedInSuperAdmin =
    user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;
  const loggedOut =
    Object.entries(user as object).length === 0 &&
    (user as object).constructor === Object;


  /* Material ui varibles */
  const [open, setOpen] = useState(false);

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
                      <NavLink activeClassName={styles.activeLinks} to="/dashboard" onClick={handleToggle}> Dashboard </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/profile" onClick={handleToggle}> {(user && user.name)} </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <NavLink activeClassName={styles.activeLinks} to="/logout" onClick={handleToggle}> Logout </NavLink>
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
                  <NavLink activeClassName={styles.activeLinks} to="/profile"> {(user && user.name)} </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/logout"> Logout </NavLink>
                </>
              )}

              {/* Logged in as Admin */}
              {loggedInAdmin && (
                <>
                  <NavLink to="/"> <FontAwesomeIcon icon="clock" /> Tidsbanken </NavLink>
                  <NavLink activeClassName={styles.activeLinks} to="/dashboard"> Dashboard </NavLink>
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