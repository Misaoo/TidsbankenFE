import React, { useState, useEffect, useContext } from 'react';
import styles from '../../../css/Calendar.module.css';
import CalendarHeading from './CalendarHeading';
import CalendarDisplay from './CalendarDisplay';
import CalendarContext from './CalendarContext';
import AuthContext from '../../auth/AuthContext';
import Modal from '../../common/modal/Modal';
import Infobox from '../../common/infobox/Infobox';
import API from '../../../api/API';
import { addMonths, subMonths } from 'date-fns';
import { daysBetween, normalizeInterval } from './calendarUtils';
import CalendarAdmin from './CalendarAdmin';
import bookingpicture from '../../../pic/undraw_booking_33fn.svg';

/*
    The Calendar component is made up of four main parts: 
        1. CalendarContext, which holds states and variables related to the calendar components (mostly states)
        2. CalendarHeading, which is the component controlling the navigation of the calendar. 
        3. CalendarDisplay, which is the component that is displaying a month in the calendar.
        4. CalendarAdmin, which is the administration settings (removing ineligible days).
*/


const Calendar = (props: any) => {

    const { user } = useContext(AuthContext);

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modal, setModal] = useState<boolean>(false);
    const [allApprovedReqs, setAllApprovedReqs] = useState<any>();
    const [deniedReqs, setDeniedReqs] = useState<any>();
    const [pendingReqs, setPendingReqs] = useState<any>();
    const [userNames, setUserNames] = useState<any>({});
    const [maxVacDays, setMaxVacDays] = useState<any>();
    const [inelDays, setInelDays] = useState<any>();
    const [error, setError] = useState<any>(false);
    const [updateRequests, setUpdateRequests] = useState<number>(0);
    const [updateIneligible, setUpdateIneligible] = useState<number>(0);
    const [selectionType, setSelectionType] = useState<any>("success");
    const [selectedRange, setSelectedRange] = useState<{ start?: Date, end?: Date }>({});
    const [daysLeft, setDaysLeft] = useState<any>();
    const [modalContent, setModalContent] = useState<any>();
    const [modalTitle, setModalTitle] = useState<any>();

    // These functions are used in the calendarHeading to navigate the months.
    // The modify the state of the currently selected date.
    const increaseMonth = () => setSelectedDate(addMonths(selectedDate, 1));
    const decreaseMonth = () => setSelectedDate(subMonths(selectedDate, 1));
    const gotoToday = () => { setSelectedDate(new Date()) };

    // On change of the pending/denied/approved requests or ineligible days, 
    // make sure to keep the currentDate updated for the calendar
    useEffect(() => {
        setCurrentDate(new Date());
    }, [updateRequests, updateIneligible])


    // Fetch approved, pending and denied vacation requests, and the maximum vacation days, and use a counter state to force a refetch if needed.
    useEffect(() => {
        API.allApprovedVacReqs()
            .then((res: any) => {
                setAllApprovedReqs(res.data);
            })
            .catch((error: any) => {
                setError(true);
            })

        API.userPendingVacReqs()
            .then((res: any) => {
                setPendingReqs(res.data);
            })
            .catch((error: any) => {
                setError(true);
            })

        API.userDeniedVacReqs()
            .then((res: any) => {
                setDeniedReqs(res.data);
            })
            .catch((error: any) => {
                setError(true);
            })

        API.getVacationDays()
            .then((res: any) => {
                setMaxVacDays(res.data.maximumVacationDays)
            })
            .catch((error: any) => {
                if (error.response && (error.response.status === 401 ||error.response.status === 403)) {
                    window.location.href = "/logout";
                }
                if (error.response && (error.response.status === 501)) {
                    setMaxVacDays(-1);
                    return;
                }
                setError(true);
            })
    }, [updateRequests])


    // Fetch the ineligible days, and use a counter state to force a refetch if needed.
    useEffect(() => {
        API.getIneligibleDays()
            .then((res: any) => {
                setInelDays(res.data);
            })
            .catch(() => {
                // do something
            })
    }, [updateIneligible]);

    // If there are approved, denied and pending requests, map through them and fetch usernames
    // This code makes sure to only fetch a user once, by adding the users to a Set.
    useEffect(() => {
        if (allApprovedReqs && allApprovedReqs !== undefined &&
            deniedReqs && deniedReqs !== undefined &&
            pendingReqs && pendingReqs !== undefined) {

            let set: Set<number> = new Set<number>();
            allApprovedReqs.map((req: any) => set.add(req.userId));
            deniedReqs.map((req: any) => set.add(req.userId));
            pendingReqs.map((req: any) => set.add(req.userId));

            const fetches = Array.from(set).map(async (userId: number) => {
                return (await API.user(userId)).data;
            });

            Promise.all(fetches)
                .then((res: any[]) => {
                    let newState = {};
                    // eslint-disable-next-line
                    res.map((user: any) => {
                        newState = { ...newState, [user.userId]: `${user.name} ${user.lastName.substring(0, 1)}.` };
                    })
                    setUserNames(newState);
                })
        }
    }, [allApprovedReqs, deniedReqs, pendingReqs]);

    // If left or right arrow key, navigate in the calendar.
    useEffect(() => {
        const switchMonth = (event: KeyboardEvent) => {
            if (event.keyCode === 37) {
                decreaseMonth();
            } else if (event.keyCode === 39) {
                increaseMonth();
            }
        }

        document.addEventListener("keydown", switchMonth);
        return (() => document.removeEventListener("keydown", switchMonth));
        // eslint-disable-next-line
    }, [selectedDate]);

    // Calculate how many days are selected when a second date has been marked
    useEffect(() => {
        if (selectedRange.start && selectedRange.end) {
            let daysSelected: number = selectedRange.start && selectedRange.end && daysBetween(normalizeInterval({ start: selectedRange.start, end: selectedRange.end }));
            if (maxVacDays > 0) {
                setDaysLeft(maxVacDays - daysSelected);
            } else {
                setDaysLeft(-1);
                // setDaysLeft(5);
            }
        }
        // eslint-disable-next-line
    }, [selectedRange.end])

    const handleVacReqClick = (event: any, vacReqId: number) => {
        event.preventDefault();
        event.stopPropagation();
        setModal(true);
    }

    const loggedInAdmin =
        user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;

    return (
        <CalendarContext.Provider value={{
            selectedDate,
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
            setSelectionType,
            setModalContent,
            setModalTitle,
            inelDays,
            setUpdateRequests,
            setUpdateIneligible,
            currentDate,
            userNames
        }}>


            <div className={styles.module}>
                {modal && <Modal display={modal} setDisplay={setModal} title={modalTitle}>{modalContent}</Modal>}
                <CalendarHeading
                    onPrev={decreaseMonth}
                    onNext={increaseMonth}
                    onToday={gotoToday}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                />
                <Infobox className={styles.helpInfo} infoboxId="calendarHelpInfo" image={<img src={bookingpicture} alt="Booking" height="100px" />}>
                    <h2>Calendar</h2>
                    <p>Here you can see your approved, pending and denied requests, as well as your colleagues approved vacation requests</p>
                    <h3>Request vacation</h3>
                    <p>To request a vacation, mark a period by selecting a start-date and then an end-date in the calendar.</p>
                </Infobox>
                {!error && <>
                    <CalendarDisplay
                        month={selectedDate}
                        className={styles.calendarA}
                    />
                    <CalendarDisplay
                        month={addMonths(selectedDate, 1)}
                        className={styles.calendarB}
                    />
                    {loggedInAdmin && inelDays && <CalendarAdmin ineligibleDays={inelDays} className={styles.calendarAdmin} setUpdateIneligible={setUpdateIneligible} />}
                </>}
            </div>

        </CalendarContext.Provider>
    );
}

export default Calendar;