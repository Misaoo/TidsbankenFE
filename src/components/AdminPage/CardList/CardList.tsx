import React, { useEffect } from "react";
import "../general.css";

const RequestCardList = (props: any) => {

	useEffect(() => {
		props.updateStyling(props.styling)
	    // eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [])

	return <React.Fragment>{props.content}</React.Fragment>
}
export default RequestCardList