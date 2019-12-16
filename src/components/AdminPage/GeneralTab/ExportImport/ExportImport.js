import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./ExportImport.css";
import "../../general.css";

class ExportImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputData: "",
      showData: false,
      setData: false,
      inputData: "",
      showUpload: false,
      reallySure: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getData() {
    if (!this.state.showData) {
      axios(process.env.REACT_APP_API_URL + "/allData", {
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          this.setState({
            outputData: res.data,
            showData: true,
            setData: false
          });
        })
        .catch(error => {
          if (error.status === 401 || error.status === 403) {
            window.location.href = "/logout";
          }
        });
    } else {
      this.setState({
        showData: false
      });
    }
  }
  setData() {
    this.setState({
      showData: false,
      setData: !this.state.setData
    });
  }
  handleChange(event) {
    this.setState({
      showUpload: true,
      inputData: event.target.files[0]
    });
  }

  areYouReallySure() {
    alert(
      "WARNING! \n \n Are you sure you want to upload the selected data. " +
        "The old data will be erased and non recoverable."
    );
    this.setState({
      showUpload: false,
      reallySure: true
    });
  }

  goBack() {
    this.setState({
      reallySure: false,
      setData: false
    });
  }

  handleSubmit(event) {
    var reader = new FileReader();
    reader.readAsBinaryString(this.state.inputData);
    reader.onloadend = function() {
      axios(process.env.REACT_APP_API_URL + "/allData", {
        method: "POST",
        withCredentials: true,
        data: JSON.parse(reader.result)
      }).then(() => {
        alert("Database reloaded successfully");
      });
    };
    this.setState({
      reallySure: false
    });
    event.preventDefault();
  }

  downloadAsJSON() {
    console.log("download as JSON");
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(this.state.outputData, undefined, 4)],
      {
        type: "application/json"
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Database.json";
    document.body.appendChild(element);
    element.click();
  }

  render() {
    return (
      <div>
        <h1>Export / Import Data</h1>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => this.getData()}
        >
          get all data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => this.setData()}
        >
          set data
        </Button>
        {this.state.showData && (
          <div className="exportParent">
            <br />
            <Button
              className="downloadButton"
              variant="contained"
              onClick={() => {
                this.downloadAsJSON();
              }}
            >
              Download as .json
            </Button>
            <TextField
              className="exportarea"
              value={JSON.stringify(this.state.outputData, undefined, 4)}
              variant="outlined"
              rows={35}
              readOnly
              multiline
              fullWidth
            />
          </div>
        )}
        {this.state.setData && (
          <div>
            <br />
            <form onSubmit={this.handleSubmit}>
              <input
                type="file"
                accept=".json"
                onChange={this.handleChange}
              ></input>
              <br />
              <br />
              {this.state.showUpload && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.areYouReallySure()}
                >
                  upload
                </Button>
              )}
              {this.state.reallySure && (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.goBack()}
                  >
                    go back
                  </Button>
                  <Button type="submit" variant="contained" color="secondary">
                    Submit
                  </Button>
                </React.Fragment>
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default ExportImport;