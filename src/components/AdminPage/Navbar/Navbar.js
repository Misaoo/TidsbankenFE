import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import "../general.css";

class Navbar extends Component {
  render() {
      return (
          <div className="navBarOuter">
            <div className="navbar">
              {(this.loggedIn || this.loggedInAdmin) && (
                <>
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
                </>
              )}
              <Link
                className="navbarButton"
                style={this.props.style.users}
                to={{ pathname: "/admin/users" }}
              >
                Users
              </Link>
            </div>
          </div>
      )
  }
}

export default Navbar;
