import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../general.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nestedNavbarOuter">
        <div className="nestedNavbar">
          <Link
            className="nestedNavbarButton"
            onClick={() => {
              this.props.setData(
                process.env.REACT_APP_API_URL + "/request/allPending"
              );
            }}
            to={{ pathname: "/admin/requests/pending" }}
          >
            Pending
          </Link>
          <Link
            className="nestedNavbarButton"
            onClick={() => {
              this.props.setData(
                process.env.REACT_APP_API_URL + "/request/allApproved"
              );
            }}
            to={{ pathname: "/admin/requests/approved" }}
          >
            Approved
          </Link>
          <Link
            className="nestedNavbarButton"
            onClick={() => {
              this.props.setData(
                process.env.REACT_APP_API_URL + "/request/allDenied"
              );
            }}
            to={{ pathname: "/admin/requests/denied" }}
          >
            Denied
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
