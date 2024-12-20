import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPageModule.css';

function MainPage() {
  return (
    <div className={styles.container}>
      <h1>AI 기반 개인화 추천 플랫폼</h1>
      <p className={styles.description}>
        본 프로젝트는 사용자의 행동 데이터를 기반으로 영화, 음악, 도서, 상품 등 다양한 분야에서
        개인화된 추천 서비스를 제공하는 플랫폼입니다.
      </p>
      <p className={styles.description}>
        최신 AI 추천 알고리즘과 안정적인 백엔드(SpringBoot, MyBatis, MariaDB) 인프라를 기반으로 
        React 프론트엔드 및 Axios 연동을 통해 사용자 친화적인 인터페이스를 제공합니다.
      </p>
      <Link to="/chat" className={styles.linkButton}>채팅 페이지로 이동하기</Link>
    </div>
  );
}

export default MainPage;
