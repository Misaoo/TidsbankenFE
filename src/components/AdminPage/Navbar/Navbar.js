<<<<<<< HEAD
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../general.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navBarOuter">
        <div className="navbar">
          <Link
            className="navbarButton"
            style={this.props.style.general}
            to={{ pathname: "/admin/general" }}
          >
            General
          </Link>
          <Link
            className="navbarButton"
            style={this.props.style.requests}
            to={{ pathname: "/admin/requests" }}
          >
            Requests
          </Link>
          <Link
            className="navbarButton"
            style={this.props.style.users}
            to={{ pathname: "/admin/users" }}
          >
            Users
          </Link>
        </div>
      </div>
    );
  }
=======
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import "../general.css";

const Navbar = (props) => {
  const { user } = useContext(AuthContext);
  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  return (
    <div className="navBarOuter">
      <div className="navbar">
        <Link
          className="navbarButton"
          style={props.style.general}
          to={{ pathname: "/admin/general" }}
        >
          General
        </Link>
        {(loggedIn || loggedInAdmin) && (
          <>
            <Link
              className="navbarButton"
              style={props.style.requests}
              to={{ pathname: "/admin/requests" }}
            >
              Requests
            </Link>
          </>
        )}
        <Link
          className="navbarButton"
          style={props.style.users}
          to={{ pathname: "/admin/users" }}
        >
          Users
        </Link>
      </div>
    </div>
  )
>>>>>>> 1546fe8dc6a1347c76b397e36539b1b8257ea998
}

export default Navbar;
