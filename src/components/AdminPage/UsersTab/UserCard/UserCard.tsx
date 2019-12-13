import React, { useState } from "react";
import UserModifier from "./UserModifier/UserModifier";
import "../../general.css";

const UserCard = (props: any) => {
  let [showPopup, setShowPopUp] = useState(false)

  return (
    <div className="cardBody">
      {showPopup && (
        <UserModifier
          user={props.user}
          setDisplay={setShowPopUp}
          updateList={(e: any) => props.updateUsers(e)}
        />
      )}
      <div
        className="userCardContent"
        onClick={() => {
          setShowPopUp(true)
        }}
      >
        <div className="userCardImage">
          <img src={props.user.profilePic} alt="" />
        </div>
        <div className="userCardDescription">
          <b>Name:</b> {props.user.name} {props.user.lastName}{" "}
          {props.user.isAdmin === 1 && <b>(Admin)</b>}
          <br />
          <b>Email:</b> {props.user.email}
          <br />
          <b>Region:</b> {props.user.region}
          <br />
        </div>
      </div>
    </div>
  )
}
export default UserCard;