import React, { useState } from 'react';
import { RealEstate } from './components/AreaSelect/RealEstate';
import Map from './Map';

function App() {

    const [selectedArea, setSelectedArea] = useState('');
    const [selectedGubun, setSelectedGubun] = useState([]);

    const handleResult = (area, gubun) => {
        setSelectedArea(area);  //area 업데이트
        setSelectedGubun(gubun);  //gubun 업데이트
    };

    return (
        <>
        <div className='App'>
            <div id="map" className="map" style={{ width:'100%', height:'100%'}}>
            </div>
            <div>
                <RealEstate onResult={handleResult} /> {/* handleResult 전달 */}
                <Map selectedArea={selectedArea} selectedGubun={selectedGubun} />
                {/* selectedArea, selectedGubun 전달 */}
            </div>
        </div>
        </>
    );
}
export default App;






