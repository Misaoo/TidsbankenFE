import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../../general.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="nestedNavbar">
          <Link
            className="nestedNavbarButton"
            to={{ pathname: "/admin/users/allUsers" }}
            onClick={() => {
              this.props.updateUsers();
            }}
          >
            All users
          </Link>
          <Link
            className="nestedNavbarButton"
            to={{ pathname: "/admin/users/addUser" }}
          >
            Add user
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
