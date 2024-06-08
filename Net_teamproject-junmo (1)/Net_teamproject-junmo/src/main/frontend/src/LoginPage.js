import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // axios 추가
import "./LoginPage.css"

function handleImageUpload(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('profileImg').src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

const centerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const inputStyle = {
  height: '36px',
  width: '320px',
  margin: '10px',
};

const buttonStyle = {
  width: '320px',
  height: '36px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const disabledButtonStyle = {
  ...buttonStyle,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  backgroundColor: '#ccc',
};

const underlineStyle = {
  textDecoration: 'none',
};

const bigBoxStyle = {
  width: '400px',
  padding: '20px',
  border: '2px solid #ccc',
  borderRadius: '8px',
  marginBottom: '20px',
};

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


const Home = () => (
  <div className="App" style={centerStyle}>
    <h2>홈페이지</h2>
    <Link to="/login" className="button">로그인</Link>
    <Link to="/mypage" className="button">마이페이지</Link>
  </div>
);

const Login = () => {

  const [id, setId] = useState('');  // 상태 추가
  const [password, setPassword] = useState('');  // 상태 추가
  const navigate = useNavigate();
  // 로그인 처리 메소드 추가
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { id, password },{ headers : { skipAuth:true }});
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem('authToken',token);
      alert('로그인 성공');
      navigate('/');
      // 추가적인 로직 (예: 토큰 저장)
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
  };

  return(
  <div className="App" style={centerStyle}>
    <HomeButton />
    <BackButton />
    <h2>로그인</h2>
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} method = "POST">
    <input type="text" placeholder="아이디" className="input-field" style={inputStyle} onChange={(e) => setId(e.target.value)} />
    <input type="password" placeholder="비밀번호" className="input-field" style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
    <button type = "submit" className="button" style={buttonStyle}>로그인</button>
    </form>
    <Link to="/signup" className="button">회원가입</Link>
  </div>
);
}
const Signup = () => {

  const [name, setName] = useState('');  // 수정된 부분
  const [id, setId] = useState('');  // 수정된 부분
  const [password, setPassword] = useState('');  // 수정된 부분
  const navigate = useNavigate();
  // 회원가입 처리 메소드 추가
  const handleRegister = async () => {
      try {
          // Axios post 요청 시, 데이터 뒤에 올바른 형식으로 헤더 객체 추가
          const response = await axios.post('http://localhost:8080/api/signup', { name, id, password }, {
              headers: {
                  skipAuth: true // 인터셉터 건너뛰기
              }
          });
          console.log(response.data);
          navigate('/signup/success');
          // 추가적인 로직 (예: 회원가입 성공 알림)
      } catch (error) {
          console.error(error);
      }
  };


  return(
  <div className="App" style={centerStyle}>
    <HomeButton />
    <BackButton />
    <h2>회원가입</h2>
    <input type="text" placeholder="닉네임" className="input-field" style={inputStyle} onChange={(e) => setName(e.target.value)} />
    <input type="text" placeholder="아이디" className="input-field" style={inputStyle} onChange={(e) => setId(e.target.value)} />
    <input type="password" placeholder="비밀번호" className="input-field" style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
    <button className="button" style={{ ...buttonStyle, ...underlineStyle }} onClick={handleRegister}>회원가입</button>
  </div>
);
}
const SignupSuccess = () => {
  return(
  <div className="App" style={centerStyle}>
    <HomeButton />
    <h2>회원가입 완료</h2>
    <p>회원가입이 성공적으로 완료되었습니다</p>
  </div>
);
}
const ScheduleButton = ({ id }) => {
    const navigate = useNavigate();
    const goSchedule = () => {
        if (id != null) {
            navigate('/mypage/schedule', { state: { profileId: String(id) } });
        } else {
            console.error("Invalid ID:", id);
        }
    };
    return (
        <button className="button10" onClick={goSchedule}>내 일정</button>
    );
};
const ReviewButton = ({ id }) => {
    const navigate = useNavigate();
    const goReview = () => {
        if (id != null) {
            navigate('/mypage/reviews', { state: { profileId: String(id) } });
        } else {
            console.error("Invalid ID:", id);
        }
    };
    return (
        <button className="button10" onClick={goReview}>내 후기</button>
    );
};
const Mypage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user');
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return(
  <div className="App" style={centerStyle}>
    <HomeButton />
    <BackButton />
    <h2>Mypage</h2>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ margin: '20px', position: 'relative', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #ccc' }}>
        <input type="file" accept="image/*" style={{ width: '100%', height: '100%', opacity: 0, position: 'absolute', top: 0, left: 0, cursor: 'pointer' }} onChange={handleImageUpload} />
        <img id="profileImg" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMjFfMjA2%2FMDAxNzA1NzkwNTM5Mjc4.JS2XVIK51_1ABbjrLzcS_O8CkachNWnbSukQkl0aNGAg.iHfXNBUrAqMb-_iOqw7VBbyyeGUIGIJHTYwMdVly2O0g.JPEG.shinejelee%2FIMG_6187.jpg&type=a340" alt="프로필 설정" style={{ width: '150%', height: '150%', objectFit: 'cover' }} />
      </div>

      {user &&<div className="button11">닉네임 : {user.user.name}</div>}
      {user && <ScheduleButton id={user.profileId} />}
      {user && <ReviewButton id={user.profileId} />}
    </div>
  </div>
);
}
const Button2 = ({ title, id }) => {
    const navigate = useNavigate();
    const goSchedule = () => {
        if (id != null) {
            navigate('/schedules', { state: { scheduleId: String(id) } });
        } else {
            console.error("Invalid ID:", id);
        }
    };
    return (
        <button className="button2" onClick={goSchedule}>{title}</button>
    );
};
const Button1 = ({ content, id }) => {
    const navigate = useNavigate();
    const goReview = () => {
        if (id != null) {
            navigate('/review', { state: { reviewId: String(id) } });
        } else {
            console.error("Invalid ID:", id);
        }
    };
    return (
        <button className="button2" onClick={goReview}>{content}</button>
    );
};
const Schedule = () => {
const[schedule,setSchedule] = useState([]);
const location = useLocation();
const { profileId } = location.state || {};
useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mypage/schedules/${profileId}`);
        console.log('Fetched review:', response.data); // 상태 업데이트 확인용 콘솔 로그
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchSchedule();
  },[profileId]);
  return(
  <div className="App" style={centerStyle}>
    <HomeButton />
    <BackButton />
    <h2>내 일정</h2>

    {schedule ? (
                    schedule.map((schedule, index) => (
                        <div key={index} className="review-item">
                            <Button2 title={schedule.title} id={schedule.id} />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
  </div>
);
}


const Reviews = () => {
    const [reviewData, setReviewData] = useState(null);
    const location = useLocation();
    const { profileId } = location.state || {};

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mypage/reviews/${profileId}`);
                console.log('Fetched review:', response.data); // 상태 업데이트 확인용 콘솔 로그
                setReviewData(response.data);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };

        fetchReview();
    }, [profileId]);

    return (
        <div className="App" style={centerStyle}>
            <HomeButton />
            <BackButton />
            <h2>작성한 후기</h2>
            {reviewData ? (
                reviewData.map((review, index) => (
                    <div key={index} className="review-item">
                        <Button1 content={review.content} id={review.review_id} />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export {Mypage,Login,Signup,SignupSuccess,Schedule,Reviews};

// 합쳤을 때 수정해야되는 점: 1. 각각의 작성한 후기나 내 일정을 link
//                           2. 모두 버튼이나 상자의 크기가 다를테니 통일


// 서버가 생겼을 때 수정해야되는 점: 1. 작성한 후기나 내 일정의 작성한 숫자에 따른 상자 수 증가
//                                 2. 서버에서 글의 제목을 받아 표시
//                                 3. 닉네임 칸 또한 서버의 데이터베이스를 받아서 표시
