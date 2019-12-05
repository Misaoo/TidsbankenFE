import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../components/auth/AuthContext";
import API from "../../api/API";
import vacationStyles from "../../css/profile/VacationComponent.module.css";
import { Link } from "react-router-dom";

/*************/
/* Displayes the: 
    1. vacation information for the userpage */
/*************/

const VacationComponent = (props: any) => {
  const { user } = useContext(AuthContext);
  let [approvedVacationdays, setApprovedVacationsdays] = useState<any[]>([]); // handles the approved vacation days
  let [deniedVacationdays, setDeniedVacationsdays] = useState();              // handles the denied vacation days
  let [pendingVacationdays, setPendingVacationsdays] = useState();            // handles the pending vacation days

  let [totalDeniedVacationRequests, setTotalDeniedVacationRequests] = useState();     // handles total denied vacation days

  /* Runs first to get all information from server*/
  useEffect(() => {
    if (user && user.userId) {
      getFromServer(user!.userId!);
    }
  }, [user]);

  /* gets the vacation information from server */
  async function getFromServer(id: any) {

    await API.vacationsDenied(id)
      .then((response: any) => {
        if(response.status === 200) {
          // addResponseDataToLi only accepts array input, thus convert single object to an array with single element
          let tempArr = []
          tempArr.push(response.data[response.data.length-1])

          addResponseDataToLi(tempArr, setDeniedVacationsdays)
          setTotalDeniedVacationRequests(response.data.length)
        }
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          //error message
        }
        else if (error.response.status === 418) {
          //error message
        }
        else if (error.response.status === 504) {
          //error message
        }
      })

    await API.vacationsApproved(id)
      .then((response: any) => {
        if(response.status === 200) {
          addResponseDataToLi(response.data, setApprovedVacationsdays)
        }
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          //error message
        }
        else if (error.response.status === 418) {
          //error message
        }
        else if (error.response.status === 504) {
          //error message
        }
      })

    await API.vacationsPending(id)
      .then((response: any) => {
        if(response.status === 200) {
          addResponseDataToLi(response.data, setPendingVacationsdays)
        }
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          //error message
        }
        else if (error.response.status === 418) {
          //error message
        }
        else if (error.response.status === 504) {
          //error message
        }
      })
  }

  // Adds the information to html element. 
  function addResponseDataToLi(response: any, where: any) {
    var arr = []; // Is used for temporary storing for setting state after loop is done
    let i = 0; // Unique key for html elements
    for (let obj of response) {
      for (let date of obj.dates) {
        i++;
        let dateOnly = date.substring(0, date.indexOf("T"));
        const liElement = (
          <Link key={i} to={{ pathname: "/requests/" + obj.requestId }}>
            <li>{dateOnly}</li>
          </Link>
        );
        arr.push(liElement);
      }
    }
    where(arr);
  }

  /**********************/
  /* HTML */
  /**********************/

  return (
    <div className={vacationStyles.wrapper}>
      <div>
        <h1>Pending vacation requests</h1>
        <ul>{pendingVacationdays}</ul>
      </div>

      <div>
        <h1>Upcoming vacation days</h1>
        <ul>{approvedVacationdays}</ul>
      </div>

      <div>
        <h1>Denied vacation days</h1>
        <h2>Total denied vacation requests: {totalDeniedVacationRequests}</h2>
        <ul><b>Latest denied request:</b> {deniedVacationdays}</ul>
      </div>
    </div>
  );
};

export default VacationComponent;
