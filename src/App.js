// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import SignupPage from './pages/SignupPage';

import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';

import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // antd 컴포넌트 전역 폰트 설정
          fontFamily: 'The Jamsil, sans-serif',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/:noticeId" element={<NoticeDetail />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
