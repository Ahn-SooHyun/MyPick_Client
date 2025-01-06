// ChatBefore.js
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styles from './ChatBefore.module.css';

function ChatBefore({ onStartChat }) {
  // 예: 사용자가 채팅 시작 전 미리 입력할 내용을 저장
  const [initialMessage, setInitialMessage] = useState('');

  // “채팅 시작” 버튼 클릭 시 부모에게 알려줌
  const handleStart = () => {
    // onStartChat 콜백에 사용자가 쓴 initialMessage를 전달
    onStartChat(initialMessage);
  };

  return (
    <div className={styles.container}>
      <h2>채팅 예시 화면</h2>
      <p>안녕하세요! 이곳에서 간단한 설명이나 채팅 예시를 보여줄 수 있습니다.</p>
      <p>채팅을 시작하려면 아래 입력란에 메시지를 작성 후, [채팅 시작] 버튼을 눌러주세요.</p>

      <div className={styles.inputArea}>
        <Input
          className={styles.input}
          placeholder="채팅 시작 메시지 (선택)"
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
        />
        <Button type="primary" onClick={handleStart}>
          채팅 시작
        </Button>
      </div>
    </div>
  );
}

export default ChatBefore;
