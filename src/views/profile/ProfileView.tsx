import React, { useState } from 'react';
import profileStyle from '../../css/profile/ProfileView.module.css';

// Specific components regarding profile
import SideBarComponent from '../../components/profile/SideBarComponent';
import SettingComponent from '../../components/profile/SettingComponent';
import OverviewComponent from '../../components/profile/OverviewComponent';

const ProfileView = (props:any) => {
    const [ email, setEmail ] = useState();

    return(
        <main className={profileStyle.ProfileWrapper}>
            <aside>
                <SideBarComponent email={email} setEmail={setEmail}/>
                <SettingComponent email={email}/>
            </aside>
            <div>
                <OverviewComponent />
            </div>
        </main>  
    )
}

export default ProfileView;




