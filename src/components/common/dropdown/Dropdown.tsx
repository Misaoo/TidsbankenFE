import React, { useEffect, useRef, useState } from 'react';
import styles from '../../../css/Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    The Dropdown component takes it's dropdown content as child elements and it uses eventlisteners 
    on the document to close the dropdown when you click outside it.

    The component takes a title as a prop which is displayed as the menuitem.
    
    Example: 

    <Dropdown title={(user && user.name) || "Menu"}>
        <ul className={commonStyles.dropdown}>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    </Dropdown>
*/

const Dropdown = (props: any) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: any) => {
        setShowDropdown(!showDropdown);
        if (props.cb) {
            props.cb();
        }
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