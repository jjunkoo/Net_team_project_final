import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./SearchReview.css";
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
const Button1 = ({ content ,id }) => {
    const navigate = useNavigate();
    const goReview = () => {
        if (id != null) {
                    navigate('/review', { state: { reviewId: String(id) } });
                } else {
                    console.error("Invalid ID:", id);
                }
    }
    return (
        <button className="button3" onClick={goReview}>{content}</button>
    );
};

function SearchReview() {
    const [search, setSearch] = useState([]);
    const [reviewTag, setReviewTag] = useState('ㅇㅇ');
    const textareaRef = useRef(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                // 단일 태그에 대해 비동기 요청을 수행
                const response = await axios.get(`http://localhost:8080/search/${reviewTag}`);

                // 응답 데이터 로깅 및 상태 업데이트
                console.log('Fetched reviews:', response.data);
                setSearch(response.data);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };

        fetchReview();
    }, [reviewTag]); // reviewTag가 변경될 때마다 호출

    const handleSearch = () => {
        const newReviewTag = textareaRef.current.value;
        setReviewTag(newReviewTag);
    };

    if (!search.length) 
    return <div className="test">
        <HomeButton/>
        <BackButton/>
        <div>
            <textarea
                className="searchbox"
                ref={textareaRef}
                placeholder="태그를 입력하세요"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
        <h1 className="titlepart">"{reviewTag}" 태그와 관련된 후기들</h1></div>;

    return (
        <div className="test">
        <HomeButton/>
        <BackButton/>
            <div>
                <textarea
                    className="searchbox"
                    ref={textareaRef}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <h1 className="titlepart">"{reviewTag}" 태그와 관련된 후기들</h1>
            <div>
                {search.map((review, index) => (
                    <div key={index} className="review-item">
                        <Button1 content={review.content} id = {review.review_id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchReview;
