import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExportImport from "./ExportImport/ExportImport";

const GeneralTab = props => {
  const {user} = useContext(AuthContext);
  const [input, setInput] = useState({ maximumVacationDays: " " });
  const [data, setData] = useState({ maximumVacationDays: "unlimited" });
  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;

  const setMaximumVacationDays = () => {
    const { maximumVacationDays } = input;
    return axios(
      process.env.REACT_APP_API_URL + "/setting/maximumVacationDays",
      {
        method: "PATCH",
        withCredentials: true,
        data: { maximumVacationDays }
      }
    );
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (input.maximumVacationDays === " " || input.maximumVacationDays === "") {
      alert("Input required");
    } else if (!isFinite(Number(input.maximumVacationDays))) {
      alert("Wrong input type");
    } else {
      setMaximumVacationDays().then(data => {
        setData(data.data);
      });
    }
  };

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    props.updateStyling({
      general: { backgroundColor: "#3D8ABB" },
      requests: {},
      users: {}
    });
    axios(process.env.REACT_APP_API_URL + "/setting/maximumVacationDays", {
      method: "GET",
      withCredentials: true
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/logout";
        }
      });
  }, []);
  //let address = props.address;
  return (
    <>
      {(loggedIn || loggedInAdmin) && (
        <div className="padding generalTab">
          <h1>General site settings</h1>
          <p>
            Here you can set the maximum vacations days that a user is allowed to
            request. And also export / import the vacation data if needed.
          </p>
          <div>
            <h3>Maximum vacation days: {data.maximumVacationDays}</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                name="maximumVacationDays"
                variant="outlined"
                label="New max vacation days"
                onChange={handleChange}
              />
              <Button className="buttonSize" variant="contained" type="submit" color="primar">
                Set
              </Button>
            </form>
          </div>
          <ExportImport />
        </div>
      )}
      {loggedInSuperUser && (
        <div className="padding generalTab">
          <h1>User statistics</h1>
          <p>
            Put statistical user data here.
          </p>
        </div>
      )}
    </>
  );
};

export default GeneralTab;