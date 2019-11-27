import React, { useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { Link } from 'react-router-dom';
import CalendarContext from './CalendarContext';
import RequestComponent from '../../requests/RequestsComponent';

const Mark = (props: any) => {
    
    const {setModalContent, setModal, setModalTitle, userNames} = useContext(CalendarContext);

    const handleClick = (event: any) => {
        event.stopPropagation();
        setModalContent(<RequestComponent id={props.vacReq.requestId} />)
        setModalTitle("Request Details");
        setModal((b: any) => !b);
    }

    return (
        <span onClick={handleClick} className={styles.mark + " " + styles[props.type]} data-reqid={props.vacReq.requestId} >{userNames[props.vacReq.userId]}</span>
    )
}

export default Mark;