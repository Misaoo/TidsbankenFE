//Library imports
import React from 'react';

//Style imports
import commonStyles from '../../css/Common.module.css';

//Unauthorized-hook
const Unauthorized: React.FC<{location: any, match: any}> = (props) => (
    <>
        <div className={commonStyles.buttonplacement}> 
            <h2 >401</h2> 
            <p >You are unauthorized to access this page.</p>
        </div>
    </>
)

//Component export
export default Unauthorized;