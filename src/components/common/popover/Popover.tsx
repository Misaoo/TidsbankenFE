import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/Popover.module.css';

/* A popover module that takes a message*/

const Popover = (props: any) => {

    const [showPopover, setShowPopover] = useState(false);  
    const targetRef = useRef(null);

    /**********************/
    /* HANDLES THE POPOVER */
    /**********************/

    const closePopover = (event: any) => {
        if (event.target !== targetRef.current) {
            setShowPopover(false);
        }
    };

    // closes and opens the popover
    useEffect(() => {
        document.addEventListener("mousedown", closePopover);
        return () => document.removeEventListener("mousedown", closePopover)
    })

    /**********************/
    /* HTML */
    /**********************/

    return (
        <div className={styles.popover}>
            <button
                onClick={() => { setShowPopover(!showPopover) }}
                id={props.triggerId}
                type="button"
                ref={targetRef}
            >
                {props.trigger}
            </button>
            {showPopover && <div className={styles.wrapper}>
                {props.children}
            </div>}
        </div>
    )
}

export default Popover;