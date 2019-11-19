import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props: any) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: any) => {
        setShowDropdown(!showDropdown);
    };

    const closeDropDown = (event: any) => {
        if (dropdownRef && !(dropdownRef as any).current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    // Make sure that dropdown is closed when you press outside it..
    useEffect(() => {
        document.addEventListener("mousedown", closeDropDown);
        return () => {
            document.removeEventListener("mousedown", closeDropDown);
        };
    });

    return (
        <div className={styles.module} ref={dropdownRef}>
            <span
                className={styles.target + " " + (showDropdown ? styles.active : "")}
                onClick={handleClick}
            >
                {props.title}
                {showDropdown ? <FontAwesomeIcon icon="angle-up" /> : <FontAwesomeIcon icon="angle-down" />}

            </span>
            {showDropdown && <div className={styles.items}>
                {props.children}
            </div>}
        </div>
    )
}

export default Dropdown;