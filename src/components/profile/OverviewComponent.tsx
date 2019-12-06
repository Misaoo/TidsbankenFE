import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import API from "../../api/API";
import vacationStyles from "../../css/profile/VacationComponent.module.css";
import { Link } from "react-router-dom";

/*************/
/* Displayes the: 
    1. vacation information for the userpage */
/*************/

const OverviewComponent = (props: any) => {
  const { user } = useContext(AuthContext);
  let [approvedVacationdays, setApprovedVacationsdays] = useState<any[]>([]); // handles the approved vacation days
  let [deniedVacationdays, setDeniedVacationsdays] = useState();              // handles the denied vacation days
  let [pendingVacationdays, setPendingVacationsdays] = useState();            // handles the pending vacation days

  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;

  /* Runs first to get all information from server*/
  useEffect(() => {
    if (user && user.userId) {
      getFromServer(user!.userId!);
    }
  }, [user]);

  /* gets the vacation information from server */
  async function getFromServer(id: any) {
    try {
      let response1 = await API.vacationsApproved(id);
      let response2 = await API.vacationsDenied(id);
      let response3 = await API.vacationsPending(id);

      if (
        response1.status === 200 ||
        response2.status === 200 ||
        response3.status === 200
      ) {
        addResponseDataToLi(response1, setApprovedVacationsdays);
        addResponseDataToLi(response2, setDeniedVacationsdays);
        addResponseDataToLi(response3, setPendingVacationsdays);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 504) { }
      // If TwoFactorAuthentication
      if (error.response.status === 418) { }
    }
    // console.log(approvedVacationdays);
  }

  // Adds the information to html element. 
  function addResponseDataToLi(response: any, where: any) {
    var arr = []; // Is used for temporary storing for setting state after loop is done
    let i = 0; // Unique key for html elements
    for (let obj of response.data) {
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
    <>
      {(loggedIn || loggedInAdmin) && (
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
            <ul>{deniedVacationdays}</ul>
          </div>
        </div>
      )}
      {loggedInSuperUser && (
          <>
            <p>Make this part of the page awesome</p>
          </>
        )
      }
    </>
  );
};

export default OverviewComponent;
