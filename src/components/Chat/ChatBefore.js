// ChatBefore.js
import React, { useState } from 'react';
import { Button, Input, Card, Typography } from 'antd';
import styles from './ChatBefore.module.css';

const { Title, Paragraph, Text } = Typography;

function ChatBefore({ onStartChat }) {
  const [initialMessage, setInitialMessage] = useState('');

  const handleStart = () => {
    onStartChat(initialMessage);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} bordered={false}>
        <Title level={2}>채팅 안내</Title>
        <Paragraph>
          안녕하세요! 이곳에서 간단한 설명이나 채팅 예시를 볼 수 있습니다.
        </Paragraph>
        <Paragraph>
          채팅을 시작하려면 아래 입력란에 메시지를 작성 후, 
          <Text strong>[채팅 시작]</Text> 버튼을 눌러주세요.
        </Paragraph>

        <div className={styles.exampleArea}>
          <Paragraph type="secondary" style={{ fontStyle: 'italic' }}>
            예시: "/음악" → 음악 추천 모드,
            "/영화" → 영화 추천 모드,
            "/도서" → 도서 추천 모드
          </Paragraph>
        </div>

        <div className={styles.inputArea}>
          <Input
            className={styles.input}
            placeholder='채팅 시작 메시지 (예: /음악, /영화, /도서)'
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
          />
          <Button type='primary' onClick={handleStart}>
            채팅 시작
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ChatBefore;
