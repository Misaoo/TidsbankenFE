import React, { useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { Link } from 'react-router-dom';
import CalendarContext from './CalendarContext';
import RequestComponent from '../../requests/RequestsComponent';

const Mark = (props: any) => {
    
    const {setModalContent, setModal} = useContext(CalendarContext);

    const handleClick = (event: any) => {
        event.stopPropagation();
        setModalContent(<RequestComponent id={props.vacReq.requestId} />)
        setModal((b: any) => !b);
    }

    return (
        // <Link  to={"/requests/" + props.vacReq.requestId}>
        <span onClick={handleClick} className={styles.mark + " " + styles[props.type]} data-reqid={props.vacReq.requestId} >user {props.vacReq.userId}</span>
        // </Link>
    )
}

export default Mark;