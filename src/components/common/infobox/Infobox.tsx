import React, { useState, useEffect } from 'react';
import styles from '../../../css/Infobox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Infobox = (props: any) => {

    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(props.infoboxId)) {
            setHide(true);
        } else {
            setHide(false);
        }
    }, []);

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