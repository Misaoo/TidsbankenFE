import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };
  }
  render() {
    return (
      <React.Fragment>
        <Link to={{ pathname: "/user/" + this.props.user.userId }}>
          <div className="userCard">
            <div className="imgContainer">
              <img
                className="userImg"
                src={this.props.user.profilePic}
                alt=""
              ></img>
            </div>
            <div className="nameContainer">
              <b>
                {this.props.user.name} {this.props.user.lastName}
              </b> <br />
              {this.props.user.isAdmin == 0 && <span><b>On vacation: </b> {this.props.vacation}</span>
              }
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
export default UserCard;
