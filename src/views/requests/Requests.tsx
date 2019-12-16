import React from 'react';
import RequestsComponent from '../../components/requests/RequestsComponent';
import styles from '../../css/Request.module.css';

const Requests = (props: any) => {
    return(
        <div className={styles.view}>
            <RequestsComponent id={props.computedMatch.params.id} isCalendar={false}/>
        </div>
    )
}

export default Requests;
