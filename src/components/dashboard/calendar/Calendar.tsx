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
    const [maxVacDays, setMaxVacDays] = useState(-1);
    const [inelDays, setInelDays] = useState<any>();
    const [error, setError] = useState<any>(false);
    const [updateRequests, setUpdateRequests] = useState<number>(0);
    const [updateIneligible, setUpdateIneligible] = useState<number>(0);
    const [selectionType, setSelectionType] = useState<any>("success");
    const [selectedRange, setSelectedRange] = useState<{ start?: Date, end?: Date }>({});
    const [daysLeft, setDaysLeft] = useState<any>();
    const [modalContent, setModalContent] = useState<any>();
    const [modalTitle, setModalTitle] = useState<any>();

    const [holidays, setHolidays] = useState([])
    const [keepTrackOfRedDays, setKeepTrackOfRedDays] = useState(false)

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

    // Calculate red days
    useEffect(() => {
        // minimize the calculations happening while browsing calendar < >

        // initial load
        if(!keepTrackOfRedDays) {
            setRedDays(selectedDate.getFullYear(), selectedDate.getMonth())
            setKeepTrackOfRedDays(true)
        }

        // only recalculate red days during december or january (a close gap between different years)
        if((selectedDate.getMonth() === 11 || selectedDate.getMonth() === 0) && keepTrackOfRedDays === true) {
            setKeepTrackOfRedDays(false)
            setRedDays(selectedDate.getFullYear(), selectedDate.getMonth())
        } 
    }, [selectedDate])

    // calculate easter days
    const calcEaster = (currentYear: any) => {
        const a = currentYear % 19
        const b = currentYear % 4
        const c = currentYear % 7
        // 24 changes depending on year. 24 will be valid for the next 100 years or so
        const d = Math.round((19 * a + 24) % 30)
        // 5 changes depending on year. 5 will be valid for the next 100 years or so
        const e = Math.round((2 * b + 4 * c + 6 * d + 5) % 7)
        const f = Math.round(22 + d + e) 

        if(f <= 31) {
            // the date in the March 
            // 2nd month (in this format) (march)
            return {month: 2, day: f}
        } else {
            // 3rd month in this format (april)
            if( (f - 31) === 26 || ( (f - 31) === 25 && d === 28 && e === 6 && a > 10) ) {
                return {month: 3, day: 19}
            } else {
                return {month: 3, day: (f - 31)}
            }
        }
    }

    // set red day object
    const setRedDays = (currentYear: any, currentMonth: any) => {
        const newYears = new Date(currentYear, 0, 1)
        const epiphanyDay = new Date(currentYear, 0, 6)
        // easter
        const easterObj = calcEaster(currentYear)

        const easterFriday = new Date(currentYear, easterObj.month, easterObj.day - 2)
        const easterSaturday = new Date(currentYear, easterObj.month, easterObj.day - 1)
        const easter = new Date(currentYear, easterObj.month, easterObj.day)
        const easterMonday = new Date(currentYear, easterObj.month, easterObj.day + 1)

        const laborDay = new Date(currentYear, 4, 1)
        const ascenionDay = new Date(easter.getTime() + (39 * 24 * 60 * 60 * 1000))
        const nationalDay = new Date(currentYear, 5, 6)

        let middsummer: any = new Date(currentYear, 5, 19)
        middsummer = (middsummer.getDay() <= 5) ? new Date(currentYear, 5, 19 + 5 - middsummer.getDay()) : new Date(currentYear, 5, 25)

        const christmasEve = new Date(currentYear, 11, 24)
        const christmasDay = new Date(currentYear, 11, 25)
        const boxingDay = new Date(currentYear, 11, 26)
        const newYearsEve = new Date(currentYear, 11, 31)
        switch(currentMonth) {
            case 11: {
                const nextNewYears = new Date(currentYear+1, 0, 1)
                const nextEpiphanyDay = new Date(currentYear+1, 0, 6)
                const redDayList: any = [
                    {date: newYears, name: "Nyårsdagen"},
                    {date: epiphanyDay, name: "Trettondag jul"},
                    {date: easterFriday, name: "Långfredag"},
                    {date: easterSaturday, name: "Påskafton"},
                    {date: easter, name: "Påskdagen"},
                    {date: easterMonday, name: "Annandag påsk"},
                    {date: laborDay, name: "Första maj"},
                    {date: ascenionDay, name: "Kristi himmelsfärdsdag"},
                    {date: nationalDay, name: "Nationaldagen"},
                    {date: middsummer, name: "Midsommar"},
                    {date: christmasEve, name: "Julafton"},
                    {date: christmasDay, name: "Juldagen"},
                    {date: boxingDay, name: "Annandag jul"},
                    {date: newYearsEve, name: "Nyårsafton"},

                    {date: nextNewYears, name: "Nyårsdagen"},
                    {date: nextEpiphanyDay, name: "Trettondag jul"}
                ]
                setHolidays(redDayList)
                break
            }
            default: {
                const redDayList: any = [
                    {date: newYears, name: "Nyårsdagen"},
                    {date: epiphanyDay, name: "Trettondag jul"},
                    {date: easterFriday, name: "Långfredag"},
                    {date: easterSaturday, name: "Påskafton"},
                    {date: easter, name: "Påskdagen"},
                    {date: easterMonday, name: "Annandag påsk"},
                    {date: laborDay, name: "Första maj"},
                    {date: ascenionDay, name: "Kristi himmelsfärdsdag"},
                    {date: nationalDay, name: "Nationaldagen"},
                    {date: middsummer, name: "Midsommar"},
                    {date: christmasEve, name: "Julafton"},
                    {date: christmasDay, name: "Juldagen"},
                    {date: boxingDay, name: "Annandag jul"},
                    {date: newYearsEve, name: "Nyårsafton"}
                ]
                setHolidays(redDayList)
                break
            }
        }
    }

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

        // API.getVacationDays()
        //     .then((res: any) => {
        //         setMaxVacDays(res.data.maximumVacationDays)
        //     })
        //     .catch((error: any) => {
        //         if (error.response && (error.response.status === 401 ||error.response.status === 403)) {
        //             window.location.href = "/logout";
        //         }
        //         if (error.response && (error.response.status === 501)) {
        //             setMaxVacDays(-1);
        //             return;
        //         }
        //         setError(true);
        //     })
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
            userNames,
            holidays
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