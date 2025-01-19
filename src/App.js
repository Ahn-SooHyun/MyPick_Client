// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

//=======================================
//Main
import Main from "./JS/main/Main";

//================================================
//Admin
import AdminMain from "./JS/admin/AdminMain";
import MainPage from './JS/main/Main';

import MyPageContainer from './pages/MyPageContainer';

//=======================================
//login
import Login from "./JS/login/LoginPage";

//=======================================
//MyPage

import MyPage from "./JS/myPage/MyPage";

//=======================================
//Notice
import NoticeDetail from "./JS/notice/NoticeDetail";
import NoticeList from "./JS/notice/NoticeList";

//=======================================
//Chat
import ChatPage from "./JS/chat/ChatPage";

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
          <Route path="/" element={<MainPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/:noticeId" element={<NoticeDetail />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route path="/admin" element={<AdminMain />} />

          <Route path="/Login" element={<Login />} />

          <Route path="/myPage" element={<MyPage />} />

          <Route path="/noticeDetail/:noticeId" element={<NoticeDetail />} />
          <Route path="/noticeList" element={<NoticeList />} />

          <Route path="/chat" element={<ChatPage />} />
          {/* (추가) MyPage 라우트 */}
          <Route path="/mypage2" element={<MyPageContainer />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
