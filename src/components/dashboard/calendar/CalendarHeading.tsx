import React, { useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/*
    The CalendarHeading is concerned with the navigation of the calendar. 
    It retrieves props for some functionality and it uses context for some other functionality.
*/

const CalendarHeading = (props: any) => {
    return (
        <div className={styles.calendarHeading}>
            <button
                className={styles.prevBtn}
                onClick={() => props.onPrev()}
                title="Show previous month"
            >
                <FontAwesomeIcon icon="caret-left" />
            </button>
            <div className={styles.currentYearMonth}>
                <h2>{format(props.selectedDate, 'MMMM')} - {format(addMonths(props.selectedDate, 1), 'MMMM yyyy')}</h2>
            </div>

            <button className={styles.todayBtn} onClick={() => props.onToday()} title="Go to the current month">Today</button>

            <button
                className={styles.nextBtn}
                onClick={() => props.onNext()}
                title="Show next month"
            >
                <FontAwesomeIcon icon="caret-right" />
            </button>
        </div>
    )
}

export default CalendarHeading;