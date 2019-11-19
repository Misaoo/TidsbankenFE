import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../css/Calendar.module.css';
import { eachDayOfInterval, startOfMonth, endOfMonth, getDay, isFirstDayOfMonth, isSameDay } from 'date-fns';
import Day from './Day';
import { format, isDate } from 'date-fns';
import CalendarContext from './CalendarContext';
import { isDateBetween } from './calendarUtils';

const CalendarDisplay = (props: any) => {

    const { selectedRange } = useContext(CalendarContext);
    const [lastSelectedDay, setLastSelectedDay] = useState<Date>();

    // useEffect(() => {
    //     if ()
    // }, [selectedRange])

    useEffect(() => {
        setLastSelectedDay(selectedRange.end);
    }, [selectedRange]);

    const daysOfMonth = (date: Date): Date[] => {
        return eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })
    }

    const weekdayOffset = (date: Date): number => {
        return getDay(date);
    }

    const generateMonth = (date: Date) => {
        let month: React.ReactNodeArray = [];
        let days: Date[] = daysOfMonth(date);

        days.map((day, index) => {

            let selected = isDateBetween(selectedRange.start, selectedRange.end, day);

            if (isFirstDayOfMonth(day)) {
                let wdOffset = weekdayOffset(day);
                let offset = wdOffset;

                // Fix sunday being day 0 in america for some reason. This caused problems for months with first day on a sunday
                if (wdOffset === 0) {
                    offset = 7;
                }

                // Generate offset days
                for (let i = 0; i < offset - 1; i++) {
                    month = [...month, <Day key={"offset" + i} empty={true} />]
                }
                // Generate first day of month
                month = [...month, <Day key={index} date={day} selected={selected || isSameDay(selectedRange.start, day)} addButton={lastSelectedDay && isSameDay(lastSelectedDay, day)} />];
            } else {
                // console.log(isDateBetween(selectedRange.start, selectedRange.end, day));
                // if (isDateBetween(selectedRange.start, selectedRange.end, day)) {
                //     console.log(selectedRange.start, selectedRange.end);
                //     console.log("This day is selected", day);
                // }
                month = [...month, <Day key={index} date={day} selected={selected || isSameDay(selectedRange.start, day)} addButton={lastSelectedDay && isSameDay(lastSelectedDay, day)} />];
            }
            return null;
        })
        return <div className={styles.days}>{month}</div>
    }

    const generateWeekdayHeaders = () => {
        return (
            <div className={styles.weekdays}>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        )
    }

    const generateMonthName = (date: Date) => {
        return <div className={styles.monthName}>{format(date, 'MMMM')}</div>
    }


    return (
        <div className={styles.calendar + " " + props.className}>
            {generateWeekdayHeaders()}
            {generateMonthName(props.month)}
            {generateMonth(props.month)}
        </div>
    )
}

export default CalendarDisplay;