import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
// import TestMainPage from './pages/TestMainPage'
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/main" element={<TestMainPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
