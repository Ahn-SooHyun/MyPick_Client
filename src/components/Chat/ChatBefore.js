// ChatBefore.js
import React, { useState } from 'react';
import { Button, Input, Card, Typography } from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

function ChatBefore({ onCreateRoom }) {
  const [initialMessage, setInitialMessage] = useState('');

  // 채팅 시작 버튼 클릭 → 카테고리 유효성 검사 → 백엔드에 createRoom 요청
  const handleStart = async () => {
    const trimmed = initialMessage.trim();

    // 슬래시 + (게임|음악|도서|영화) 체크
    if (!/^\/(게임|음악|도서|영화)$/.test(trimmed)) {
      alert('올바른 카테고리를 입력하세요. (예: /게임, /음악, /도서, /영화)');
      return;
    }

    // 백엔드 createRoom (chatIDX=0)
    try {
      const ctAt = localStorage.getItem('CT_AT');
      if (!ctAt) {
        alert('로그인이 필요합니다. CT_AT 없음');
        return;
      }

      const promptVal = encodeURIComponent(trimmed);
      const url = `http://192.168.20.23:8081/api/chat/message/message?prompt=${promptVal}&CT_AT=${ctAt}&chatIDX=0`;

      const res = await axios.get(url);

      if (res.data.code === '200') {
        alert('방이 생성되었습니다!');
        // 방 생성 후 상위(부모) 컴포넌트 등에 알림
        onCreateRoom(trimmed); 
      } else {
        alert('방 생성 실패: ' + res.data.message);
      }
    } catch (error) {
      console.error('방 생성 오류:', error);
      alert('방 생성 중 오류 발생');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <Card style={{ width: 400 }}>
        <Title level={3}>카테고리 입력</Title>
        <Paragraph>예: /게임, /음악, /도서, /영화</Paragraph>

        <Input
          placeholder="카테고리 입력 (예: /게임)"
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
        />
        <Button type="primary" style={{ marginTop: 16 }} onClick={handleStart}>
          채팅 시작
        </Button>
      </Card>
    </div>
  );
}

export default ChatBefore;
