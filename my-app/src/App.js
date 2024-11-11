import React, { useState } from 'react';
import { RealEstate } from './components/AreaSelect/RealEstate';
import Map from './Map';

function App() {

    const [selectedArea, setSelectedArea] = useState('');
    const [selectedGubun, setSelectedGubun] = useState([]);

    const handleResult = (area, gubun) => {
        setSelectedArea(area);
        setSelectedGubun(gubun);  // gubun도 업데이트
    };

    return (
        <>
        <div className='App'>
            <div id="map" className="map" style={{ width: '100%', height: '100%' }}></div>
            <div>
                <RealEstate onResult={handleResult} />
                <Map selectedArea={selectedArea} selectedGubun={selectedGubun} /> {/* selectedGubun 전달 */}
            </div>
        </div>
        </>
    );
}


export default App;






