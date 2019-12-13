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
        <main className={profileStyle.height}>
            <Grid container className={profileStyle.height}>
                <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <SideBarComponent email={email} setEmail={setEmail}/>
                </Grid>
               
                <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <OverviewComponent/>
                </Grid>
            </Grid>
        </main>  
    )
}

export default ProfileView;




