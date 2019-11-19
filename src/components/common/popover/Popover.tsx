import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/Popover.module.css';

const Popover = (props: any) => {

    const [showPopover, setShowPopover] = useState(false);

    const targetRef = useRef(null);

    const closePopover = (event: any) => {
        if (event.target !== targetRef.current) {
            setShowPopover(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closePopover);
        return () => document.removeEventListener("mousedown", closePopover)
    })


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