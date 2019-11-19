import React, { useState, useEffect } from 'react';
import styles from '../../../css/Calendar.module.css';
import CalendarHeading from './CalendarHeading';
import CalendarDisplay from './CalendarDisplay';
import CalendarContext from './CalendarContext';

import { 
    addMonths,
    subMonths,
} from 'date-fns';


const Calendar = (props: any) => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const increaseMonth = () => {console.log("Increasemonth");setSelectedDate(addMonths(selectedDate, 1))};
    const decreaseMonth = () => {console.log("Decreasemonth");setSelectedDate(subMonths(selectedDate, 1))};
    const gotoToday = () => {setSelectedDate(new Date())};

    useEffect(() => {
        setCurrentDate(new Date()); 
    }, []);

    return (
        <CalendarContext.Provider value={{}}>
        <div className={styles.module}>
            <CalendarHeading
                onPrev={decreaseMonth}
                onNext={increaseMonth} 
                onToday={gotoToday}
                currentDate={currentDate}
                selectedDate={selectedDate}
            />
            <CalendarDisplay 
                month={selectedDate} 
                className={styles.calendarA}
            />
            <CalendarDisplay 
                month={addMonths(selectedDate, 1)} 
                className={styles.calendarB} 
            />
        </div>
        </CalendarContext.Provider>
    );
}

export default Calendar;