import React, { useState, useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, isToday, isWeekend, subDays, isBefore } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isIneligible, normalizeInterval, validDatesInInterval } from './calendarUtils';
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
        currentDate
    } = useContext(CalendarContext);


    /*
        The selection of a day is checked here.
    */
    const select = (event: any) => {
        // A days that is clicked can't be already selected, can't be 'empty' and can't be ineligible
        if (!selected && !props.empty && !isIneligible(props.date, inelDays) && !isBefore(props.date, subDays(currentDate, 1))) {

            // Set first selected day as start.
            if (selectedRange.start === undefined || selectedRange.start === null) {
                setSelectedRange({ ...selectedRange, start: props.date });
            }

            // Set end date of range make sure to only be able to select as many (valid dates) that are set in the backend.
            if (selectedRange.start) {
                let daysSelected: Date[] = validDatesInInterval(normalizeInterval({ start: selectedRange.start, end: props.date }), inelDays);
                if (maxVacDays - daysSelected.length >= 0) {
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                } else if (maxVacDays < 0) {
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                }
            }

            // Clear both dates
            if (selectedRange.start && selectedRange.end) {
                console.log("clear range");
                setSelectedRange({});
                setSelectionType("success");
            }
        }
    }

    const styleInelegible = inelDays && isIneligible(props.date, inelDays) ? styles.ineligible : "";
    const styleToday = isToday(props.date) ? styles.today : "";
    const styleEmpty = props.empty ? styles.empty : "";
    const styleSelect = props.selected ? styles.daySelect : "";
    const styleWeekend = isWeekend(props.date) ? styles.weekend : "";
    const stylePast = isBefore(props.date, subDays(currentDate, 1)) ? styles.past : "";

    let classNames = [
        styles.day,
        props.className,
        styleEmpty,
        styleSelect,
        styleToday,
        styleInelegible,
        stylePast
    ].join(" ");

    return <div onClick={select}
        className={classNames}
        title={props.date ? format(props.date, 'yyyy-MM-dd') : ''}>

        {!props.empty && inelDays && <>
            <span className={styles.dayBase}><span>{props.date ? format(props.date, 'd') : ''}</span></span>
            {props.addButton && <Tooltip title="Request period" placement="top">
                <span
                    onClick={() => {
                        setModalContent(<AddRequest range={selectedRange} />);
                        setModalTitle("Create Request");
                        setModal((b: any) => !b);
                    }}
                    className={styles.action}>
                    <FontAwesomeIcon icon="calendar-plus" />
                </span>
            </Tooltip>}
            {!isIneligible(props.date, inelDays) && props.markings}
            {isIneligible(props.date, inelDays) && <div className={styles.ineligibleMessage}>Ineligible</div>}
        </>}
        {styleWeekend ? <span className={styleWeekend}></span> : null}
    </div>
}

export default Day;