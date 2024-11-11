import React, { useEffect, useState } from 'react';
import { selectBOX } from './selectBOX';
import './selectBox.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import X from '../../Map/MarkerImg/x_icon.png';
import Menu from '../../Map/MarkerImg/menu_icon.png';
import Logo from '../../Map/MarkerImg/marker.png';


export function RealEstate({ onResult }) {  // props로 onResult 받기
    const [result, setResult] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedGubun, setSelectedGubun] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        selectBOX();

        // 페이지 로드 후 3초(3000ms) 후에 사이드바가 자동으로 펼쳐지도록 설정
        const timer = setTimeout(() => {
            setSidebarOpen(true); // 5초 후 사이드바 열기(지도 로딩 시간)
        }, 5000);

        // 컴포넌트가 언마운트될 때 타이머를 정리하는 코드
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        let sido = $("#sido1 option:selected").val();
        let gugun = $("#gugun1 option:selected").val();
        if (sido === "시/도 선택") {
            Swal.fire({
                icon: 'warning',
                title: "오류",
                html: "시/도를 선택해주세요."
            });
        } else if (gugun === "구/군 선택") {
            Swal.fire({
                icon: 'warning',
                title: "오류",
                html: "구/군을 선택해주세요."
            });
        } else {
            // 체크된 gubun 값을 가져옵니다
            const selectedGubunValues = Array.from(document.querySelectorAll("input[name='gubun']:checked")).map(input => input.value);

            if (selectedGubunValues.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: "오류",
                    html: "적어도 하나의 CCTV 유형을 선택해주세요."
                });
                return;
            }

            const result = `${sido} ${gugun}`;
            setResult(result);
            onResult(result, selectedGubunValues);  // 부모에게 result 전달
            setSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleGubunChange = (event) => {
        const { value, checked } = event.target;
        setSelectedGubun(prevState =>
            checked ? [...prevState, value] : prevState.filter(gubun => gubun !== value)
        );
    };

    // 전체 선택 버튼을 토글하는 함수
    const handleSelectAllChange = () => {
        setSelectAll(prevState => !prevState);
        const checkboxes = document.querySelectorAll("input[name='gubun']");
        const isChecked = !selectAll; // 버튼이 클릭될 때마다 반전시켜서 선택 상태 관리

        // 모든 체크박스를 선택하거나 해제합니다.
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });

        // selectedGubun 상태 업데이트
        if (isChecked) {
            const allValues = Array.from(checkboxes).map(input => input.value);
            setSelectedGubun(allValues);
        } else {
            setSelectedGubun([]);
        }
    };

    return (
        <div>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                    <img 
                        src={sidebarOpen ? X : Menu} 
                        alt="Toggle" 
                    />
                </button>

                <div className="logo-section">
                    <img src={Logo} alt="Site Logo" className="logo" />
                    <h1 className="site-name">CCTV 한눈에 보기</h1>
                </div>
                <hr className="divider" /> {/* 구분선 */}

                <div className='selectBox'>
                    <select className='box' name="sido1" id="sido1"></select>
                    <select className='box' name="gugun1" id="gugun1"></select>
                    
                    {/* 전체 선택 버튼 */}
                    <div className="select-all">
                        <button
                            className={`select-all-btn ${selectAll ? 'active' : ''}`} 
                            onClick={handleSelectAllChange}
                        >
                            {selectAll ? '선택 해제' : '전체 선택'}
                        </button>
                    </div>

                    {/* gubun 체크박스 */}
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label><input type="checkbox" value="생활방범" name="gubun" onChange={handleGubunChange} /> 생활방범</label>
                            <label><input type="checkbox" value="교통단속" name="gubun" onChange={handleGubunChange} /> 교통단속</label>
                            <label><input type="checkbox" value="차량방범" name="gubun" onChange={handleGubunChange} /> 차량방범</label>
                            <label><input type="checkbox" value="재난재해" name="gubun" onChange={handleGubunChange} /> 재난재해</label>
                        </div>
                        <div className="checkbox-column">
                            <label><input type="checkbox" value="쓰레기단속" name="gubun" onChange={handleGubunChange} /> 쓰레기단속</label>
                            <label><input type="checkbox" value="시설물관리" name="gubun" onChange={handleGubunChange} /> 시설물관리</label>
                            <label><input type="checkbox" value="어린이보호" name="gubun" onChange={handleGubunChange} /> 어린이보호</label>
                            <label><input type="checkbox" value="다목적" name="gubun" onChange={handleGubunChange} /> 다목적</label>
                            <label><input type="checkbox" value="기타" name="gubun" onChange={handleGubunChange} /> 기타</label>
                        </div>
                    </div>
                    
                    <input className='btn1' type="button" name="btn" id="btn" value="검색" onClick={handleClick} />
                </div>
            </div>
        </div>
    );
}
