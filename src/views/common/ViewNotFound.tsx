import React from 'react';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

const ViewNotFound: React.FC<{location: any, match: any}> = (props) => (
    <>
        <p>ViewNotFound</p>
        <MyEmptyComponent />
    </>
)

export default ViewNotFound;