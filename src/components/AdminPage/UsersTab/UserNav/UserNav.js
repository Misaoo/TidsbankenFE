import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            className="navbarButton"
            to={{ pathname: "/admin/users/allUsers" }}
            style={this.props.style.allUsers}
            onClick={() => {
              this.props.updateUsers();
            }}
          >
            All users
          </Link>
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/users/addUser" }}
            style={this.props.style.addUsers}
          >
            Add user
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
