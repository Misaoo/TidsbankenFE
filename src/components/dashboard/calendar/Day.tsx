import React, { useState } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, isToday, addDays, isWeekend } from 'date-fns';
import utils from './calendarUtils';


const Day = (props: any) => {

    const [selected, setSelected] = useState(false);
    
    const ineligibleDays = [new Date(), addDays(new Date(), 1), addDays(new Date(), 2), addDays(new Date(), 3)];
    
    const select = (event: any) => {
        return ( !props.empty && !utils.isIneligible(props.date, ineligibleDays) ? setSelected(!selected) : null);
    }

    const styleInelegible = utils.isIneligible(props.date, ineligibleDays) ? styles.ineligible : "";
    const styleToday = isToday(props.date) ? styles.today : "";
    const styleEmpty = props.empty ? styles.empty : "";
    const styleSelect = selected ? styles.daySelect : "";
    const styleWeekend = isWeekend(props.date) ? styles.weekend : "";

    let classNames = [
        styles.day, 
        props.className, 
        styleEmpty, 
        styleSelect, 
        styleToday, 
        styleInelegible,
    ].join(" ");

    return <div onClick={select} className={classNames} title={props.date ? format(props.date, 'yyyy-MM-dd'): ''}>

        {!props.empty && <>
            <span className={styles.dayBase}><span>{props.date ? format(props.date, 'd') : ''}</span></span>
            <span className={styles.mark}>Andreas A.</span>
            <span className={styles.mark}>Alexandra B.</span>
            <span className={styles.mark}>Elliot C.</span>
            <span className={styles.mark}>Andreas A.</span>
            <span className={styles.mark}>Alexandra B.</span>
            <span className={styles.mark}>Elliot C.</span>
            <span className={styles.mark}>Andreas A.</span>
            <span className={styles.mark}>Alexandra B.</span>
            <span className={styles.mark}>Elliot C.</span>
        </>}
        {styleWeekend ? <span className={styleWeekend}></span> : null}
        {/* {styleToday ? <span className={styleToday}></span> : null} */}
    </div>
}

export default Day;