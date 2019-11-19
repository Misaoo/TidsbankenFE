import React from 'react';
import MyEmptyComponent from '../../components/common/MyEmptyComponent';

const MyView: React.FC<{location: any, match: any}> = (props) => (
    <>
        <p>MyView</p>
        <MyEmptyComponent />
    </>
)

export default MyView;