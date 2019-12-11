import React from "react";
import { Link } from "react-router-dom";
import "../../general.css";

const NavBar = (props: any) => {
    return (
      <div>
        <div className="nestedNavbar">
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/users/allUsers" }}
            style={props.style.allUsers}
            onClick={() => {
              props.updateUsers();
            }}
          >
            All users
          </Link>
          <Link
            className="navbarButton"
            to={{ pathname: "/admin/users/addUser" }}
            style={props.style.addUsers}
          >
            Add user
          </Link>
        </div>
      </div>
    )
}
export default NavBar;
