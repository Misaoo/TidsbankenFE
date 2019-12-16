import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../css/Calendar.module.css';
import { eachDayOfInterval, startOfMonth, endOfMonth, getDay, isFirstDayOfMonth, isSameDay } from 'date-fns';
import Day from './Day';
import { format } from 'date-fns';
import CalendarContext from './CalendarContext';
import { isDateBetween, normalizeInterval } from './calendarUtils';
import Mark from './Mark';
import { CSSTransition } from 'react-transition-group';

/*
    The CalendarDisplay component is concerned with displaying one month. 
    A month includes a weekdays heading, the month name and the month day elements.
*/

const CalendarDisplay = (props: any) => {

    const { 
        selectedRange, 
        allApprovedReqs, 
        pendingReqs, 
        deniedReqs, 
        selectionType, 
        selectedDate, 
    } = useContext(CalendarContext);

    const [lastSelectedDay, setLastSelectedDay] = useState<Date>();

    // If the range changes, update which the last date of the range is.
    useEffect(() => {
        setLastSelectedDay(selectedRange.end);
    }, [selectedRange]);

    /*
        The generateMonth function gets the days of the specified month, and loops over them.
        for each day, it checks if there are any marks (approved, pending, denied) and if so, it adds them to the marks array.
        For each day, a Day Component is added to the month array. And each day takes a number of props (see Day component).
        The day offset is also calculate before the first day of each month, this offset is made to start the calendar on the correct weekday

    */
    const generateMonth = (date: Date) => {
        let month: React.ReactNodeArray = [];
        let days: Date[] = eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })

        days.map((day, index) => {
            let selected = isDateBetween(normalizeInterval({ start: selectedRange.start, end: selectedRange.end }), day);
            let marks: any = [];

            // Move these out of the loop if possible.
            allApprovedReqs && allApprovedReqs.map((req: any) => {
                return req.dates.map((date: any) => {
                    if (isSameDay(new Date(date), day)) {
                        return marks = [...marks, <Mark key={req.requestId} type="approved" vacReq={req} />];
                    } else {
                        return marks
                    }
                });
            });

            pendingReqs && pendingReqs.map((req: any) => {
                return req.dates.map((date: any) => {
                    if (isSameDay(new Date(date), day)) {
                        return marks = [...marks, <Mark  key={req.requestId} type="pending" vacReq={req} />];
                    } else {
                        return marks
                    }
                })
            })

            deniedReqs && deniedReqs.map((req: any) => {
                return req.dates.map((date: any) => {
                    if (isSameDay(new Date(date), day)) {
                        return marks = [...marks, <Mark  key={req.requestId} type="denied" vacReq={req} />];
                    } else {
                        return marks
                    }
                })
            })


            if (isFirstDayOfMonth(day)) {
                let wdOffset = getDay(day);
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
                month = [...month, <Day key={index} date={day} selectionType={selectionType} selected={selected || isSameDay(selectedRange.start, day)} addButton={lastSelectedDay && isSameDay(lastSelectedDay, day)} markings={marks} />];
            } else {

                month = [...month, <Day key={index} date={day} selectionType={selectionType} selected={selected || isSameDay(selectedRange.start, day)} addButton={lastSelectedDay && isSameDay(lastSelectedDay, day)} markings={marks} />];
            }
            return null;
        })
        return <div className={styles.days}>{month}</div>
    }

    // Set the weekday headers
    // An improvement could be to have a setting for what day a week starts with and based on that setting generate these weekday headers correctly.
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

    // Returns the specified months name.
    const generateMonthName = (date: Date) => {
        return <div className={styles.monthName}>{format(date, 'MMMM')}</div>
    }

    // The render uses CSSTransition from react-transition-group to make the calendar fade/slide in to signify that the calendar changes when you switch between months.
    return (
        <CSSTransition
            in={true}
            classNames={"fade"}
            timeout={300}
            key={selectedDate.toISOString()}
            appear={true}>
            <div className={styles.calendar + " " + props.className} key={props.date}>
                {generateWeekdayHeaders()}
                {generateMonthName(props.month)}
                {generateMonth(props.month)}
            </div>
        </CSSTransition>

    )
}

export default CalendarDisplay;