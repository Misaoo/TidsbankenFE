import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RequestNav from "./RequestNav/RequestNav";
import RequestCard from "./RequestCard/RequestCard";
import "../general.css";
import CardList from "../CardList/CardList";

const RequestTab = (props: any) => {
    let [data, setData] = useState([])
    let [style, setStyle] = useState({
        general: {},
        requests: {},
        users: {}
    })

    useEffect(() => {
        props.updateStyling({
            general: {},
            requests: { backgroundColor: "#3D8ABB" },
            users: {}
        })

        getData(process.env.REACT_APP_API_URL + "/request/allPending")

        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, [])

    function getData(link: any) {
        let requests: any = []
        axios(link, {
            method: "GET",
            withCredentials: true,
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
            })
        .then((res: any) => {
            res.data.map((req: any) => {
                return requests.push(
                    <RequestCard
                        key={req.requestId}
                        request={req}
                        updateData={(e: any) => getData(e)}
                    />
                )
            })
            setData(requests)
        })
        .catch((error: any) => {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/logout";
            }
        })
    }

    return (
        <div>
            <Router>
                <RequestNav setData={(e: any) => getData(e)} style={style}/>

                <Switch>
                    <Route
                        path="/admin/requests/pending"
                        render={() => (
                            <div className="requestContent">
                                <CardList
                                    key="pending"
                                    content={data}
                                    styling={{
                                        pending: { backgroundColor: "#3D8ABB" },
                                        approved: {},
                                        denied: {}
                                    }}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            </div>
                        )}
                    ></Route>
                    <Route
                        path="/admin/requests/approved"
                        render={() => (
                            <div className="requestContent">
                                <CardList
                                    key="approved"
                                    content={data}
                                    styling={{
                                        pending: {},
                                        approved: { backgroundColor: "#3D8ABB" },
                                        denied: {}
                                    }}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            </div>
                        )}
                    ></Route>
                    <Route           
                        path="/admin/requests/denied"
                        render={() => (
                            <div className="requestContent">
                                <CardList
                                    key="denied"
                                    content={data}
                                    styling={{
                                        pending: {},
                                        approved: {},
                                        denied: { backgroundColor: "#3D8ABB" }
                                    }}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            </div>
                        )}
                    ></Route>
                    <Redirect
                        exact
                        from="/admin/requests"
                        to="/admin/requests/pending"
                    />
                </Switch>
            </Router>
        </div>
    )
}
export default RequestTab