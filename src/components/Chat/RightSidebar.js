import React from 'react';
import styles from './RightSidebarModule.css';

function RightSidebar() {
  return (
    <div className={styles.container}>
      <h2>추가 정보</h2>
      <ul className={styles.ul}>
        <li>최근 본 항목</li>
        <li>인기 추천</li>
        <li>개인 설정</li>
      </ul>
    </div>
  );
}

export default RightSidebar;
