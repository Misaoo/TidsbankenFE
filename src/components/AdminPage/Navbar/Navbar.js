import React, { Component } from "react";
import { Link } from "react-router-dom";
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
}

export default Navbar;
