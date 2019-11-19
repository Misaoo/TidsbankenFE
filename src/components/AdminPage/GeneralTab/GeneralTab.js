import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const GeneralTab = props => {
  const [input, setInput] = useState({ maximumVacationDays: " " });
  const [data, setData] = useState({ maximumVacationDays: "unlimited" });

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
        console.log(data);
      });
    }
  };

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios(process.env.REACT_APP_API_URL + "/setting/maximumVacationDays", {
      method: "GET",
      withCredentials: true
    }).then(response => {
      setData(response.data);
    });
  }, []);
  //let address = props.address;
  return (
    <div>
      <h1>General</h1>
      <h3>Current maximum vacation days: {data.maximumVacationDays}</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="maximumVacationDays"
          variant="outlined"
          label="New Maximum"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          OK
        </Button>
      </form>
    </div>
  );
};

export default GeneralTab;
