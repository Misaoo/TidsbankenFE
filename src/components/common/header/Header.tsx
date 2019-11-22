import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import styles from "../../../css/Header.module.css";
import commonStyles from "../../../css/Common.module.css";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";

const Header = (props: any) => {
  const { user } = useContext(AuthContext);
  const [liArray, setLiArray] = useState<any[]>([]); // Used for li html elements
  const [update, setUpdate] = useState<any>([]); // Used for li html elements

  useEffect(() => {
    callNotifications();
  }, []);

  const callNotifications =()=>{
    axios(process.env.REACT_APP_API_URL + "/notification", {
      method: "GET",
      withCredentials: true
    }).then(response => {
      setUpdate(response.data);
      console.log(response.data)
    });}

  const removeNotification=(value:any)=>{
      return axios(process.env.REACT_APP_API_URL + "/notification/" + value, {
        method: "DELETE",
        withCredentials: true    
    }).then (()=>{
      console.log("done");
      getNotifications();
    });
  }

  const getNotifications=() => {
    callNotifications();
    console.log("test")
      const liElement = update.map((value:any)=>{
        return <li 
                  onClick={()=>removeNotification(value.notificationId)} 
                  key={value.notificationId}>
                  <Link to="/profile">{value.message}</Link>
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

  return (
    <header className={styles.module}>
      {loggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Dropdown 
          title={"Notifications"}
          cb={() => getNotifications()}          >
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
          <Dropdown 
          title={"Notifications"} 
          cb={() => getNotifications()}          >
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
          <li>
            <Link to="/requests/1">Requests</Link>
          </li>
        </ul>
      </Dropdown>
      <Link to="/users">Users</Link>
    </header>
  );
};

export default Header;
