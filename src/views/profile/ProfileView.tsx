import React, { useState } from 'react';
import profileStyle from '../../css/profile/ProfileView.module.css';

// Specific components regarding profile
import OverviewComponent from '../../components/profile/OverviewComponent';
import SideBarComponent from '../../components/profile/SideBarComponent';
import SettingComponent from '../../components/profile/SettingComponent';

type MyProps = { }
type MyState = { }

const ProfileView = (props:any) => {
    const [ email, setEmail ] = useState();

    return(
        <main className={profileStyle.ProfileWrapper}>
            <aside>
                <SideBarComponent email={email} setEmail={setEmail}/>
                <SettingComponent email={email}/>
            </aside>
            <div>
                <OverviewComponent/>
            </div>
        </main>  
    )
}

export default ProfileView;




