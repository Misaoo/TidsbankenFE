import React from 'react';
import styles from '../../../css/Calendar.module.css';

const Mark = (props:any) => {
    return <span data-reqid={props.vacReq.requestId} className={styles.mark + " " + styles[props.type]}>user {props.vacReq.userId}</span>
}   

export default Mark;