import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Link 추가
import './AdminChat.css';

function AdminChat() {
  const { state } = useLocation(); // 전달된 state 데이터
  const { userId, userName } = state || {}; // 사용자 정보

  const [chatRecords, setChatRecords] = useState([]); // 채팅 기록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 채팅 기록 불러오기
  const fetchChatRecords = async () => {
    if (userId && userName) {
      try {
        setLoading(true);
        const response = await axios.post('/api/admin/chats', { id: userId, name: userName }); // 관리자용 채팅 기록 API 호출
        if (response.data.code === '200') {
          setChatRecords(response.data.records.sort((a, b) => new Date(b.time) - new Date(a.time))); // 최신순 정렬
        } else {
          alert('채팅 기록 불러오기 실패');
        }
      } catch (err) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', err);
        setError('채팅 기록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchChatRecords(); // 컴포넌트 렌더링 시 데이터 불러오기
  }, [userId, userName]);

  return (
    <div className="admin-chat">
      <h1>{userName}님의 채팅 기록</h1>
      <h2>ID: {userId}</h2>

      {loading ? (
        <p className="loading">로딩 중...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="chat-list">
          {chatRecords.length > 0 ? (
            chatRecords.map((record, index) => (
              <li key={index} className="chat-record">
                <p><strong>시간:</strong> {record.time}</p>
                <p><strong>내용:</strong> {record.message}</p>
              </li>
            ))
          ) : (
            <p>채팅 기록이 없습니다.</p>
          )}
        </ul>
      )}

      {/* 경로를 /AdminUsers로 수정 */}
      <Link to="/admin/AdminUsers" className="back-link">
        회원 관리 페이지로 돌아가기
      </Link>
    </div>
  );
}

export default AdminChat;
