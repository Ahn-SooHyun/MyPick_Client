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
          <Route path="/" element={<Main />} />

          <Route path="/admin" element={<AdminMain />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/signUp" element={<MinWow />} />

          <Route path="/myPage" element={<MyPage />} />

          <Route path="/noticeDetail/:noticeId" element={<NoticeDetail />} />
          <Route path="/noticeList" element={<NoticeList />} />

          {/* (추가) MyPage 라우트 */}
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
