// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import SignupPage from './pages/SignupPage';
import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';
import Main from './pages/main/Main';
import MyPageContainer from './pages/MyPageContainer';

import AdminMain from './pages/admin/AdminMain';
// (추가) MyPage import
import MyPage from './pages/MyPage';

import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
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
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* (추가) MyPage 라우트 */}
          <Route path="/mypage2" element={<MyPageContainer />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
