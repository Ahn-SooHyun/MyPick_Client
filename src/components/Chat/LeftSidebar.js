import React from 'react';
import styles from './LeftSidebarModule.css';

function LeftSidebar() {
  return (
    <div className={styles.container}>
      <h2>추천 리스트</h2>
      <ul className={styles.ul}>
        <li>영화 추천</li>
        <li>음악 추천</li>
        <li>도서 추천</li>
        <li>상품 추천</li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
