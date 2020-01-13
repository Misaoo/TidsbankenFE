import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestModifier from "./RequestModifier/RequestModifier";
import "../../general.css";

const RequestCard = (props: any) => {
    let keyVal = 0

    let [showPopup, setShowPopup] = useState(false)
    let [firstame, setFirstame] = useState("")
    let [lastname, setLastname] = useState("")
    let [dates, setDates] = useState(props.request.dates.map((date: any) => {
            return ( <li key={keyVal++}>{new Date(date).toLocaleDateString("se")}</li> )
        }))

    useEffect(() => {
        axios(process.env.REACT_APP_API_URL + "/user/" + props.request.userId,
            {
                method: "GET",
                withCredentials: true
            },
            headers: {
                Authorization: localStorage.getItem('jwt')
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
            <div className="cardContent" onClick={() => {setShowPopup(!showPopup)}}>
                <br/>
                <b>Start date:</b> <ul>{dates[0]}</ul>
                <b>End date:</b> <ul>{dates[dates.length - 1]}</ul>
                <br/>
                <b>Employee:</b> {firstame} {lastname}
            </div>
        </div>
    )
}
export default RequestCard