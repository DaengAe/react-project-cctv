import React, { useState, useEffect, useRef } from 'react';
import { MapContext, GetCctvData, transform, Vector, createMap, createPointFeatures,
        createClusterLayer, setMapClickEvent, setPointerMoveEvent } from '../components';
import Swal from 'sweetalert2';
import './Map.css';
import {ZoomControls} from '../components';
import { areaCoordinates } from '../components/areaCoordinates';

const Map = ({ selectedArea, selectedGubun, children }) => {
    const [mapObj, setMapObj] = useState({});
    const clusterLayerRef = useRef(null); // useRef로 클러스터 레이어 저장
    const [locations, setLocations] = useState([]);
    const [isBjgLayerVisible, setIsBjgLayerVisible] = useState(true);
    const bjgLayerRef = useRef(null); // useRef로 범죄주의구간 레이어 저장

    useEffect(() => {
        const map = createMap('map', isBjgLayerVisible);
        bjgLayerRef.current = map.getLayers().item(1); // bjgLayer를 가져오기
        setMapObj((prevState) => ({ ...prevState, map }));

        return () => {
            map.setTarget(undefined);
        };
    }, []);
    
    // 범죄주의구간 레이어 토글
    const toggleBjgLayer = () => {
        const newVisibility = !isBjgLayerVisible;
        setIsBjgLayerVisible(newVisibility);
        if (bjgLayerRef.current) {
            bjgLayerRef.current.setVisible(newVisibility);
        }
    };
        
    useEffect(() => {
        if (selectedArea) {
            GetCctvData(selectedArea, selectedGubun).then((locations) => {
                if (locations.length > 0 && locations[0].length > 0) {
                    drawMap(locations);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "오류",
                        html: ("선택된 지역에 대한 CCTV 데이터가 없습니다.")
                    });
                }
                setLocations(locations);
            });
        }
    }, [selectedArea, selectedGubun]);

    useEffect(() => {
        if (locations.length > 0) {
            drawMap(locations);
        }
    }, [locations]);

    const drawMap = (locations) => {
        const map = mapObj.map;
    
        if (clusterLayerRef.current) {
            map.removeLayer(clusterLayerRef.current);
        }
    
        const { pointFeatureArr } = createPointFeatures(locations);
    
        const pointSourceLayer = new Vector({
            features: pointFeatureArr,
        });
    
        const styleCache = {};
        const newClusterLayer = createClusterLayer(pointSourceLayer, styleCache);
    
        setMapClickEvent(map);
        setPointerMoveEvent(map);
    
        map.addLayer(newClusterLayer);
        clusterLayerRef.current = newClusterLayer;

        // 선택된 지역의 좌표 가져오기
        const centerCoordinates = areaCoordinates[selectedArea];

        if (centerCoordinates) {
            // 좌표가 있는 경우
            const [centerLon, centerLat] = centerCoordinates;
            const transformedCenter = transform([centerLon, centerLat], 'EPSG:4326', 'EPSG:3857');
            
            // 지도 중심 설정
            map.getView().animate({
                center: transformedCenter,
                zoom: 16,
                duration: 1000,
            });
        } else {
            // 좌표가 없을 경우 기본값을 설정
            map.getView().animate({
                center: transform([127.7, 36.1], 'EPSG:4326', 'EPSG:3857'), // 기본 위치: 한국 중앙
                zoom: 7.5,
                duration: 2000,
            });
        }
    };

    //줌인 버튼 기능
    const handleZoomInClick = () => {
        const map = mapObj.map;
        if (map) {
            const zoom = map.getView().getZoom() + 1;
            map.getView().animate({
                zoom,
                duration: 500
            });
        }
    };

    //줌아웃 버튼 기능
    const handleZoomOutClick = () => {
        const map = mapObj.map;
        if (map) {
            const zoom = map.getView().getZoom() - 1;
            map.getView().animate({
                zoom,
                duration: 500
            });
        }
    };


    return (
        <>
            <button className="toggle-layer-button" onClick={toggleBjgLayer}>
                {isBjgLayerVisible ? '범죄주의구간 끄기' : '범죄주의구간 켜기'}
            </button>
            <ZoomControls onZoomIn={handleZoomInClick} onZoomOut={handleZoomOutClick} />
            <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>
        </>
    );
};


export default Map;
