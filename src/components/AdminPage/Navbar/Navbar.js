import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Navbar = props => {
  //let address = props.address;

  return (
    <div>
      <Link to={{ pathname: "/admin/general" }}>
        <Button variant="contained">General</Button>
      </Link>
      <Link to={{ pathname: "/admin/requests" }}>
        <Button variant="contained">Requests</Button>
      </Link>
      <Link to={{ pathname: "/admin/users" }}>
        <Button variant="contained">Users</Button>
      </Link>
    </div>
  );
};

export default Navbar;
