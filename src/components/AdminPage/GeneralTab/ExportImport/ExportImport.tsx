import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./ExportImport.css";
import "../../general.css";

const ExportImport = (props: any) => {
  const [dataState, setDataState] = useState({
    outputData: "",
    showData: false,
    setData: false,
    inputData: "",
    showUpload: false,
    reallySure: false
  })

  const getData = () => {
    if(!dataState.showData) {
      axios(process.env.REACT_APP_API_URL + "/allData", {
        method: "GET",
        withCredentials: true
      })
      .then(res => {
        setDataState({
          ...dataState,
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
      setDataState({
        ...dataState,
        showData: false
      });
    }
  }

  const setData = () => {
    setDataState({
      ...dataState,
      showData: false,
      setData: !dataState.setData
    });
  }

  const handleChange = (event: any) => {
    setDataState({
      ...dataState,
      showUpload: true,
      inputData: event.target.files[0]
    });
  }

  const areYouReallySure = () => {
    alert(
      "WARNING! \n \n Are you sure you want to upload the selected data. " +
        "The old data will be erased and non recoverable."
    );

    setDataState({
      ...dataState,
      showUpload: false,
      reallySure: true
    });
  }

  const goBack = () => {
    setDataState({
      ...dataState,
      reallySure: false,
      setData: false
    })
  }

  const handleSubmit = (event: any) => {
    let reader = new FileReader();
    let dataBlob: any = dataState.inputData;
    reader.readAsBinaryString(dataBlob);
    reader.onloadend = function() {
      let readerResult: any = reader.result;
      axios(process.env.REACT_APP_API_URL + "/allData", {
        method: "POST",
        withCredentials: true,
        data: JSON.parse(readerResult)
      }).then(() => {
        alert("Database reloaded successfully");
      });
    };

    setDataState({
      ...dataState,
      reallySure: false
    });
    event.preventDefault();
  }

  const downloadAsJSON = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(dataState.outputData, undefined, 4)],
      {
        type: "application/json"
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Database.json";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div>
      <h1>Export / Import Data</h1>
      <Button
        variant="contained"
        color="primary"
        className="button"
        onClick={() => getData()}
      >
        get all data
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="button"
        onClick={() => setData()}
      >
        set data
      </Button>
      {dataState.showData && (
        <div className="exportParent">
          <br />
          <Button
            className="downloadButton"
            variant="contained"
            onClick={() => {
              downloadAsJSON();
            }}
          >
            Download as .json
          </Button>
          <TextField
            className="exportarea"
            value={JSON.stringify(dataState.outputData, undefined, 4)}
            variant="outlined"
            rows={35}
            multiline
            fullWidth
          />
        </div>
      )}
      {dataState.setData && (
        <div>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".json"
              onChange={handleChange}
            ></input>
            <br />
            <br />
            {dataState.showUpload && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => areYouReallySure()}
              >
                upload
              </Button>
            )}
            {dataState.reallySure && (
              <React.Fragment>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => goBack()}
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

export default ExportImport;