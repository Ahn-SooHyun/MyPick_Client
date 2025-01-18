import React from 'react';
import './AdminNotice.css';

// 공지사항 데이터를 배열로 정의
const notices = [
    { id: 1, title: '공지사항 1', content: '첫 번째 공지사항 내용입니다.' },
    { id: 2, title: '공지사항 2', content: '두 번째 공지사항 내용입니다.' },
    { id: 3, title: '공지사항 3', content: '세 번째 공지사항 내용입니다.' },
];

// 공지사항 컴포넌트
function AdminNoticeBoard() {
    return (
        <div className="admin-notice-list-container">
            <h1>공지사항 게시판</h1>
            <ul>
                {notices.map(notice => (
                    <li key={notice.id}>
                        <h2>{notice.title}</h2>
                        <p>{notice.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminNoticeBoard;
