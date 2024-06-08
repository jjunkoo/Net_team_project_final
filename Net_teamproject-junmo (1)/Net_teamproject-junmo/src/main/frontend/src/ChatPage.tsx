import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import WriteMapPage from './ChatMap/Map.tsx';
import Chatting from './ChatMap/Chatting';
import './ChatPage.css';
import './ChatMap/index_Chatting.css'
const HomeButton = () => (
  <div style={{ position: 'absolute', left: '10px', top: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <button className="button" style={{ width: '36px', height: '36px', marginBottom: '10px' }}>홈</button>
    </Link>
  </div>
);
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'absolute', left: '56px', top: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button className="button" style={{ width: '36px', height: '36px', marginBottom: '10px' }} onClick={() => navigate(-1)}>back</button>
    </div>
  );
};
interface Props {
  setAddress: (newAddress: any) => void;
}

const ChatPage: React.FC<Props> = ({ setAddress }) => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="chat-page">
    <HomeButton/>
    <BackButton/>
      <div className="map-container">
        <WriteMapPage setAddress={setAddress} /> {}
      </div>
      <div className="chat-container"> {}
        <Chatting />
      </div>
    </div>
  );
};

export default ChatPage;
