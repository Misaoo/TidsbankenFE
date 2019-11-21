import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../general.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navBarOuter">
        <div className="navbar">
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/general" }}
            onClick={() => {}}
          >
            General
          </Link>
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/requests" }}
            onClick={() => {}}
          >
            Requests
          </Link>
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/users" }}
            onClick={() => {}}
          >
            Users
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
