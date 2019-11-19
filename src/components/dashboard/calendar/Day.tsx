import React, { useState, useEffect, useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import { format, isToday, addDays, isWeekend, isSameDay, differenceInDays, areIntervalsOverlapping, subDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isIneligible, datesInInterval } from './calendarUtils';
import CalendarContext from './CalendarContext';


const Day = (props: any) => {

    const [selected, setSelected] = useState(false);

    const { selectedRange, setSelectedRange, modal, setModal } = useContext(CalendarContext);

    const ineligibleDays = [addDays(new Date(), 2), addDays(new Date(), 3)];

    const select = (event: any) => {
        if (!selected && !props.empty && !isIneligible(props.date, ineligibleDays)) {
            if (selectedRange.start === undefined || selectedRange.start === null) {
                // set start
                setSelectedRange({ ...selectedRange, start: props.date });
            } else if (!datesInInterval({ start: selectedRange.start, end: props.date }, ineligibleDays)) {
                // set end only if the date is not within the inelegible dates array
                setSelectedRange({ ...selectedRange, end: props.date });
            } else if (selectedRange.start && datesInInterval({ start: selectedRange.start, end: props.date }, ineligibleDays)) {
                // Binds selection to the day before the first inelegible day
                // MAKE SURE THAT THE INELIGIBLEDAYS ARRAY IS SORTED ON DATE!
                setSelectedRange({ ...selectedRange, end: subDays(ineligibleDays[0], 1) });
            }
            // Clear both dates
            if (selectedRange.start && selectedRange.end) {
                setSelectedRange({});
            }
        }
    }

    const styleInelegible = isIneligible(props.date, ineligibleDays) ? styles.ineligible : "";
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

    return <div onClick={select} className={classNames} title={props.date ? format(props.date, 'yyyy-MM-dd') : ''}>

        {!props.empty && <>
            <span className={styles.dayBase}><span>{props.date ? format(props.date, 'd') : ''}</span></span>
            {props.addButton && <span onClick={() => setModal((b: any) => !b)} className={styles.action}><FontAwesomeIcon icon="calendar-plus" /></span>}
            {!isIneligible(props.date, ineligibleDays) &&
                <>
                    <span className={styles.mark}>Andreas A.</span>
                    <span className={styles.mark}>Andreaasdasdasdasds B.</span>
                </>
            }
        </>}
        {styleWeekend ? <span className={styleWeekend}></span> : null}
    </div>
}

export default Day;