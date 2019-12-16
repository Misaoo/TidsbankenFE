import React, { useEffect } from 'react';
import styles from '../../../css/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    The Modal component displays it's provided child elements in a box, with darkened and clickable background.
    It listenes to presses on the escape key and closes when pressed.

    The component is hidden and displayed based on a state that is outside the component 
    (to allow for external activation of the modal, eg. a button or event somewhere else).
    This allows for great flexibility in how this component can be used in the application.

    The component therefore takes three props: display (a boolean state), setDisplay (to set the boolean state) and title (to put a title in the modal top bar)

    Example:
         <Modal display={showModal} setDisplay={setshowModal} title="My modal title">
            <p>My content</p>
         </Modal>
*/

const Modal = (props: any) => {

    const { setDisplay } = props;

    useEffect(() => {
        const hide = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                setDisplay(false);
            }
        }

        document.addEventListener("keydown", hide);
        return (() => {
            document.removeEventListener("keydown", hide);
        });
    }, [setDisplay]);

    if (props.display) {
        return (
            <div className={styles.module} onClick={event => props.setDisplay(false)}>
                <div className={styles.header}>
                    {props.title && <h2>{props.title}</h2>}
                    <span className={styles.closeButton} onClick={event => props.setDisplay(false)}><FontAwesomeIcon icon="times" /></span>
                </div>
                <div className={styles.content} onClick={event => event.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Modal;