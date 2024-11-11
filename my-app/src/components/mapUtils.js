import {
    OlMap,
    View, 
    defaultControls, 
    fromLonLat,
    transform,
    TileLayer, 
    VectorLayer, 
    XYZ, 
    Cluster, 
    TileWMS, 
    Feature, 
    Point,
} from './olImports';
import Swal from 'sweetalert2';
import { getStyleByType, createClusterStyle, createInfoHTML } from './styles';

// 포인트 피처 생성
export const createPointFeatures = (locations) => {
    const pointFeatureArr = [];

    for (const loc of locations) {
        const point4326 = [loc[0], loc[1]];
        const point3857 = transform(point4326, 'EPSG:4326', 'EPSG:3857');

        const pointFeature = new Feature({
            geometry: new Point(point3857),
            type: "Point",
            Address1: loc[2],
            Address2: loc[3],
            Gubun: loc[4],
            Camera: loc[5],
            Bogwan: loc[6],
            MakeDate: loc[7],
            Number: loc[8],
        });

        const style = getStyleByType(loc[4]);
        pointFeature.set('style', style);
        pointFeatureArr.push(pointFeature);
    }

    return {
        pointFeatureArr,
    };
};

// 클러스터 레이어 생성
export const createClusterLayer = (pointSourceLayer, styleCache) => {
    return new VectorLayer({
        source: new Cluster({
            distance: 50,
            minDistance: 0,
            source: pointSourceLayer,
        }),
        zIndex: 99999,
        style: function (feature) {
            const clusterFea = feature.get('features');
            const size = clusterFea.length;
            let style = styleCache[size];

            if (!style) {
                if (size === 1) {
                    const singleFeature = clusterFea[0];
                    style = singleFeature.get('style') || getStyleByType('기타');
                } else {
                    style = createClusterStyle(size);
                    styleCache[size] = style;
                }
            }
            return style;
        },
    });
};

// 클릭 이벤트 설정
export const setMapClickEvent = (map) => {
    map.on('singleclick', function (evt) {
        map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            if (feature.get('features').length === 1) {
                const singleFeature = feature.get('features')[0];
                const info = {
                    Address1: singleFeature.get('Address1'),
                    Address2: singleFeature.get('Address2'),
                    Gubun: singleFeature.get('Gubun'),
                    Camera: singleFeature.get('Camera'),
                    Bogwan: singleFeature.get('Bogwan'),
                    MakeDate: singleFeature.get('MakeDate'),
                    Number: singleFeature.get('Number'),
                };

                Swal.fire({
                    icon: 'info',
                    title: info.Gubun,
                    html: createInfoHTML(info),
                });
            }
        });
    });
};

// 포인터 이동 이벤트 설정
export const setPointerMoveEvent = (map) => {
    map.on('pointermove', function (e) {
        if (!e.dragging) {
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }
    });
};

//배경지도 및 범죄주의구간 레이어 생성
export const createMap = (target, isBjgLayerVisible) => {
    const bjg_Param = {
        LAYERS: ['A2SM_CRMNLHSPOT_TOT'],
        STYLES: ['A2SM_CrmnlHspot_Tot_Tot'],
        FORMAT: 'image/png',
        EXCEPTIONS: 'text/xml',
        TRANSPARENT: 'TRUE',
        APIKEY: process.env.REACT_APP_BJG_API_KEY,
    };

    const bjgLayer = new TileLayer({
        source: new TileWMS({
            url: 'https://www.safemap.go.kr/openApiService/wms/getLayerData.do',
            params: bjg_Param,
        }),
        visible: isBjgLayerVisible,
    });

    const baseLayer = new TileLayer({
        name: 'Base',
        visible: true,
        source: new XYZ({
            url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.REACT_APP_BASE_MAP_API_KEY}/Base/{z}/{y}/{x}.png`,
            preload: 10,
        }),
    });

    const view = new View({
        projection: 'EPSG:3857',
        center: fromLonLat([127.7, 36.1]),
        zoom: 7.5,
        minZoom: 7,
        maxZoom: 22,
        extent: [
            fromLonLat([120.5, 33.0])[0], // 왼쪽 (서쪽)
            fromLonLat([120.5, 33.0])[1], // 아래 (남쪽)
            fromLonLat([135.0, 38.5])[0], // 오른쪽 (동쪽)
            fromLonLat([135.0, 38.5])[1]  // 위 (북쪽)
        ],
    });

    return new OlMap({
        controls: defaultControls({ zoom: false, rotate: false }).extend([]),
        layers: [baseLayer, bjgLayer],
        target: target,
        view: view,
    });
};