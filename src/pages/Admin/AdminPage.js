// src/pages/AdminPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>관리자 메뉴</h2>
        <ul>
          <li><Link to="/admin/AdminUsers">사용자 관리</Link></li>
          <li><Link to="/admin/AdminNotices">공지 관리</Link></li>
          <li><Link to="/admin/AdminSettings">설정</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
