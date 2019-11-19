import React, { Component } from "react";

class AddPicture extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    var reader = new FileReader();
    var setPicture = this.props.setPicture;
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = function() {
      setPicture(reader.result);
    };
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}></input>
        <div className="profilePic">
          <img src={this.props.imageState} />
        </div>
      </div>
    );
  }
}

export default AddPicture;
