import React, { useState } from 'react';
import './AdminNotice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// 모달 컴포넌트
function Modal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClose = () => {
        setTitle('');
        setContent('');
        onClose();
    };



    const handleAdd = () => {
        if (title && content) {
            onAdd(title, content);
            setTitle('');
            setContent('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="admin-notice-modal">
            <div className="admin-notice-modal-content">
                <h2>공지사항 추가</h2>
                <div className="exit" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />닫기
                </div>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="notice-content"
                />
                <button className="add-button" onClick={handleAdd}>추가</button>
                <button className="cancel-button" onClick={onClose}>취소</button>
            </div>
        </div>
    );
}









// 공지사항 컴포넌트
function AdminNoticeBoard() {
    const [notices, setNotices] = useState([
        { id: 1, title: '공지사항 1', content: '첫 번째 공지사항 내용입니다.' },
        { id: 2, title: '공지사항 2', content: '두 번째 공지사항 내용입니다.' },
        { id: 3, title: '공지사항 3', content: '세 번째 공지사항 내용입니다.' },
    ]);
    const [openNoticeId, setOpenNoticeId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNotice = (id) => {
        setOpenNoticeId(openNoticeId === id ? null : id);
    };

    const addNotice = (title, content) => {
        const newNotice = {
            id: notices.length + 1,
            title,
            content,
        };
        setNotices([...notices, newNotice]);
    };

    return (
        <div className="admin-notice-list-container">
            <h1 className="notice-title">공지사항 게시판</h1>
            {/** 검색 영역 */}
            <div className="controls">
                <div className="left-controls">
                    <input
                        type="text"
                        placeholder="제목 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button">검색</button>
                </div>
                <button className="add-button"
                onClick={() => setIsModalOpen(true)}>공지사항 추가</button>
            </div>

            {/** 공지사항 목록 */}
            <ul>

                {notices.filter(notice => notice.title.toLowerCase().includes(searchTerm.toLowerCase())).map(notice => (
                    <li key={notice.id} className="notice-item"
                    onClick={() => toggleNotice(notice.id)}
                    >
                        <h2
                            className={`notice-header ${openNoticeId === notice.id ? 'active' : ''}`}
                        >
                            <div className="notice-header-content">
                                <span>
                                    {notice.title}
                                </span>
                                <button 
                                    className="delete-button"
                                    onClick={() => {
                                        setNotices(notices.filter(n => n.id !== notice.id));
                                        if (openNoticeId === notice.id) {
                                            setOpenNoticeId(null);
                                        }
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        </h2>
                        {openNoticeId === notice.id && (
                            <p className="notice-content">
                                {notice.content}
                            </p>
                        )}
                    </li>
                ))}

            </ul>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addNotice} />
        </div>
    );
}

export default AdminNoticeBoard;
