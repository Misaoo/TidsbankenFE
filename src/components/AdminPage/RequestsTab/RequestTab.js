import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RequestNav from "./RequestNav/RequestNav";
import RequestCard from "./RequestCard/RequestCard";
import "../general.css";
import CardList from "../CardList/CardList";

class RequestTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      style: {
        general: {},
        requests: {},
        users: {}
      }
    };
  }
  componentDidMount() {
    this.props.updateStyling({
      general: {},
      requests: { backgroundColor: "#3D8ABB" },
      users: {}
    });
    this.getData(process.env.REACT_APP_API_URL + "/request/allPending");
  }
  getData(link) {
    let requests = [];
    axios(link, {
      method: "GET",
      withCredentials: true
    })
      .then(res => {
        res.data.map(req => {
          return requests.push(
            <RequestCard
              key={req.requestId}
              request={req}
              updateData={this.getData.bind(this)}
            />
          );
        });
        this.setState({
          data: requests
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
  }
  updateStyling(style) {
    this.setState({
      style: style
    });
  }

  render() {
    return (
      <div>
        <Router>
          <RequestNav
            setData={this.getData.bind(this)}
            style={this.state.style}
          />
          <Switch>
            <Route
              path="/admin/requests/pending"
              render={() => (
                <div className="requestContent">
                  <CardList
                    key="pending"
                    content={this.state.data}
                    styling={{
                      pending: { backgroundColor: "#3D8ABB" },
                      approved: {},
                      denied: {}
                    }}
                    updateStyling={this.updateStyling.bind(this)}
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
                    content={this.state.data}
                    styling={{
                      pending: {},
                      approved: { backgroundColor: "#3D8ABB" },
                      denied: {}
                    }}
                    updateStyling={this.updateStyling.bind(this)}
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
                    content={this.state.data}
                    styling={{
                      pending: {},
                      approved: {},
                      denied: { backgroundColor: "#3D8ABB" }
                    }}
                    updateStyling={this.updateStyling.bind(this)}
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
    );
  }
}

export default RequestTab;
