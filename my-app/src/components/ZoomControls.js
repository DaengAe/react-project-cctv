import React from 'react';

//줌인, 줌아웃 버튼
const ZoomControls = ({ onZoomIn, onZoomOut }) => {
    return (
        <div className="custom_zoomcontrol radius_border"> 
            <span onClick={onZoomIn} style={{ cursor: 'pointer' }}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
            </span>
            <span onClick={onZoomOut} style={{ cursor: 'pointer' }}>
                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
            </span>
        </div>
    );
};

export default ZoomControls;