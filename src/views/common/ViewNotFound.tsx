import React from 'react';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <>
        <h2>404</h2> 
        <p>That page doesn't exist.</p>
    </>
)

export default ViewNotFound;