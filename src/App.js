import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import TestMainPage from './pages/TestMainPage'
import SignupPage from './pages/SignupPage';

import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/main" element={<TestMainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notice" element={<NoticeList/>} />
        <Route path="/notice/:noticeId" element={<NoticeDetail/>} />
      </Routes>
    </Router>
  );
  
}


export default App;
