import './App.css'; //css파일주소 import
import {Routes,Route} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Review from './Review';
import Make from './Make';
import {Mypage,Login,Signup,SignupSuccess,Schedule,Reviews} from './LoginPage';
import Homepage from './Homepage';
import WriteReview from './WriteReview';
import SearchReview from './SearchReview';
import Schedules from './Schedules';
import axios from 'axios';
import ChatPage from "./ChatPage.tsx";
import WriteMapPage from './components/WriteMapPage.tsx';
import React, { useState } from 'react';


function App() {
  const [address, setAddress] = useState(null);

  const handleSetAddress = (newAddress) => {
      setAddress(newAddress);
      console.log("Selected Address:", newAddress);
  };

  axios.interceptors.request.use(
      config => {
          if (config.headers.skipAuth) {
                      return config;
                  }
          const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
          if (token) {
              config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
          }
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

  return (
      <div>
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/writereview" element={<WriteReview />} />
              <Route path="/search" element={<SearchReview />} />
              <Route path="/review" element={<Review />} />
              <Route path="/make" element={<Make />} />
              <Route path="/ChatPage" element={<ChatPage setAddress={handleSetAddress} />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/success" element={<SignupSuccess />} />
              <Route path="/mypage/schedule" element={<Schedule />} />
              <Route path="/mypage/reviews" element={<Reviews />} />
              <Route path="/map" element={<WriteMapPage setAddress={handleSetAddress} />} />
              <Route path="/schedules" element={<Schedules />} />
          </Routes>
      </div>
  );
}

export default App;

