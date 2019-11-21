import React, { useState, useEffect, useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, isToday, addDays, isWeekend, isSameDay, differenceInDays, areIntervalsOverlapping, subDays, isAfter } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isIneligible, datesInInterval, normalizeInterval, isIntervalNormalized, daysBetween } from './calendarUtils';
import CalendarContext from './CalendarContext';
import Tooltip from '@material-ui/core/Tooltip';
import AddRequest from './AddRequest';


const Day = (props: any) => {

    const [selected, setSelected] = useState(false);

    const { 
        selectedRange, 
        setSelectedRange, 
        modal, 
        setModal, 
        handleVacReqClick, 
        maxVacDays, 
        daysLeft, 
        selectionType, 
        setSelectionType, 
        setModalContent,
        inelDays
    } = useContext(CalendarContext);

    
    const select = (event: any) => {
        if (!selected && !props.empty && !isIneligible(props.date, inelDays)) {

            if (selectedRange.start === undefined || selectedRange.start === null) {
                // set start
                setSelectedRange({ ...selectedRange, start: props.date });
            }

            // Don't allow selection of times before (currentDate)
            // Don't allow for selection of more days than maxVacationdays unless you are an admin
            // Make a new selection start without having to clear the old selection first
            // Move the displaying of amount of selected days to the selection
            // Make selection not clamp to the ineligible days
            // Make createRequest modal show the right component
            // if you are admin, you have option to mark days as ineligible.
            // Make viewrequest modal show the right component
            // Make the marking be onclick, per day, and if shift is held, mark all days (except ineligible) until the day?



            // else if(datesInInterval(normalizeInterval({start: selectedRange.start, end: props.date}), ineligibleDays)) {
            //     console.log("selection error");
            //     setSelectedRange(normalizeInterval({...selectedRange, end: props.date}));
            //     setSelectionType("Error");
            // }

            // else {
            //     setSelectedRange(normalizeInterval({...selectedRange, end: props.date}));
            //     setSelectionType("Success");
            // }

            else if (!datesInInterval(normalizeInterval({ start: selectedRange.start, end: props.date }), inelDays)) {
                // set end only if the date is not within the inelegible dates array
                let daysSelected: number = daysBetween(normalizeInterval({ start: selectedRange.start, end: props.date }));
                if (maxVacDays - daysSelected >= 0) {
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                } else if (maxVacDays < 0) {
                    console.log("Unlimited", maxVacDays);
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: props.date }));
                }
                else {
                    console.log("else");
                    let endDate = addDays(selectedRange.start, maxVacDays - 1);
                    if (!isIntervalNormalized({ start: selectedRange.start, end: props.date })) {
                        endDate = subDays(selectedRange.start, maxVacDays - 1);
                    }
                    setSelectedRange(normalizeInterval({ ...selectedRange, end: endDate }));
                }

                // if start is before end set the values, otherwise flip the values.

            }

            else if (selectedRange.start && datesInInterval(normalizeInterval({ start: selectedRange.start, end: props.date }), inelDays)) {
                let endDate = addDays(inelDays[inelDays.length - 1], 1);
                if (isIntervalNormalized({ start: selectedRange.start, end: props.date })) {
                    endDate = subDays(inelDays[0], 1);
                }
                // Binds selection to the day before the first inelegible day
                // MAKE SURE THAT THE INELIGIBLEDAYS ARRAY IS SORTED ON DATE!
                console.log("clamp to ineligible")
                setSelectedRange(normalizeInterval({ ...selectedRange, end: endDate }));
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

    let classNames = [
        styles.day,
        props.className,
        styleEmpty,
        styleSelect,
        styleToday,
        styleInelegible,
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
                        setModal((b: any) => !b);
                    }} 
                    className={styles.action}>
                    <FontAwesomeIcon icon="calendar-plus" />
                </span>
            </Tooltip>}
            {!isIneligible(props.date, inelDays) && props.markings}
        </>}
        {styleWeekend ? <span className={styleWeekend}></span> : null}
    </div>
}

export default Day;