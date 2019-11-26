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
    const [error, setError] = useState(false);

    // const [update, setUpdate] = useState(0);

    const [updateRequests, setUpdateRequests] = useState<number>(0);
    const [updateIneligible, setUpdateIneligible] = useState<number>(0);

    const [selectionType, setSelectionType] = useState("success");

    const [selectedRange, setSelectedRange] = useState<{ start?: Date, end?: Date }>({});
    const [daysLeft, setDaysLeft] = useState();

    const [modalContent, setModalContent] = useState();

    const increaseMonth = () => { console.log("Increasemonth"); setSelectedDate(addMonths(selectedDate, 1)) };
    const decreaseMonth = () => { console.log("Decreasemonth"); setSelectedDate(subMonths(selectedDate, 1)) };
    const gotoToday = () => { setSelectedDate(new Date()) };

    useEffect(() => {
        setCurrentDate(new Date());
    }, [updateRequests, updateIneligible])

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
                if (error.response.status === 501) {
                    setMaxVacDays(-1);
                    return;
                }
                setError(true);
            })
    }, [updateRequests])

    useEffect(() => {
        API.getIneligibleDays()
            .then((res: any) => {
                setInelDays(res.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, [updateIneligible]);

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
                    res.map((user: any) => {
                        newState = { ...newState, [user.userId]: `${user.name} ${user.lastName.substring(0, 1)}.` };
                    })
                    setUserNames(newState);
                })
        }
    }, [allApprovedReqs, deniedReqs, pendingReqs]);

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
    }, [selectedDate]);

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
            inelDays,
            setUpdateRequests,
            setUpdateIneligible,
            currentDate,
            userNames
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