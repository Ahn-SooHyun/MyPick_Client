import React, { useState, useEffect } from 'react';
import api from '../../axiosSetting';
import styles from './ChatMain.module.css';
import { Card, Row, Col, Typography, Space } from 'antd';
import { HeartTwoTone, MessageTwoTone, FolderOpenTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectMessageList, selectRoomIdx } from '../../@modules/chatRoom';

const { Title, Paragraph } = Typography;

function getCookieValue(name) {
  const cookieStr = document.cookie || '';
  const cookies = cookieStr.split(';').map(c => c.trim());
  for (let c of cookies) {
    if (c.startsWith(`${name}=`)) {
      return c.substring(name.length + 1);
    }
  }
  return '';
}

function ChatMain() {
  // (A) Redux에서 현재 방 번호와 메시지 리스트 가져오기
  const currentRoomIdx = useSelector(selectRoomIdx);
  const messageListT = useSelector(selectMessageList);

  // (B) 실제 렌더링할 메시지
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');

  // (C) Redux messageList가 바뀔 때마다 변환
  useEffect(() => {
    if (messageListT.length > 0) {
      // 예: [{ question, answer, summary, list, ... }, ...]
      const converted = messageListT.flatMap((item) => {
        const userObj = {
          user: 'User',
          text: item.question || '(질문 없음)',
        };
        const aiObj = {
          user: 'AI',
          type: 'Recommendation',
          data: {
            answer: item.answer || '',
            summary: item.summary || '',
            list: item.list || [],
          },
        };
        return [userObj, aiObj];
      });
      setMessages(converted);
    } else {
      setMessages([]);
    }
  }, [messageListT]);

  // (D) 메시지 전송
  const handleSend = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    // 사용자 메시지
    setMessages((prev) => [...prev, { user: 'User', text: trimmed }]);
    sendChatMessage(trimmed);
    setInputVal('');
  };

  // (E) 서버 GET 요청
  const sendChatMessage = async (prompt) => {
    try {
      const CT_AT = getCookieValue('CT_AT');
      if (!CT_AT) {
        alert('로그인이 필요합니다. (쿠키에 CT_AT 없음)');
        return;
      }

      const res = await api.get('/chat/message/message', {
        params: {
          prompt,
          CT_AT: CT_AT,
          chatIDX: currentRoomIdx,
        },
      });

      if (res.data.code === '200') {
        const { answer, summary, list } = res.data.data || {};
        setMessages((prev) => [
          ...prev,
          {
            user: 'AI',
            type: 'Recommendation',
            data: { answer, summary, list },
          },
        ]);
      } else {
        alert('채팅 실패:' + res.data.message);
      }
    } catch (error) {
      console.error('채팅 오류:', error);
      alert('채팅 중 오류 발생');
    }
  };

  // (F) 메시지 렌더링
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
            <Title level={4} style={{ margin: 0 }}>
              요약
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              {summary}
            </Paragraph>
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
            <Title level={4} style={{ margin: 0 }}>
              답변
            </Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              {answer}
            </Paragraph>
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
              <Title level={4} style={{ margin: 0 }}>
                추천 목록
              </Title>
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
