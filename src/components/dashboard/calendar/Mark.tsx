import React, { useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import CalendarContext from './CalendarContext';
import RequestComponent from '../../requests/RequestsComponent';

/*
    A Mark is representing a vacation request and can have a different color (css class) base on the mark type (approved, denied, pending).
*/

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