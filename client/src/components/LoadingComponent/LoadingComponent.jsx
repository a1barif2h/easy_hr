import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const LoadingComponent = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return (
        <div style={{textAlign: 'center', marginTop: 100, }}>
            <Spin indicator={antIcon} />
            <h1 style={{color: '#3AA0FF'}}>Loading...</h1>
        </div>
    );
};

export default LoadingComponent;