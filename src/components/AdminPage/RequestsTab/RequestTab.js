import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import RequestNav from "./RequestNav/RequestNav";
import RequestCard from "./RequestCard/RequestCard";
import "../general.css";

class RequestTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.updateStyling({
      general: {},
      requests: { backgroundColor: "red" },
      users: {}
    });
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
        <Router>
          <RequestNav setData={this.getData.bind(this)} />
          <Switch>
            <Route
              path="/admin/requests/pending"
              render={() => (
                <div>
                  <div className="requestContent">{this.state.data}</div>
                </div>
              )}
            ></Route>
            <Route
              path="/admin/requests/approved"
              render={() => (
                <div>
                  <div className="requestContent">{this.state.data}</div>
                </div>
              )}
            ></Route>
            <Route
              path="/admin/requests/denied"
              render={() => (
                <div>
                  <div className="requestContent">{this.state.data}</div>
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
