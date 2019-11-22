import React, { Component } from "react";

class AddPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicture: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    var reader = new FileReader();
    var setPicture = this.props.setPicture;
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = function() {
      setPicture(reader.result);
    };
    this.setState({
      showPicture: true
    });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={this.handleChange}
          accept=".jpg, .png, .jpeg"
        ></input>
        {this.state.showPicture && (
          <div className="profilePic">
            <img className="picture" src={this.props.imageState} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default AddPicture;
