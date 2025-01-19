// App.js
<<<<<<< HEAD
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
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

//=======================================
//Main
import Main from "./JS/main/Main";

//================================================
//Admin
import AdminMain from "./JS/admin/AdminMain";
>>>>>>> d765ada5c4042ee053fe026e0ccc9677f96536f6

//=======================================
//login
import Login from "./JS/login/LoginPage";
//SignUp
import MinWow from "./JS/signUp/SignupPage";

//=======================================
//MyPage

import MyPage from "./JS/myPage/MyPage";

//=======================================
//Notice
import NoticeDetail from "./JS/notice/NoticeDetail";
import NoticeList from "./JS/notice/NoticeList";

//=======================================
//Chat


import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "The Jamsil, sans-serif",
        },
      }}
    >
      <Router>
        <Routes>
<<<<<<< HEAD
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
=======
          <Route path="/" element={<Main />} />

          <Route path="/admin" element={<AdminMain />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/signUp" element={<MinWow />} />

          <Route path="/myPage" element={<MyPage />} />

          <Route path="/noticeDetail/:noticeId" element={<NoticeDetail />} />
          <Route path="/noticeList" element={<NoticeList />} />

          {/* (추가) MyPage 라우트 */}
>>>>>>> d765ada5c4042ee053fe026e0ccc9677f96536f6
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
