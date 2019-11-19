import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Navbar = props => {
  //let address = props.address;

  return (
    <div>
      <Link
        to={{ pathname: "/admin/requests/pending" }}
        onClick={() =>
          props.setData(process.env.REACT_APP_API_URL + "/request/allPending")
        }
      >
        <Button variant="contained">Pending</Button>
      </Link>
      <Link
        to={{ pathname: "/admin/requests/approved" }}
        onClick={() =>
          props.setData(process.env.REACT_APP_API_URL + "/request/allApproved")
        }
      >
        <Button variant="contained">Approved</Button>
      </Link>
      <Link
        to={{ pathname: "/admin/requests/denied" }}
        onClick={() =>
          props.setData(process.env.REACT_APP_API_URL + "/request/allDenied")
        }
      >
        <Button variant="contained">Denied</Button>
      </Link>
    </div>
  );
};

export default Navbar;
