import React from 'react';
import styles from '../../../css/Calendar.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../../common/dropdown/Dropdown';
import commonStyles from '../../../css/Common.module.css';


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

                {/* <h2 className={styles.currentYearMonth}>{format(props.selectedDate, 'MMMM yyyy')}</h2> */}
                <div className={styles.monthDropdown}>
                    <Dropdown title={format(props.selectedDate, 'MMMM yyyy')}>
                        <ul className={commonStyles.dropdown}>
                            <li>This is my link..</li>
                            <li>This is my link..</li>
                        </ul>
                    </Dropdown>
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