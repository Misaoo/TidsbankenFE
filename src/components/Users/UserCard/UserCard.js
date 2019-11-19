import React, { Component } from "react";
import "../Users.css";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };
  }
  gotoUserpage() {
    console.log("go to users page");
    console.log(this.props.user);
  }
  render() {
    return (
      <React.Fragment>
        <div
          className="userCard"
          onClick={() => {
            this.gotoUserpage();
          }}
        >
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
            </b>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UserCard;
