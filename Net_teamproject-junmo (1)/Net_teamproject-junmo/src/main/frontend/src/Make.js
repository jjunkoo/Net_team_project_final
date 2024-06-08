import React, { useState } from 'react';
import './Make.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeButton = () => (
  <div className="button-container">
    <Link to="/" style={{ textDecoration: 'none' }}>
      <button className="home-button">홈</button>
    </Link>
  </div>
);

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="button-container" style={{ left: '70px' }}>
      <button className="back-button" onClick={() => navigate(-1)}>뒤로</button>
    </div>
  );
};

const GoChatting = () => {
  const navigate = useNavigate();
  
  return (
    <button className="chat-button" onClick={() => navigate("/ChatPage")}>채팅으로 이동</button>
  );
};

function Make() {
  const [dates, setDates] = useState(['2024-05-01', '2024-05-02', '2024-05-03']);
  const [times, setTimes] = useState(['08:00', '09:00']);
  const [scheduleContents, setScheduleContents] = useState({
    '2024-05-01': { '08:00': '', '09:00': '' },
    '2024-05-02': { '08:00': '', '09:00': '' },
    '2024-05-03': { '08:00': '', '09:00': '' },
  });
  const navigate = useNavigate();

  const addDateColumn = () => {
    const newDate = new Date();
    const formattedDate = newDate.toISOString().split('T')[0];
    setDates([...dates, formattedDate]);

    const newScheduleContents = { ...scheduleContents };
    newScheduleContents[formattedDate] = {};
    times.forEach(time => {
      newScheduleContents[formattedDate][time] = '';
    });
    setScheduleContents(newScheduleContents);
  };

  const addTimeRow = () => {
    const newTime = '00:00'; // 새로운 시간을 입력해야 함
    setTimes([...times, newTime]);

    const newScheduleContents = { ...scheduleContents };
    Object.keys(newScheduleContents).forEach(date => {
      newScheduleContents[date][newTime] = '';
    });
    setScheduleContents(newScheduleContents);
  };

  const handleContentChange = (date, time, value) => {
    const newScheduleContents = { ...scheduleContents };
    newScheduleContents[date][time] = value;
    setScheduleContents(newScheduleContents);
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);

    const newScheduleContents = { ...scheduleContents };
    Object.keys(newScheduleContents).forEach(date => {
      if (!newScheduleContents[date][value]) {
        newScheduleContents[date][value] = '';
      }
      if (newScheduleContents[date][times[index]]) {
        newScheduleContents[date][value] = newScheduleContents[date][times[index]];
        delete newScheduleContents[date][times[index]];
      }
    });
    setScheduleContents(newScheduleContents);
  };

  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    const oldDate = newDates[index];
    newDates[index] = value;
    setDates(newDates);

    const newScheduleContents = { ...scheduleContents };
    newScheduleContents[value] = newScheduleContents[oldDate];
    delete newScheduleContents[oldDate];
    setScheduleContents(newScheduleContents);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: event.target.scheduleTitle.value,
      dates,
      times,
      scheduleContents
    };

    try {
      const response = await axios.post('http://localhost:8080/make', data);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      navigate('/');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <HomeButton />
        <BackButton />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="scheduleTitle"
            name="scheduleTitle"
            className="title-input"
            placeholder="일정 제목"
            required
          />
          <br /><br />
          <div className="table-container">
            <table id="scheduleTable">
              <thead>
                <tr id="dateRow">
                  <th>시간/날짜</th>
                  {dates.map((date, index) => (
                    <th key={date}><input type="date" value={date} onChange={(e) => handleDateChange(index, e.target.value)} className="large-input" /></th>
                  ))}
                  <th><button type="button" className="add-button large-button" onClick={addDateColumn}>날짜 추가</button></th>
                </tr>
              </thead>
              <tbody id="timeRows">
                {times.map((time, index) => (
                  <tr key={time}>
                    <td><input type="time" value={time} onChange={(e) => handleTimeChange(index, e.target.value)} className="large-input" /></td>
                    {dates.map(date => (
                      <td key={date}>
                        <input
                          type="text"
                          value={scheduleContents[date][time]}
                          onChange={(e) => handleContentChange(date, time, e.target.value)}
                          className="large-input"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={dates.length + 2} style={{ textAlign: 'center' }}>
                    <button type="button" className="add-button large-button" onClick={addTimeRow}>시간 추가</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <button type="submit" className="large-button">작성 완료</button>
          <GoChatting />
        </form>
      </div>
    </div>
  );
}

export default Make;
