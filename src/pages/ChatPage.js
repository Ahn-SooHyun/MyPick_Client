// ChatPage.js
import React, { useState } from 'react';
import LeftSidebar from '../components/Chat/LeftSidebar';
import RightSidebar from '../components/Chat/RightSidebar';
import ChatBefore from '../components/Chat/ChatBefore';
import ChatMain from '../components/Chat/ChatMain';
import styles from './ChatPage.module.css';

function ChatPage() {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  // ChatBefore -> “채팅 시작” 버튼 클릭 시 호출
  const handleStartChat = (msgFromBefore) => {
    // 선택적으로, ChatBefore에서 입력한 msg를 ChatMain에 넘길 수 있음
    setInitialMessage(msgFromBefore);
    setIsChatStarted(true);
  };

  return (
    <div className={styles.container}>
      {/* 왼쪽 사이드바 */}
      <div className={styles.sidebar}>
        <LeftSidebar />
      </div>

      {/* 중앙 메인 영역 */}
      <div className={styles.chatMain}>
        {isChatStarted ? (
          // (1) 채팅 시작 후 -> ChatMain
          <ChatMain initialMessage={initialMessage} />
        ) : (
          // (2) 채팅 시작 전 -> ChatBefore
          <ChatBefore onStartChat={handleStartChat} />
        )}
      </div>

      {/* 오른쪽 사이드바 */}
      <div className={styles.sidebar}>
        <RightSidebar />
      </div>
    </div>
  );
}

export default ChatPage;
