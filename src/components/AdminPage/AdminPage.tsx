import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import RequestTab from "./RequestsTab/RequestTab";
import GeneralTab from "./GeneralTab/GeneralTab"; 
import UsersTab from "./UsersTab/UsersTab";
import "./general.css";

const AdminPage = (props: any) => {
    let [style, setStyle] = useState({
        general: {},
        requests: {},
        users: {}
    })

    return (
        <div className="adminPage">
            <Router>
                <h1 className="indent">Admin Page</h1>
                <Navbar style={style} />
                <Switch>
                    <Route
                        path="/admin/requests"
                        render={(props: any) => {
                            return (
                                <RequestTab
                                    {...props}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            )
                        }}
                    ></Route>
                    <Route
                        path="/admin/users"
                        render={(props: any) => {
                            return (
                                <UsersTab
                                    {...props}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            )
                        }}
                    ></Route>
                    <Route
                        path="/admin/general"
                        render={(props: any) => {
                            return (
                                <GeneralTab
                                    {...props}
                                    updateStyling={(e: any) => setStyle(e)}
                                />
                            )
                        }}
                    ></Route>

                    <Redirect exact from="/admin" to="/admin/users" />
                </Switch>
            </Router>
        </div>
    )
}
export default AdminPage