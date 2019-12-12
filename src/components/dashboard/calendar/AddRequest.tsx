import React, { useContext, useState, useEffect } from 'react';
import API from '../../../api/API';
import AuthContext from '../../auth/AuthContext';
import styles from '../../../css/Request.module.css';
import commonStyles from '../../../css/Common.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarContext from './CalendarContext';
import { validDatesInInterval } from './calendarUtils';

/*
    The AddRequest component is responsible for display dates in a selection and sending either a vacation request or to set ineligible days.
*/

const AddRequest = (props: any) => {
    const { user } = useContext(AuthContext);
    const { setUpdateRequests, setUpdateIneligible, inelDays } = useContext(CalendarContext);

    const [type, setType] = useState("vacation");
    const [dates, setDates] = useState<Date[]>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Only have dates that are valid (ie. filter away ineligble days)
    useEffect(() => {
        setDates(validDatesInInterval(props.range, inelDays));
    }, [props.range, inelDays])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);

        let formatedDates: string[] = [];

        // Format dates
        dates.map((date) => {
            return formatedDates = [...formatedDates, format(date, 'yyyy-MM-dd')];
        });

        if (formatedDates && formatedDates.length > 0) {

            if (type === "vacation") {
                // Send vacation request
                API.submitVacationRequest(formatedDates)
                    .then((res: any) => {
                        setSuccess(true);
                        setUpdateRequests((u: number) => u + 1);
                    })
                    .catch((error: any) => {
                        setError(true);
                    })
            }

            if (type === "ineligible") {

                // Send ineligible days
                const fetches = formatedDates.map((date: string) => API.submitIneligibleDay(date));

                // Submit the ineligible days one by one, since that is what the backend requires.
                Promise.all(fetches)
                    .then((res: any) => {
                        setSuccess(true);
                        setUpdateIneligible((u: number) => u + 1);
                    })
                    .catch((error: any) => {
                        setError(true);
                    })
                    .finally(() => {
                        setUpdateIneligible((u: number) => u + 1);
                    })
            }
        }
    }

    const handleChange = (event: any) => {
        setType(event.target.name);
    }

    const createDays = () => {
        let arr: any = [];
        dates.map((date: any, index: number) => {
            return arr = [...arr, <div key={index} title={format(date, 'EEE do MMMM')}>{format(date, 'yyyy-MM-dd')}</div>]
        });
        return arr;
    }

    const loggedIn =
        user &&
        user.hasOwnProperty("name") &&
        user.hasOwnProperty("isAdmin") &&
        user.isAdmin === 0;

    const loggedInAdmin =
        user && user.hasOwnProperty("isAdmin") && user.isAdmin === 1;

    return <div className={styles.module}>
        {loggedIn && <h2>Request vacation</h2>}
        {loggedInAdmin && <h2>Request vacation / Set ineligible days</h2>}
        <div className={styles.selectedDays}>
            <h3>Selected days:</h3>
            <div>
                <div className={styles.selectedDaysGrid}>
                    {createDays()}
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
            {loggedInAdmin && <>
                <label>
                    <input
                        type="radio"
                        name="vacation"
                        value="vacation"
                        onChange={handleChange}
                        checked={(type === "vacation")}
                    />
                    Request vacation
                </label>
                <label>
                    <input
                        type="radio"
                        name="ineligible"
                        value="ineligible"
                        onChange={handleChange}
                        checked={(type === "ineligible")}
                    />
                    Set ineligible period
                </label>
            </>}
            {error && <p className={styles.error}><FontAwesomeIcon icon="exclamation-circle" /> Something went wrong, please try again.</p>}
            {success && <p className={styles.success}><FontAwesomeIcon icon="check-circle" />Your request was submitted</p>}
            {loggedIn && <button className={commonStyles.button} type="submit" disabled={success}>Request</button>}
            {loggedInAdmin && <button className={commonStyles.button} type="submit" disabled={success}>{type === "vacation" ? 'Request' : 'Set'}</button>}

        </form>

    </div>;
}

export default AddRequest;