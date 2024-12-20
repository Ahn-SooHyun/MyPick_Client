import React from 'react';
import LeftSidebar from '../components/Chat/LeftSidebar';
import RightSidebar from '../components/Chat/RightSidebar';
import ChatMain from '../components/Chat/ChatMain';
import styles from './ChatPageModule.css';

function ChatPage() {
  return (
    <div className={styles.container}>
      {/* 왼쪽 사이드바 고정 */}
      <div className={styles.sidebar}>
        <LeftSidebar />
      </div>
      
      {/* 중앙 메인 영역: 여기에서는 ChatMain 렌더 */}
      <div className={styles.chatMain}>
        <ChatMain />
      </div>
      
      {/* 오른쪽 사이드바 고정 */}
      <div className={styles.sidebar}>
        <RightSidebar />
      </div>
    </div>
  );
}

export default ChatPage;
