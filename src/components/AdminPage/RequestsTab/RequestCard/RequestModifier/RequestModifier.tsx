import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styles from "./RequestModifier.module.css";
import axios from "axios";
import CommentSection from "./CommentSection/CommentSection";
import styles2 from '../../../../../css/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestModifier = (props: any) => {
    let dateIndex = 0

    let [dates, setDates] = useState()
    let [pending, setPending] = useState(props.requestData.status === 0)
    let [verdict, setVerdict] = useState(0)
    let [myRequest, setMyRequest] = useState(true)

    function handleChangeVerdict(event: any) { setVerdict(event.target.value)}

    useEffect(() => {
        setDates(props.requestData.dates.map((date: any) => {
            return <li key={dateIndex++}>{new Date(date).toLocaleDateString("se")}</li>
        }))

        axios(process.env.REACT_APP_API_URL + "/authorize", {
            method: "POST",
            withCredentials: true,
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        })
        .then((res: any) => {
            setMyRequest(props.requestData.userId === res.data.userId)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, [])

    function handleSubmitVerdict(event: any) {
        event.preventDefault()
        axios(process.env.REACT_APP_API_URL + "/request/" + props.requestData.requestId,
            {
                method: "PATCH",
                withCredentials: true,
                data: {
                    status: verdict
                },
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }
        )
        .then(() => {
            let link = ""
            if (props.requestData.status === 0) 
                link = process.env.REACT_APP_API_URL + "/request/allPending"
            else if (props.requestData.status === 1) 
                link = process.env.REACT_APP_API_URL + "/request/allDenied"
            else 
                link = process.env.REACT_APP_API_URL + "/request/allApproved"
            
            props.updateList(link)
        })
    }

    function handleSubmitDelete(event: any) {
        event.preventDefault();
        axios(process.env.REACT_APP_API_URL + "/request/" + props.requestData.requestId,
            {
                method: "DELETE",
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }
        )
        .then(() => {
            let link = ""
            if (props.requestData.status === 0)
                link = process.env.REACT_APP_API_URL + "/request/allPending"
            else if (props.requestData.status === 1) 
                link = process.env.REACT_APP_API_URL + "/request/allDenied"
            else
                link = process.env.REACT_APP_API_URL + "/request/allApproved"

            props.updateList(link);
        })
        .catch((error: any) => {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/logout";
            }
        })
    }

    return (
        <div className={styles.module} onClick={() => { props.setDisplay() }}>

            <div className={styles.content} onClick={(event: any) => event.stopPropagation()}>
                <div className={styles2.header}>
                    <h2>Request {props.requestData.requestId}</h2>
                    <span className={styles2.closeButton} onClick={() => {props.setDisplay()}}><FontAwesomeIcon icon="times" /></span>
                </div>

                <div className={styles.twoColumns}>
                    <div>
                        <div className={styles.datesOverview}>
                            <h2>
                                {props.requesterName} {props.requesterLastName}
                            </h2>
                            <div><b className={props.requestData.type === "vacation" ? styles.normal : styles.parental}>Request type: {props.requestData.type} </b></div>
                            <ul>{dates}</ul>
                        </div>

                        {pending && !myRequest && (
                            <div className={styles.verdictForms}>
                                <form className={styles.verdictForm}>
                                    <div className={styles.radios}>
                                        <input
                                            type="radio"
                                            name="verdict"
                                            value="2"
                                            onChange={handleChangeVerdict}
                                            placeholder="Approve"
                                        ></input>
                                        <label className={styles.paddingRight}>Approve</label>
                                        <input
                                            type="radio"
                                            name="verdict"
                                            value="1"
                                            onChange={handleChangeVerdict}
                                            placeholder="Deny"
                                        ></input>
                                        <label>Deny</label>
                                    </div>
                                    <br></br>
                                    <div className={styles.twoColumnsButton}>
                                        <Button variant="contained" type="submit" color="primary" onClick={(e: any) => {handleSubmitVerdict(e); props.setDisplay()}}>
                                            Submit
                                        </Button>
                                        <div></div>
                                        <Button variant="contained" type="submit" color="secondary" onClick={(e: any) => {handleSubmitDelete(e); props.setDisplay()}}>
                                            Delete
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div>
                        <CommentSection requestId={props.requestData.requestId} />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default RequestModifier