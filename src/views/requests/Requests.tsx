//Library imports
import React from 'react';

//Component imports
import RequestsComponent from '../../components/requests/RequestsComponent';

//Style imports
import styles from '../../css/Request.module.css';

//Requests-hook
const Requests = (props: any) => {
    return(
        <div className={styles.view}>
            <RequestsComponent id={props.computedMatch.params.id} />
        </div>
    )
}

//Hook export
export default Requests;
