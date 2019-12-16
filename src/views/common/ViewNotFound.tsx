import React from 'react';
import commonStyles from '../../css/Common.module.css';

const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <>
        <div className={commonStyles.buttonplacement}>
            <h2>404</h2> 
            <p>That page doesn't exist.</p>
        </div>
    </>
)

export default ViewNotFound;