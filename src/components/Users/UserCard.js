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
          
      
            
           {this.props.vacation === 'no' && 
           <div className="userCardGreen">
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
                  <br />
                </div>
           </div>
          
           }  
              { this.props.vacation === 'yes' && 
              <div className="userCardRed">
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
              </div>
            </div>
            }                
        </Link>
      </React.Fragment>
    );
  }
}
export default UserCard;
