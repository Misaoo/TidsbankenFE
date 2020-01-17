import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestModifier from "./RequestModifier/RequestModifier";
import "../../general.css";

const RequestCard = (props: any) => {
    let [showPopup, setShowPopup] = useState(false)
    let [firstame, setFirstame] = useState("")
    let [lastname, setLastname] = useState("")
    let [dates] = useState(props.request.dates.map((date: any) => {
            return ( new Date(date).toLocaleDateString("se") )
        }))

    useEffect(() => {
        axios(process.env.REACT_APP_API_URL + "/user/" + props.request.userId,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }
        )
        .then((res: any) => {
            setFirstame(res.data.name)
            setLastname(res.data.lastname)
        })
        .catch((error: any) => {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/logout"
            }
        })

    }, [])

    return (
        <div className="cardBody">
            {showPopup && (
                <RequestModifier
                    requesterName={firstame}
                    requesterLastName={lastname}
                    requestData={props.request}
                    setDisplay={() => {setShowPopup(!showPopup)}}
                    updateList={(e: any) => {props.updateData(e)}}
                />
            )}
            <div className={["cardContent", props.request.type === "vacation" ? "normal" : "parental"].join(" ")} onClick={() => {setShowPopup(!showPopup)}}>
                <b>Start date:</b> {dates[0]}
                <br/><br/>
                <b>End date:</b> {dates[dates.length - 1]}
                <br/><br/>
                <b>Request type:</b> {props.request.type}
                <br/><br/>
                <b>Employee:</b> {firstame} {lastname}
            </div>
        </div>
    )
}
export default RequestCard