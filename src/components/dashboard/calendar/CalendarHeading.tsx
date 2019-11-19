import React, { useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarContext from './CalendarContext';
import { daysBetween } from './calendarUtils';

const CalendarHeading = (props: any) => {

    let { selectedRange } = useContext(CalendarContext);
    let daysSelected: number = selectedRange.start && selectedRange.end && daysBetween(selectedRange.start, selectedRange.end);

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
                <h2>{format(props.selectedDate, 'MMMM yyyy')}</h2>
                <span>
                    {selectedRange.start && format(selectedRange.start, 'do MMM') + " - "}
                    {selectedRange.end && format(selectedRange.end, 'do MMM')}
                    {daysSelected && ` (${daysSelected} ${"day" + (daysSelected > 1 ? 's' : '')})`}
                </span>

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