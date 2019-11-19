import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import Pusher from "pusher-js";

const Header = (props: any) => {
  const { user } = useContext(AuthContext);
  const [liArray, setLiArray] = useState<any[]>([]); // Used for li html elements
  const [update, setUpdate] = useState<any>({}); // Used for li html elements

  let pusher: any;
  let channel: any;

  useEffect(() => {
    pusher = new Pusher("4c6550e4e866a013a371", {
      cluster: "eu",
      forceTLS: true
    });

    channel = pusher.subscribe("notifications");

    channel.bind("user_update", function(data: any) {
      setUpdate(data);
    });

    channel.bind("pusher:subscription_succeeded", function(members: any) {
      console.log("successfully subscribed! - Pusher");
    });
  }, []);

  useEffect(() => {
    function getNotification() {
      // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
      // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
      // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
      // DONT FORGET TO UPDATE USERID CONTROLLEN !!!!!)!&)!(/%!!)
      if (update.userId) {
        const liElement = (
          <li className={update.status ? "good" : "bad"}> {update.userId}</li>
        );
        setLiArray(liArray.concat(liElement));
      }
    }
    getNotification();
  }, [update]);

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

  return (
    <header className={styles.module}>
      {loggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Dropdown title={"Notifications"}>
            <ul>{liArray}</ul>
          </Dropdown>
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
        </>
      )}
      {loggedInAdmin && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
          <Dropdown title={"Notifications"}>
            <ul>{liArray}</ul>
          </Dropdown>
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
        </>
      )}
      {loggedOut && (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
      <Dropdown title={"All routes"}>
        <ul className={commonStyles.dropdown}>
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/2fa">2FA</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </Dropdown>
      <Link to="/users">Users</Link>
    </header>
  );
};

export default Header;
