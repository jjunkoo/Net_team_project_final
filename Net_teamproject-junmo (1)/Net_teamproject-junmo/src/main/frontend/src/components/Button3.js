import React from 'react';
import './Button3.css';
import buttonImage from './button3Image.png';
import { useNavigate } from 'react-router-dom';
function Button3(){
    const navigate = useNavigate();
    const gosearch = () => {
        navigate('/search');
    }
    return(
       <button className="custom-button3" onClick={gosearch}>
            <img src={buttonImage} alt="버튼3이미지" />
            <span>후기 검색</span>
            <description>여행에 참고할 후기를 검색할 수 있습니다.</description>
        </button>
    );
}

export default Button3;