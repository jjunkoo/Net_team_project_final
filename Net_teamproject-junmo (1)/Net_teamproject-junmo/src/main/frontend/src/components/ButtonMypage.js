import React from 'react';
import './ButtonMypage.css';
import { useNavigate } from 'react-router-dom';
function ButtonMypage(){
    const navigate = useNavigate();
    const gomypage = () => {
        navigate('/mypage');
    }
    return(
       <button className="custom-buttonMypage" onClick={gomypage}>
            <span>마이페이지</span>
        </button>
    );
}

export default ButtonMypage;