import React from 'react';
import './Button2.css';
import buttonImage from './button2Image.png';
import { useNavigate } from 'react-router-dom';
function Button2(){
    const navigate = useNavigate();
    const gopage = () => {
        navigate('/map');
    }
    return(
       <button className="custom-button2" onClick={gopage}> 
            <img src={buttonImage} alt="버튼2이미지" />
            <span>장소 검색</span>
            <description>여행 장소를 지도로 검색 할 수 있습니다.</description>
        </button>
    );
}

export default Button2;