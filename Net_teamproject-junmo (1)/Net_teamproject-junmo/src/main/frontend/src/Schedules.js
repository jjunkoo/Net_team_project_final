import { useNavigate , useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Schedules.css";
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
const DeleteButton = ({ scheduleId, onSuccess }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('이 일정을 삭제하시겠습니까?')) {  // 사용자에게 삭제 확인 요청
            try {
                const response = await axios.delete(`http://localhost:8080/schedules/${scheduleId}`);
                if (response.status === 200) {
                    alert('일정이 성공적으로 삭제되었습니다.');
                    onSuccess();  // 성공 콜백 함수 호출
                }
            } catch (error) {
                console.error('Error deleting schedule:', error);
                alert('일정 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <button className="button" onClick={handleDelete}>삭제</button>
    );
};
function Schedules(){
const [schedule, setSchedule] = useState([]);
const location = useLocation();
const { scheduleId } = location.state || {};
const navigate = useNavigate();

useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/schedules/${scheduleId}`);
        console.log('Fetched review:', response.data); // 상태 업데이트 확인용 콘솔 로그
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchSchedule();
  },[scheduleId]);
  const handleDeleteSuccess = () => {
          // 홈으로
          navigate('/');
      };
  if (!scheduleId) {
    return <div>Invalid ID</div>;
  }
  if (!schedule) return <div>Loading...</div>;
    return(
        <div>
    <HomeButton/>
    <BackButton/>
    <h1 className="title">일정 제목:{schedule.title}</h1>
        <div>
        <div className = "left_flex">
        <div className="Date">날짜</div>
        <div className="time">시간</div>
        <div className="sche">일정</div>
        </div>
        {Array.isArray(schedule?.entries) ? schedule.entries.map(entries=>(<div key={entries.id}>
            <div className="left_flex">
            <div className="Date">{entries.date}</div>
            <div className="time">{entries.time}</div>
            <div className="sche">{entries.content}</div>
            </div>
            </div>
            )) : <p>No entries available.</p>}
            </div>
            <DeleteButton scheduleId={scheduleId} onSuccess={handleDeleteSuccess} />
    </div>
    );
}
export default Schedules;