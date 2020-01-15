import React from "react";
import { Link } from "react-router-dom";
import "../../general.css";

const Navbar = (props: any) => {
    return (
        <div className="nestedNavbarOuter">
            <div className="nestedNavbar">
                <Link
                    className="navbarButton"
                    style={props.style.pending}
                    onClick={() => {props.setData(process.env.REACT_APP_API_URL + "/request/allPending")}}
                    to={{ pathname: "/admin/requests/pending" }}
                >
                    Pending
                </Link>
                <Link
                    className="navbarButton"
                    style={props.style.approved}
                    onClick={() => {props.setData(process.env.REACT_APP_API_URL + "/request/allApproved")}}
                    to={{ pathname: "/admin/requests/approved" }}
                >
                    Approved
                </Link>
                <Link
                    className="navbarButton"
                    style={props.style.denied}
                    onClick={() => {props.setData(process.env.REACT_APP_API_URL + "/request/allDenied")}}
                    to={{ pathname: "/admin/requests/denied" }}
                >
                    Denied
                </Link>
            </div>
        </div>
    )
}
export default Navbar