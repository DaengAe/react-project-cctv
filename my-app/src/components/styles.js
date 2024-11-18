import { Style, Icon, Circle, Stroke, Fill, Text } from 'ol/style';
import MarkerImg from '../Map/MarkerImg/marker.png';
import MarkerImg2 from '../Map/MarkerImg/marker3.png';
import MarkerImg3 from '../Map/MarkerImg/marker4.png';
import MarkerImg4 from '../Map/MarkerImg/car1.png';
import MarkerImg5 from '../Map/MarkerImg/car2.png';
import MarkerImg6 from '../Map/MarkerImg/danger.png';
import MarkerImg7 from '../Map/MarkerImg/trash.png';
import MarkerImg8 from '../Map/MarkerImg/building.png';
import MarkerImg9 from '../Map/MarkerImg/kid.png';

const markerMap = {
    '생활방범': MarkerImg,
    '다목적': MarkerImg2,
    '기타': MarkerImg3,
    '교통단속': MarkerImg4,
    '차량방범': MarkerImg5,
    '재난재해': MarkerImg6,
    '쓰레기단속': MarkerImg7,
    '시설물관리': MarkerImg8,
    '어린이보호': MarkerImg9,
};

//마커 스타일
export const createStyle = (src) => {
    return new Style({
        image: new Icon({
            src: src,
            offset: [0, 0],
            scale: 0.07,
        }),
    });
};

//마커 구분 별 스타일 지정
export const getStyleByType = (type) => {
    const src = markerMap[type] || MarkerImg; // 기본 이미지 지정
    return createStyle(src);};

    
//클러스터 스타일 지정
export const createClusterStyle = (size) => {
    let style;
    const createCircleStyle = (radius, color) => {
        style = new Style({
            image: new Circle({
                radius: radius,
                stroke: new Stroke({
                    color: '#fff',}),
                fill: new Fill({
                    color: color,}),
            }),
            text: new Text({
                text: size.toString(),
                fill: new Fill({
                    color: '#fff',}),
                scale: 1.75,
            }),
        });
    };
    if (size === 1) {
        return null; // 클러스터가 아닌 경우는 null 반환
    } else if (size < 10) {
        createCircleStyle(20 + size, 'rgba(144, 202, 75, 0.9)');
    } else if (size < 100) {
        createCircleStyle(30 + size / 10, 'rgba(247, 186, 75, 0.9)');
    } else if (size < 1000) {
        createCircleStyle(40 + size / 100, 'rgba(255, 114, 63, 0.9)');
    } else {
        createCircleStyle(55, 'rgba(255, 70, 50, 0.9)');
    }
    return style;
};

//팝업창에 보여질 내용 구성
export const createInfoHTML = ({ Address1, Address2, Gubun, Camera, Bogwan, MakeDate, Number }) => `
    <div style="text-align: left; margin: 10px 10px 0; padding: 0 10px; line-height: 30px;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 0 7px;">
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">도로명 주소</th>
                <td style="vertical-align: top;">${Address1 || '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">지번 주소</th>
                <td style="vertical-align: top;">${Address2 || '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">설치 목적</th>
                <td style="vertical-align: top;">${Gubun || '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">카메라 대수</th>
                <td style="vertical-align: top;">${Camera ? Camera + '대' : '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">보관 일수</th>
                <td style="vertical-align: top;">${Bogwan ? Bogwan + '일' : '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">설치 연월</th>
                <td style="vertical-align: top;">${MakeDate || '정보 없음'}</td>
            </tr>
            <tr>
                <th style="width: 32%; text-align: left; font-weight: bold; vertical-align: top;">기관 전화번호</th>
                <td style="vertical-align: top;">${Number || '정보 없음'}</td>
            </tr>
        </table>
    </div>
`;