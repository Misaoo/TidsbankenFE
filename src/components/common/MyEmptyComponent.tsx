import React, { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import Modal from './modal/Modal';

const MyEmptyComponent = (props: any) => {
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p>{user && user.name} asd</p>
            {showModal &&
                <Modal display={showModal} setDisplay={setShowModal}>
                    <p>Modal</p>
                </Modal>
            }
        </>
    )
}

export default MyEmptyComponent;