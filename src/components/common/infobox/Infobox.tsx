import React, { useState, useEffect } from 'react';
import styles from '../../../css/Infobox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    The Infobox is a toggleable box that is meant to display help information for the user and also 
    to be able to persist the users preference of hidden or shown accross sessions using localStorage.
    The component takes a infoboxId (which must be unique for the localStorage keys) and an image element as props.

    Example:

    <Infobox className={styles.helpInfo} infoboxId="calendarHelpInfo" image={<img src={bookingpicture} alt="Booking image" height="100px" />}>
        <h2>Calendar</h2>
        <p>Here you can see your approved, pending and denied requests, as well as your colleagues approved vacation requests</p>
        <h3>Request vacation</h3>
        <p>To request a vacation, mark a period by selecting a start-date and then an end-date in the calendar.</p>
    </Infobox>
*/

const Infobox = (props: any) => {

    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(props.infoboxId)) {
            setHide(true);
        } else {
            setHide(false);
        }
    }, [props.infoboxId]);

    const handleClick = (event: any) => {
        setHide(r => !r);
        localStorage.setItem(props.infoboxId, "true");
    }

    return <>

        <div className={styles.module + " " + props.className + " " + (hide ? styles.collapseHelp : '')}>
            <div className={styles.closeButton} onClick={handleClick}>
                <FontAwesomeIcon icon="question-circle" />
            </div>
            {!hide && <div className={styles.contentContainer}>
                <div className={styles.boxIcon}>
                    {props.image}
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>}
        </div>
    </>
}

export default Infobox;