import React, { useState } from 'react';
import profileStyle from '../../css/profile/ProfileView.module.css';

/* Material ui */
import Grid from '@material-ui/core/Grid';

// Specific components regarding profile
import OverviewComponent from '../../components/profile/OverviewComponent';
import SideBarComponent from '../../components/profile/SideBarComponent';
import SettingComponent from '../../components/profile/SettingComponent';

type MyProps = { }
type MyState = { }

const ProfileView = (props:any) => {
    const [ email, setEmail ] = useState('');

    return(
        <main className={profileStyle.ProfileWrapper}>
            <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <div className={profileStyle.sidebarContainer}>
                        <SideBarComponent email={email} setEmail={setEmail}/>
                        <SettingComponent email={email}/>
                    </div>
                </Grid>
               
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                    <div className={profileStyle.overviewContainer}>
                        <OverviewComponent/>
                    </div>
                </Grid>
            </Grid>
        </main>  
    )
}

export default ProfileView;




