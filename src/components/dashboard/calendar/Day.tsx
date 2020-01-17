import React, { useState, useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, isToday, isWeekend, subDays, isBefore, isSameDay } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isIneligibleOrHoliday, normalizeInterval, validDatesInInterval } from './calendarUtils';
import CalendarContext from './CalendarContext';
import Tooltip from '@material-ui/core/Tooltip';
import AddRequest from './AddRequest';

/*
    The Day component represents a day element in the calendar. A Day can have a number of 
    different css classes to show different days. A Day also includes different marks to 
    represent the vacation requests. 
*/

const Day = (props: any) => {

    const [selected] = useState(false);

    const {
        selectedRange,
        setSelectedRange,
        setModal,
        maxVacDays,
        setSelectionType,
        setModalContent,
        setModalTitle,
        inelDays,
        currentDate,
        holidays
    } = useContext(CalendarContext);

    /*
        The selection of a day is checked here.
    */
    const select = (event: any) => {
        // A days that is clicked can't be already selected, can't be 'empty' and can't be ineligible
        if (!selected && !props.empty && !isIneligibleOrHoliday(props.date, inelDays) && !isBefore(props.date, subDays(currentDate, 1)) && !isIneligibleOrHoliday(props.date, holidays) && !isWeekend(props.date)) {

            // Set first selected day as start.
            if (selectedRange.start === undefined || selectedRange.start === null) {
                setSelectedRange({ ...selectedRange, start: props.date });
            }

            // Set end date of range make sure to only be able to select as many (valid dates) that are set in the backend.
            if (selectedRange.start && !selectedRange.end) {
                let daysSelected: Date[] = validDatesInInterval(normalizeInterval({ start: selectedRange.start, end: props.date }), inelDays, holidays);
                if (maxVacDays - daysSelected.length >= 0) {
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                } else if (maxVacDays < 0) {
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                }
            }

            // Clear both dates
            if (selectedRange.start && selectedRange.end) {
                setSelectedRange({});
                setSelectionType("success");
            }
        }
    }

    // gets current red day name
    const getRedDayName = () => {
        return holidays.map((holiday: any) => {
            if(isSameDay(holiday.date, props.date)) {
                return holiday.name
            }
        })
    }

    const styleInelegible = inelDays && isIneligibleOrHoliday(props.date, inelDays) ? styles.ineligible : "";
    const styleToday = isToday(props.date) ? styles.today : "";
    const styleEmpty = props.empty ? styles.empty : "";
    const styleSelect = props.selected ? styles.daySelect : "";
    const styleWeekend = isWeekend(props.date) ? styles.weekend : "";
    const stylePast = isBefore(props.date, subDays(currentDate, 1)) ? styles.past : "";
    const styleHoliday = holidays && isIneligibleOrHoliday(props.date, holidays) ? styles.holiday : ""
    const styleDay = (holidays && isIneligibleOrHoliday(props.date, holidays)) || (inelDays && isIneligibleOrHoliday(props.date, inelDays)) ? styles.dayNoGrid : styles.day

    let classNames = [
        styleDay,
        props.className,
        styleEmpty,
        styleSelect,
        styleToday,
        styleInelegible,
        stylePast,
        styleHoliday,
        styleWeekend
    ].join(" ");

    return <div onClick={select}
        className={classNames}
        title={props.date ? format(props.date, 'yyyy-MM-dd') : ''}>

        {!props.empty && inelDays && <>
            <span className={styles.dayBase}><span>{props.date ? format(props.date, 'd') : ''}</span></span>
            {props.addButton && <Tooltip title="Request period" placement="top">
                <span
                    onClick={() => {
                        setModalContent(<AddRequest range={selectedRange} setDisplay={() => setModal((b: any) => !b)}/>);
                        setModalTitle("Create Request");
                        setModal((b: any) => !b);
                    }}
                    className={styles.action}>
                    <FontAwesomeIcon icon="calendar-plus" />
                </span>
            </Tooltip>}
            {/* Show names on the calendar */}
            {!isIneligibleOrHoliday(props.date, inelDays) && props.markings}
            {/* Add style to ineligible days */}
            {isIneligibleOrHoliday(props.date, inelDays) && <div className={styles.ineligibleMessage}>Ej valbar</div>}
            {/* Add style to holiday days */}
            {isIneligibleOrHoliday(props.date, holidays) && <div className={styles.ineligibleMessage}>{getRedDayName()}</div>}
        </>}
    </div>
}

export default Day;