//Library imports
import React from 'react';

//Style imports
import commonStyles from '../../css/Common.module.css';

//ViewNotFound-hook
const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <>
        <div className={commonStyles.buttonplacement}>
            <h2>404</h2> 
            <p>That page doesn't exist.</p>
        </div>
    </>
)

//Component export
export default ViewNotFound;