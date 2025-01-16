import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';
import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminNotices from './pages/Admin/AdminNotices';
import AdminChat from './pages/Admin/AdminChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/notice/:noticeId" element={<NoticeDetail />} />

        {/* /admin 경로로 변경 */}
        <Route path="/admin" element={<AdminPage />} /> {/* 변경 */}
        <Route path="/admin/AdminUsers" element={<AdminUsers />} />
        <Route path="/admin/AdminNotices" element={<AdminNotices />} />
        <Route path="/admin/AdminChat" element={<AdminChat />} />
      </Routes>
    </Router>
  );
}

export default App;
