// ChatMain.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatMain.module.css';
import { Card, Row, Col, Typography, Space } from 'antd';
import { HeartTwoTone, MessageTwoTone, FolderOpenTwoTone } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function ChatMain({ currentRoomIdx, onUpdateRoomTitle }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');

  // 채팅 전송 (슬래시 없는 일반 메시지)
  const handleSend = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    // 사용자 메시지 화면 표시
    setMessages(prev => [...prev, { user: 'User', text: trimmed }]);

    // 백엔드 message API 호출
    sendChatMessage(trimmed);

    setInputVal('');
  };

  // message API: GET /api/chat/message/message?prompt=...&CT_AT=...&chatIDX=...
  const sendChatMessage = async (prompt) => {
    try {
      const ctAt = localStorage.getItem('CT_AT');
      const encPrompt = encodeURIComponent(prompt);
      const url = `http://192.168.20.23:8081/api/chat/message/message?prompt=${encPrompt}&CT_AT=${ctAt}&chatIDX=${currentRoomIdx}`;

      const res = await axios.get(url);
      if (res.data.code === '200') {
        // AI 응답
        const { answer, summary, list } = res.data.data;

        // 화면 표시
        setMessages(prev => [
          ...prev,
          { user: 'AI', type: 'Recommendation', data: { answer, summary, list } }
        ]);

        // 요약(summary) → LeftSidebar 방 제목 업데이트
        onUpdateRoomTitle?.(currentRoomIdx, summary || 'New Chat');
      } else {
        alert('채팅 실패:' + res.data.message);
      }
    } catch (error) {
      console.error('채팅 오류:', error);
      alert('채팅 중 오류 발생');
    }
  };

  // 메시지 렌더링
  const renderMessage = (msg, idx) => {
    if (msg.user === 'AI' && msg.type === 'Recommendation') {
      return (
        <div key={idx} className={styles.aiMessage}>
          <RecommendationCard data={msg.data} />
        </div>
      );
    } else {
      let className = styles.userMessage;
      if (msg.user === 'AI') className = styles.aiMessage;
      return (
        <div key={idx} className={className}>
          <strong>{msg.user}:</strong>{' '}
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</pre>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => renderMessage(msg, idx))}
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="일반 메시지를 입력하세요..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button className={styles.button} onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}

/** RecommendationCard */
function RecommendationCard({ data }) {
  if (!data) return null;
  const { answer, summary, list } = data;
  const { Title, Paragraph } = Typography;

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      {/* 요약 */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <HeartTwoTone twoToneColor="#ff7875" style={{ fontSize: 24 }} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>요약</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{summary}</Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 답변 */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <MessageTwoTone twoToneColor="#13c2c2" style={{ fontSize: 24 }} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>답변</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{answer}</Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 추천 목록 */}
      {Array.isArray(list) && list.length > 0 && (
        <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
          <Row gutter={16} align="middle">
            <Col>
              <FolderOpenTwoTone twoToneColor="#52c41a" style={{ fontSize: 24 }} />
            </Col>
            <Col flex="auto">
              <Title level={4} style={{ margin: 0 }}>추천 목록</Title>
              <Space direction="vertical" style={{ marginTop: 8 }}>
                {list.map((item, idx) => (
                  <Paragraph key={idx} style={{ margin: 0 }}>
                    <strong>{item.title}</strong> ({item.creator})
                  </Paragraph>
                ))}
              </Space>
            </Col>
          </Row>
        </Card>
      )}
    </Space>
  );
}

export default ChatMain;
