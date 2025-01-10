import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.css'; // 별도의 CSS 파일 추가를 권장

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // 검색 핸들러
  const handleSearch = () => {
    const user = users.find((u) => u.email === searchEmail);
    if (user) {
      setSelectedUser(user);
    } else {
      alert('User not found.');
    }
  };

  // 정지 기능
  const handleSuspend = (id) => {
    axios.post(`/api/users/${id}/suspend`)
      .then(() => {
        alert('User suspended successfully.');
        setUsers(users.map((user) =>
          user.id === id ? { ...user, status: 'suspended' } : user
        ));
      })
      .catch((error) => {
        console.error('Error suspending user:', error);
      });
  };

  return (
    <div className="App-header">
      <h1>회원 관리</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="이메일로 검색"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {selectedUser && (
        <div className="user-detail">
          <h2>회원 정보</h2>
          <p>이름: {selectedUser.name}</p>
          <p>이메일: {selectedUser.email}</p>
          <p>상태: {selectedUser.status}</p>
          <button onClick={() => handleSuspend(selectedUser.id)}>회원 정지</button>
        </div>
      )}

      <div className="user-list">
        <h2>전체 회원 목록</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleSuspend(user.id)}>정지</button>
                  <button>채팅 기록 보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
