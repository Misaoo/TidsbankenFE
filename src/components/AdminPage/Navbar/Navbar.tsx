import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import "../general.css";

const Navbar = (props: any) => {
  const { user } = useContext(AuthContext);
  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") 
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  return (
    <div className="navBarOuter">
      <div className="navbar">
      <Link
          className="navbarButton"
          style={props.style.users}
          to={{ pathname: "/admin/users" }}
        >
          Users
        </Link>
        {( loggedInAdmin) && (
          <>
            <Link
              className="navbarButton"
              style={props.style.requests}
              to={{ pathname: "/admin/requests" }}
            >
              Requests
            </Link>
            <Link
          className="navbarButton"
          style={props.style.general}
          to={{ pathname: "/admin/general" }}
        >
          General
        </Link>
          </>
        )}
      
      </div>
    </div>
  )
}

export default Navbar;
