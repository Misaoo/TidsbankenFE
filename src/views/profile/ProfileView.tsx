import React, { useContext, useState } from 'react';
import AuthContext from '../../components/auth/AuthContext';
import commonStyles from '../../css/ProfileView.module.css';

// Specific components regarding profile
import VacationComponent from '../../components/profile/VacationComponent';
import SideBarComponent from '../../components/profile/SideBarComponent';
import SettingComponent from '../../components/profile/SettingComponent';

type MyProps = { }
type MyState = { }

const ProfileView = (props:any) => {
    const { user } = useContext(AuthContext);
    const [ email, setEmail ] = useState();

    return(
        <main className={commonStyles.ProfileWrapper}>
            <aside>
                <SideBarComponent email={email} setEmail={setEmail}/>
                <SettingComponent email={email}/>
            </aside>
            <div>
                <VacationComponent />
            </div>
        </main>  
    )
}

export default ProfileView;




