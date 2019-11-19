import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Navbar = props => {
  //let address = props.address;

  return (
    <div>
      <Link to={{ pathname: "/admin/users/allUsers" }}>
        <Button onClick={() => props.updateUsers()} variant="contained">
          All users
        </Button>
      </Link>
      <Link to={{ pathname: "/admin/users/addUser" }}>
        <Button variant="contained">Add user</Button>
      </Link>
    </div>
  );
};

export default Navbar;
