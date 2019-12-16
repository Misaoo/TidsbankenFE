//Library imports
import React, { useEffect } from "react";

//Style imports
import "../general.css";

//RequestCardList-hook
const RequestCardList = (props: any) => {
  useEffect(() => {
    props.updateStyling(props.styling);
  }, []);

  return (
    <>
      {props.content}
    </>
  )
}

export default RequestCardList;
