import React, { useState, useEffect } from 'react';
import styles from '../../../css/Calendar.module.css';
import CalendarHeading from './CalendarHeading';
import CalendarDisplay from './CalendarDisplay';
import CalendarContext from './CalendarContext';
import Modal from '../../common/modal/Modal';
import Infobox from '../../common/infobox/Infobox';
import API from '../../../api/API';

import {
    addMonths,
    subMonths,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { daysBetween, normalizeInterval } from './calendarUtils';


const Calendar = (props: any) => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modal, setModal] = useState<boolean>(false);
    const [allApprovedReqs, setAllApprovedReqs] = useState<any>();
    const [deniedReqs, setDeniedReqs] = useState<any>();
    const [pendingReqs, setPendingReqs] = useState<any>();
    const [maxVacDays, setMaxVacDays] = useState<any>();
    const [inelDays, setInelDays] = useState<any>();
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(0);

    const [selectionType, setSelectionType] = useState("success");

    const [selectedRange, setSelectedRange] = useState<{ start?: Date, end?: Date }>({});
    const [daysLeft, setDaysLeft] = useState();

    const [modalContent, setModalContent] = useState();

    const increaseMonth = () => { console.log("Increasemonth"); setSelectedDate(addMonths(selectedDate, 1)) };
    const decreaseMonth = () => { console.log("Decreasemonth"); setSelectedDate(subMonths(selectedDate, 1)) };
    const gotoToday = () => { setSelectedDate(new Date()) };

    useEffect(() => {
        setCurrentDate(new Date());

        API.allApprovedVacReqs()
            .then((res: any) => {
                setAllApprovedReqs(res.data);
            })
            .catch(error => {
                setError(true);
            })

        API.userPendingVacReqs()
            .then((res: any) => {
                setPendingReqs(res.data);
            })
            .catch(error => {
                setError(true);
            })
        API.userDeniedVacReqs()
            .then((res: any) => {
                setDeniedReqs(res.data);
            })
            .catch(error => {
                setError(true);
            })

        API.getVacationDays()
            .then((res: any) => {
                setMaxVacDays(res.data.maximumVacationDays)
            })
            .catch((error: any) => {
                if (error.response.status === 501) {
                    setMaxVacDays(-1);
                    return;
                }
                setError(true);
            });

        API.getIneligibleDays()
            .then((res: any) => {
                setInelDays(res.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, [update]);

    // useEffect(() => {
    //     if (allApprovedReqs) {
    //         console.log(allApprovedReqs);
    //     }
    // }, [allApprovedReqs])


    useEffect(() => {
        if (selectedRange.start && selectedRange.end) {
            let daysSelected: number = selectedRange.start && selectedRange.end && daysBetween(normalizeInterval({ start: selectedRange.start, end: selectedRange.end }));
            if (maxVacDays > 0) {
                setDaysLeft(maxVacDays - daysSelected);
            } else {
                // setDaysLeft(-1);
                setDaysLeft(5);
            }
        }
    }, [selectedRange.end])

    const handleVacReqClick = (event: any, vacReqId: number) => {
        event.preventDefault();
        event.stopPropagation();
        setModal(true);
    }

    return (
        <CalendarContext.Provider value={{
            selectedRange,
            setSelectedRange,
            modal,
            setModal,
            handleVacReqClick,
            allApprovedReqs,
            pendingReqs,
            deniedReqs,
            maxVacDays,
            daysLeft,
            selectionType,
            setModalContent,
            inelDays,
            setUpdate
        }}>
            <div className={styles.module}>
                {modal && <Modal display={modal} setDisplay={setModal} >{modalContent}</Modal>}
                <CalendarHeading
                    onPrev={decreaseMonth}
                    onNext={increaseMonth}
                    onToday={gotoToday}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                />
                <Infobox className={styles.helpInfo} infoboxId="calendarHelpInfo" icon="question-circle">
                    <h2>Calendar</h2>
                    <p>Here you can see your approved, pending and denied requests, as well as your colleagues approved vacation requests</p>
                    <h3>Request vacation</h3>
                    <p>To request a vacation, mark a period by selecting a start-date and then an end-date in the calendar.</p>
                </Infobox>
                <>
                    {!error && <><CalendarDisplay
                        month={selectedDate}
                        className={styles.calendarA}
                    />
                    <CalendarDisplay
                        month={addMonths(selectedDate, 1)}
                        className={styles.calendarB}
                    /></>}
                </>
            </div>
        </CalendarContext.Provider>
    );
}

export default Calendar;