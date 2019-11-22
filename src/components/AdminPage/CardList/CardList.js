import React, { Component } from "react";
import "../general.css";

class RequestCardList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.updateStyling(this.props.styling);
  }
  render() {
    return <React.Fragment>{this.props.content}</React.Fragment>;
  }
}

export default RequestCardList;
