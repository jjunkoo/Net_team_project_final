import React from 'react';
import './ButtonMypage.css';
import { useNavigate } from 'react-router-dom';
function ButtonLogin(){
    const navigate = useNavigate();
    const gologin = () => {
        navigate('/login');
    }
    return(
       <button className="custom-buttonMypage" onClick={gologin}>
            <span>로그인</span>
        </button>
    );
}

export default ButtonLogin;