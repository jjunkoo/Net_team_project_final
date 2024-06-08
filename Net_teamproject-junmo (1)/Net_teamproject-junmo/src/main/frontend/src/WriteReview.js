import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Review.css'; // CSS 파일 주소 import
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
function WriteReview() {
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [tag, setTag] = useState('');
  const [review_img, setImgFile] = useState('');
  const imgRef = useRef();
  const navigate = useNavigate();
 useEffect(() => {
    console.log("이미지 파일:", review_img);
  }, [review_img]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/writereview', {
        content,
        place,
        tag,
        review_img
      });
      console.log("데이터 :", response.data);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const ImageUpload = () => {
    return (
      <>
        <input
          className="imageupload"
          type="file"
          accept="image/*"
          id="imageup"
          onChange={saveImgFile}
          ref={imgRef}
        />
      </>
    );
  };

  return (
    <div>
      <HomeButton/>
      <BackButton/>
      <h1 className='title'>후기를 작성해보세요!</h1>
      <div className='full'>
        <form onSubmit={handleSubmit}>
          <div className='leftpart'>
            <div className='centerrelocate'>
              <div className='imgboxboder'>
                <img
                  className='imgbox'
                  src={review_img ? review_img : `/images/icon/user.png`}
                  alt="이미지"
                />
              </div>
              <label className="imagename" htmlFor="imageup">이미지 업로드</label>
              <ImageUpload />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='textbox2'
                placeholder="본문"
              ></textarea>
            </div>
          </div>
          <div className='rightpart'>
            <div className='tagpart'>
              <textarea
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className='textbox3'
                placeholder="장소"
              ></textarea>
              <textarea
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className='textbox4'
                placeholder="태그"
              ></textarea>
            </div>
            <div>
              <button type='submit' className='button1'>후기작성</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReview;
