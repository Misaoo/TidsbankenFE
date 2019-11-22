import React from 'react';
import RequestsComponent from '../../components/requests/RequestsComponent';

import { useParams } from 'react-router-dom';

const Requests = () => {
    const { id } = useParams();
    return(
        <RequestsComponent id={id} />
    )
}

export default Requests;
