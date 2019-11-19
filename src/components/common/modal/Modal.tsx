import React, { useEffect } from 'react';
import styles from '../../../css/Modal.module.css';

const Modal = (props: any) => {

    const { setDisplay } = props;

    useEffect(() => {
        const hide = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                setDisplay(false);
            }
        }

        document.addEventListener("keydown", hide);
        return (() => document.removeEventListener("keydown", hide));
    }, [setDisplay]);

    if (props.display) {
        return (
            <div className={styles.module} onClick={event => props.setDisplay(false)}>
                <div className={styles.content} onClick={event => event.stopPropagation()}>
                    <span className={styles.closeButton} onClick={event => props.setDisplay(false)}>x</span>
                    { props.children }
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Modal;