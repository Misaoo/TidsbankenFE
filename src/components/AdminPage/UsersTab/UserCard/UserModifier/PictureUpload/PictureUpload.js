import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./PictureUpload.css";

class PictureUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: this.props.profilePic,
      image: this.props.profilePic,
      showUpload: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      showUpload: true,
      imageData: event.target.files[0],
      image: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit(event) {
    var userId = this.props.userId;
    var updatefunc = this.props.updateList;
    var reader = new FileReader();
    reader.readAsDataURL(this.state.imageData);
    reader.onloadend = function() {
      var base64data = reader.result;
      axios(process.env.REACT_APP_API_URL + "/user/" + userId, {
        method: "PATCH",
        withCredentials: true,
        data: {
          profilePic: base64data
        }
      }).then(() => {
        updatefunc();
      });
    };
    this.setState({
      showUpload: false
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Change profile picture</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleChange}></input>
          <div className="profilePic">
            <img className="picture" src={this.state.image} alt="" />
          </div>

          {this.state.showUpload && (
            <Button variant="contained" type="submit" color="primary">
              Upload Picture
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default PictureUpload;
