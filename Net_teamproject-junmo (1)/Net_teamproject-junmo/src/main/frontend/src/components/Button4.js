import React from 'react';
import './Button4.css';
import buttonImage from './button4Image.png';
import { useNavigate } from 'react-router-dom';
function Button4(){
    const navigate = useNavigate();
    const gowritereview = () => {
        navigate('/writereview');
    }
    return(
       <button className="custom-button4" onClick={gowritereview}>
            <img src={buttonImage} alt="버튼4이미지" />
            <span>후기 작성</span>
            <description>여행에 대한 후기를 작성할 수 있습니다.</description>
        </button>
    );
}

export default Button4;