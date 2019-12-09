import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import API from "../../api/API";
import vacationStyles from "../../css/profile/VacationComponent.module.css";
import { Link } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

/*************/
/* Displayes the: 
    1. vacation information for the userpage */
/*************/

const OverviewComponent = (props: any) => {
  const { user } = useContext(AuthContext);
  let [approvedVacationdays, setApprovedVacationsdays] = useState<any[]>([]); // handles the approved vacation days
  let [deniedVacationdays, setDeniedVacationsdays] = useState();              // handles the denied vacation days
  let [pendingVacationdays, setPendingVacationsdays] = useState(); 
  let [previousVacationdays, setPrevious] = useState<any[]>([]);          // handles the pending vacation days
  let [totalDeniedVacationRequests, setTotalDeniedVacationRequests] = useState();     // handles total denied vacation days



  const loggedIn =
    user &&
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("isAdmin") &&
    user.isAdmin === 0;
  const loggedInAdmin = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;
  const loggedInSuperUser = user && user.hasOwnProperty("isAdmin") && user.isAdmin === 2;

  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const anchorRef = React.useRef<HTMLButtonElement>(null);

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
        console.log(response)
        if(response.status === 200) {
          // addResponseDataToLi only accepts array input, thus convert single object to an array with single element
          let tempArr = []
          if(response.data.length > 0) {
            tempArr.push(response.data[response.data.length-1])
            setTotalDeniedVacationRequests(response.data.length)
          }
          addResponseDataToLi(tempArr, setDeniedVacationsdays)

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
        console.log(response)
        if(response.status === 200) {
          addResponseDataToLi(response.data, setApprovedVacationsdays);
          previousDate(response.data, setPrevious);
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
//separate dates from todays date
   function previousDate(response: any, where: any) {
    var now = new Date();
    var arr = []; // Is used for temporary storing for setting state after loop is done
    let i = 0; // Unique key for html elements
    for (let obj of response) {
      for (let date of obj.dates) {
        i++;
        console.log(date);
        let dateOnly = date.substring(0, date.indexOf("T"));
        if(now > new Date(date)){
          const liElement = (
              <Link key={i} to={{ pathname: "/requests/" + obj.requestId }}>
                <li>{dateOnly}</li>
              </Link>
          );
          arr.push(liElement);
          }
      }
      // separate requests in new lines instead of having all of them in one
      arr.push(<br key={++i}></br>)
    }
    where(arr);
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
      // separate requests in new lines instead of having all of them in one
      arr.push(<br key={++i}></br>)
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
            {totalDeniedVacationRequests > 0 && (
              <>
                <h2>Total denied vacation requests: {totalDeniedVacationRequests}</h2>
                <ul><b>Latest denied request:</b> {deniedVacationdays}</ul>
              </>
            )}
          </div>

          <div>
            <h1>Previous vacation days</h1>
            {/* Toggle button */}
            <Button className={vacationStyles.collapseButton}
              onClick={handleToggle}
            >
              <p>Show me</p>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <ul>{previousVacationdays}</ul>
            </Collapse>
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
