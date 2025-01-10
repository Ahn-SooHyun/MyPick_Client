import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';

import SignupPage from './pages/SignupPage';

import LoginPage from './pages/LoginPage';


import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';

import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminNotices from './pages/Admin/AdminNotices';
import AdminSettings from './pages/Admin/AdminSettings';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/Login" element={<LoginPage />} />

        <Route path="/notice" element={<NoticeList/>} />
        <Route path="/notice/:noticeId" element={<NoticeDetail/>} />

        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/admin/AdminUsers" element={<AdminUsers />} />
        <Route path="/admin/AdminNotices" element={<AdminNotices />} />
        <Route path="/admin/AdminSettings" element={<AdminSettings />} />

      </Routes>
    </Router>
  );
  
}


export default App;
