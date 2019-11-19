import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RequestNav from "./RequestNav/RequestNav";
import RequestCard from "./RequestCard/RequestCard";

class RequestTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getData(process.env.REACT_APP_API_URL + "/request/allPending");
  }
  getData(link) {
    let requests = [];
    axios(link, {
      method: "GET",
      withCredentials: true
    }).then(res => {
      res.data.map(req => {
        requests.push(
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
    });
  }
  render() {
    return (
      <div>
        <h1>Requests</h1>
        <Router>
          <RequestNav setData={this.getData.bind(this)} />
          <Switch>
            <Route
              path="/admin/requests/pending"
              render={() => (
                <div>
                  <h1>Pending Requests</h1>
                  {this.state.data}
                </div>
              )}
            ></Route>
            <Route
              path="/admin/requests/approved"
              render={() => (
                <div>
                  <h1>Approved Requests</h1>
                  {this.state.data}
                </div>
              )}
            ></Route>
            <Route
              path="/admin/requests/denied"
              render={() => (
                <div>
                  <h1>Denied Requests</h1>
                  {this.state.data}
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
