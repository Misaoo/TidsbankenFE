import React from 'react';
import commonStyles from '../../css/Common.module.css';
const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <>
        <div className={commonStyles.buttonplacement}> 
            <h2 >401</h2> 
            <p >You are unauthorized to access this page.</p>
        </div>
       
    </>
)

export default ViewNotFound;