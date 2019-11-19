import React, { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import commonStyles from '../../css/profile/SettingComponent.module.css';

const VacationComponent = (props: any) => {
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p>VacationComponent has loaded</p>
        </>
    )
}

export default VacationComponent;