import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import styles from './RightSidebar.module.css';

const { Title, Paragraph } = Typography;

/**
 * props:
 *  - isLoggedIn (boolean)  : 로그인 여부
 *  - isAdmin (boolean)     : 관리자 여부
 *  - userEmail (string)    : 사용자 이메일 (예: user@example.com)
 *  - handleLogout (fn)     : 로그아웃 함수
 */
function RightSidebar({
  isLoggedIn = true, 
  isAdmin = true, 
  userEmail = 'user@example.com',
  handleLogout = () => {}
}) {
  const navigate = useNavigate();

  // 페이지 이동
  const goLogin = () => navigate('/login');
  const goMyPage = () => navigate('/mypage');
  const goAdminPage = () => navigate('/admin');

  return (
    <div className={styles.sideContainer}>
      {/* 배경 영역 */}
      <div className={styles.container} />

      {/* 버튼 + 문구 래퍼 */}
      <div className={styles.buttonWrapper}>
        <Title level={4} style={{ margin: 0 }}>기능 리스트</Title>

        {isLoggedIn && (
          <Paragraph style={{ margin: '8px 0', fontWeight: 'bold' }}>
            {userEmail} 님, 반갑습니다!
          </Paragraph>
        )}

        {/* 로그인 X → 로그인 버튼만 */}
        {!isLoggedIn && (
          <div className={styles.topArea}>
            <Button type="primary" block onClick={goLogin}>
              로그인
            </Button>
          </div>
        )}

        {/* 로그인 O → 마이페이지, 관리자, 로그아웃 */}
        {isLoggedIn && (
          <>
            {/* 상단: 마이페이지 */}
            <div className={styles.topArea}>
              <Button block onClick={goMyPage}>
                마이페이지
              </Button>
            </div>

            {/* 중간: 관리자 페이지 (isAdmin=true) 일 때만 */}
            {isAdmin && (
              <div className={styles.middleArea}>
                <Button type="dashed" block onClick={goAdminPage}>
                  관리자 페이지
                </Button>
              </div>
            )}

            {/* 하단: 로그아웃 */}
            <div className={styles.bottomArea}>
              <Button danger block onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
