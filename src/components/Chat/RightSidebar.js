// RightSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Space } from 'antd';
import styles from './RightSidebar.module.css';

const { Title } = Typography;

function RightSidebar({
  isLoggedIn = false, 
  isAdmin = false, 
  handleLogout = () => {}
}) {
  const navigate = useNavigate();

  // 페이지 이동 함수들
  const goLogin = () => navigate('/login');
  const goMyPage = () => navigate('/mypage');
  const goAdminPage = () => navigate('/admin');

  return (
    <div className={styles.container}>
      {/* 
        오른쪽 사이드바 전체 배경은 CSS Module에서 red로 지정되어 있음.
        내부에 Card 컴포넌트로 한 번 감싸 UI를 구분 
      */}
      <Card
        title={<Title level={4} style={{ margin: 0 }}>기능 리스트</Title>}
        bodyStyle={{ padding: '16px' }}
        style={{
          marginTop: 16,
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        {!isLoggedIn && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" block onClick={goLogin}>
              로그인
            </Button>
          </Space>
        )}

        {isLoggedIn && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button block onClick={goMyPage}>
              마이페이지
            </Button>

            {isAdmin && (
              <Button type="dashed" block onClick={goAdminPage}>
                관리자 페이지
              </Button>
            )}

            <Button danger block onClick={handleLogout}>
              로그아웃
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
}

export default RightSidebar;
