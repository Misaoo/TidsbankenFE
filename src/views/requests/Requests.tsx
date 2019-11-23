import React from 'react';
import RequestsComponent from '../../components/requests/RequestsComponent';

const Requests = (props: any) => {
    return(
        <RequestsComponent id={props.computedMatch.params.id} />
    )
}

export default Requests;
