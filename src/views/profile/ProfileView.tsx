import React, { useState } from 'react';
import profileStyle from '../../css/profile/ProfileView.module.css';

/* Material ui */
import Grid from '@material-ui/core/Grid';

// Specific components regarding profile
import OverviewComponent from '../../components/profile/OverviewComponent';
import SideBarComponent from '../../components/profile/SideBarComponent';


type MyProps = { }
type MyState = { }

const ProfileView = (props:any) => {
    const [ email, setEmail ] = useState('');

    return(
        <main className={profileStyle.ProfileWrapper}>
            <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={2} xl={2} className={profileStyle.gridColor1}>
                    <div className={profileStyle.sidebarContainer}>
                        <SideBarComponent email={email} setEmail={setEmail}/>
                    </div>
                </Grid>
               
                <Grid item xs={12} sm={8} md={8} lg={10} xl={10} className={profileStyle.gridColor2}>
                    <div className={profileStyle.overviewContainer}>
                        <OverviewComponent/>
                    </div>
                </Grid>
            </Grid>
        </main>  
    )
}

export default ProfileView;




