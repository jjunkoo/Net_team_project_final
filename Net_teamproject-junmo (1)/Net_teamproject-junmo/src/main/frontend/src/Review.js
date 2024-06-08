import './Review.css'; // CSS 파일 주소 import
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
const Button1 = ({ id }) => {
    const navigate = useNavigate();
    const goSchedule = () => {
        if (id != null) {
            console.log(id)
            navigate('/mypage/schedule', { state: { profileId : String(id) } });
        } else {
            console.error("Invalid ID:", id);
        }
    };
    return (
        <button className="button1" onClick={goSchedule}>일정보기</button>
    );
};
const Button2 = ({ reviewId }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {  // 사용자에게 삭제 확인 요청
            try {
                const response = await axios.delete(`http://localhost:8080/review/${reviewId}`);
                if (response.status === 200) {
                    alert('리뷰가 성공적으로 삭제되었습니다.');
                    navigate('/');  // 삭제 후 홈 페이지로 리다이렉트
                }
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('리뷰 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <button className="button1" onClick={handleDelete}>삭제</button>
    );
};
function Review() {
  const [review, setReview] = useState(null);
  const location = useLocation();
  const { reviewId } = location.state || {};

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/review/${reviewId}`);
        console.log('Fetched review:', response.data); // 상태 업데이트 확인용 콘솔 로그
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [reviewId]);
  if (!reviewId) {
    return <div>Invalid review ID</div>;
  }
  if (!review) return <div>Loading...</div>;

  return (
    <div>
    <HomeButton/>
    <BackButton/>
      <h1 className='title'>후기</h1>
      <div className='full'>
        <div className='review-container'>
          <div className='leftpart'>
            <div className='centerrelocate'>
              <div className='imgboxboder'>
                {review.review_img && (
                  <img
                    className='imgbox'
                    src={review.review_img} // Base64 인코딩된 이미지 렌더링
                    alt="이미지"
                  />
                )}
              </div>
            </div>
            <div>
              <div className='textbox2'>{review.content}</div>
            </div>
          </div>
          <div className='rightpart'>
            <div className='tagpart'>
              <div className='textbox3'>{review.place}</div>
              <div className='textbox4'>{review.tag}</div>
            </div>
            <div>
              <Button1 id={review.user.profileId}/>
              <Button2 reviewId={reviewId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
