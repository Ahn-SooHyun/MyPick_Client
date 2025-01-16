import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css';

function AdminUsers() {
  // 더미 데이터
  const dummyUsers = [
    { id: 'hong@example.com', name: '홍길동', status: 'active', chatLogs: ['Hello', 'Hi'], admin: false, suspendedStartDate: null, suspendedEndDate: null, CT_AT: '2025-01-10' },
    { id: 'kim@example.com', name: '김철수', status: 'suspended', chatLogs: ['Good morning'], admin: false, suspendedStartDate: '2025-01-01', suspendedEndDate: '2025-01-10', CT_AT: '2025-01-01' },
    { id: 'lee@example.com', name: '이영희', status: 'active', chatLogs: [], admin: true, suspendedStartDate: null, suspendedEndDate: null, CT_AT: '2025-01-02' },
  ];

  const [users, setUsers] = useState(dummyUsers);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  const handleSearch = () => {
    const user = users.find((u) => u.id === searchEmail || u.name === searchName);
    if (user) {
      setSelectedUser(user);
    } else {
      alert('User not found.');
    }
  };

  const sendRequest = async (url, method, body) => {
    const token = localStorage.getItem('CT_AT');
    if (!token) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  const handleSuspend = (id) => {
    alert('사용자가 일시정지상태가 되었습니다.');
    setUsers(users.map((user) =>
      user.id === id ? { ...user, status: 'suspended', suspendedStartDate: new Date().toISOString().split('T')[0], suspendedEndDate: null } : user
    ));
  };

  const handleDelete = async (id) => {
    if (window.confirm('이 사용자를 삭제하시겠습니까?')) {
      const requestBody = { id: id };
      const response = await sendRequest('http://192.168.20.23:8081/api/admin/userDel', 'POST', requestBody);

      if (response?.ok) {
        setUsers(users.filter((user) => user.id !== id));
        if (selectedUser && selectedUser.id === id) {
          setSelectedUser(null);
        }
        alert('사용자가 삭제되었습니다.');
      } else {
        alert('계정 삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleAdminRights = (id) => {
    alert('Admin rights updated.');
    setUsers(users.map((user) =>
      user.id === id ? { ...user, admin: !user.admin } : user
    ));
  };

  const handleSuspendDate = async (id) => {
    const suspendStartDate = new Date();
    const suspendPeriod = prompt('정지 기간을 입력하세요 (몇 일 동안 정지):');

    if (suspendPeriod && !isNaN(suspendPeriod) && suspendPeriod > 0) {
      const suspendEndDate = new Date(suspendStartDate);
      suspendEndDate.setDate(suspendStartDate.getDate() + parseInt(suspendPeriod));

      const formattedStartDate = suspendStartDate.toISOString().replace('T', ' ').slice(0, 19);
      const formattedEndDate = suspendEndDate.toISOString().replace('T', ' ').slice(0, 19);

      const requestBody = {
        id: id,
        suspendStartDate: formattedStartDate,
        suspendEndDate: formattedEndDate,
      };

      const response = await sendRequest('http://192.168.20.23:8081/api/admin/suspendUser', 'POST', requestBody);

      if (response?.ok) {
        setUsers(users.map((user) =>
          user.id === id ? {
            ...user,
            suspendedStartDate: formattedStartDate,
            suspendedEndDate: formattedEndDate,
          } : user
        ));
        alert(`User suspended from ${formattedStartDate} to ${formattedEndDate}`);
      } else {
        alert('정지 날짜 설정에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      alert('올바른 정지 기간을 입력해주세요 (양의 숫자).');
    }
  };

  const handleViewChatLogs = (user) => {
    navigate('/admin/AdminChat', { state: { chatLogs: user.chatLogs } });
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
        <input
          type="text"
          placeholder="이름으로 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {selectedUser && (
        <div className="user-detail">
          <h2>회원 정보</h2>
          <p><strong>이름:</strong> {selectedUser.name}</p>
          <p><strong>아이디(이메일):</strong> {selectedUser.id}</p>
          <p><strong>채팅 기록:</strong> {selectedUser.chatLogs.length > 0 ? selectedUser.chatLogs.join(', ') : '없음'}</p>
          <button onClick={() => handleSuspend(selectedUser.id)}>회원 정지</button>
          <button onClick={() => handleDelete(selectedUser.id)}>삭제</button>
          <button onClick={() => handleAdminRights(selectedUser.id)}>
            {selectedUser.admin ? '관리자 권한 취소' : '관리자 권한 주기'}
          </button>
          <button onClick={() => handleSuspendDate(selectedUser.id)}>정지 날짜 설정</button>
        </div>
      )}

      <div className="user-list">
        <h2>전체 회원 목록</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>아이디(이메일)</th>
              <th>채팅 기록 확인</th>
              <th>관리자 권한 상태</th>
              <th>정지 시작일</th>
              <th>정지 종료일</th>
              <th>회원 정지</th>
              <th>계정 삭제</th>
              <th>관리자 권한 주기</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.id}</td>
                <td>
                  <button onClick={() => handleViewChatLogs(user)}>채팅 기록 보기</button>
                </td>
                <td>{user.admin ? '관리자' : '일반 사용자'}</td>
                <td>{user.suspendedStartDate || '정지되지 않음'}</td>
                <td>{user.suspendedEndDate || '정지되지 않음'}</td>
                <td>
                  <button onClick={() => handleSuspend(user.id)}>정지</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>삭제</button>
                </td>
                <td>
                  <button onClick={() => handleAdminRights(user.id)}>
                    {user.admin ? '관리자 권한 취소' : '관리자 권한 주기'}
                  </button>
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
