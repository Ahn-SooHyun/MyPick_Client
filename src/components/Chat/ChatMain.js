// ChatMain.js
import React, { useState, useEffect } from 'react';
import styles from './ChatMain.module.css';
import { Card, Row, Col, Typography, Space } from 'antd';
import {
  HeartTwoTone,
  MessageTwoTone,
  FolderOpenTwoTone
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * (1) Mock OpenAI API 요청
 *    - 사용자 입력에 따라 영화/음악/도서/게임 카테고리 반환
 */
async function requestOpenAI(userText) {
  // (A) 영화
  const movieJsonResponse = {
    code: "200",
    message: "success",
    data: {
      "answer": "게임 관련 영화는 다양한 장르와 스타일로 관객을 사로잡습니다. '레디 플레이어 원'은 스티븐 스필버그 감독의 작품으로, 가상 현실에서 게임과 문화 아이콘들이 어우러져 흥미진진한 모험을 펼치는 이야기입니다. '도타: 드래곤스 혈통'은 인기 게임 '도타 2'를 기반으로 한 애니메이션 시리즈로, 게임 팬들에게 더욱 매력적입니다. '왕의 게임'은 '포켓몬' 세계를 배경으로 어린 시절의 추억을 불러일으키며, 포켓몬을 사랑하는 이들에게 추천합니다. '앵그리 버드'는 유명 모바일 게임을 원작으로 한 가족 친화적인 애니메이션으로, 아이들과 함께 보기에 적합합니다. 마지막으로 '트랜스포머' 시리즈는 로봇과 게임 요소를 결합한 액션 영화로, 대중적으로 큰 인기를 끌며 다양한 관객층을 사로잡습니다. 이들 영화는 게임 팬은 물론 모든 관객에게 즐거움을 줄 수 있습니다.",

      summary: "게임(원작) 기반 영화 추천 목록입니다.",
      list: [
        { title: "레디 플레이어 원 (2018)", creator: "워너 브라더스" },
        { title: "도타: 드래곤스 혈통 (2021)", creator: "넷플릭스" },
        { title: "왕의 게임 (2019)", creator: "포켓몬 컴퍼니" },
        { title: "앵그리 버드 (2016)", creator: "소니 픽처스" },
        { title: "트랜스포머 시리즈 (2007-현재)", creator: "파라마운트 픽쳐스" }
      ]
    }
  };

  // (B) 음악
  const musicJsonResponse = {
    code: "200",
    message: "success",
    data: {
      answer:
        "음악은 분위기와 감정을 순식간에 바꿔주는 힘이 있습니다. " +
        "비 오는 날엔 재즈나 발라드처럼 차분한 곡이 좋고, " +
        "활기찬 아침엔 신나는 댄스 음악이 하루를 힘차게 만들어 줍니다. " +
        "저녁에는 잔잔한 발라드나 클래식으로 고요함을 만끽해 보세요.",
      summary: "상황별 음악 추천 목록입니다.",
      list: [
        { title: "밤편지", creator: "아이유 (IU)" },
        { title: "비 오는 날 듣기 좋은 노래", creator: "에릭남 (Eric Nam)" },
        { title: "Shape of You", creator: "Ed Sheeran" },
        { title: "Fly to the Sky", creator: "Fly to the Sky" },
        { title: "River Flows in You", creator: "Yiruma" }
      ]
    }
  };

  // (C) 도서
  const bookJsonResponse = {
    code: "200",
    message: "success",
    data: {
      answer:
        "책은 다양한 지식과 감동을 선사합니다. " +
        "여행 에세이는 간접 체험을 통해 새로운 영감을 주고, 힐링 에세이는 마음의 안정을 찾게 해줍니다. " +
        "판타지나 SF 소설로 상상의 세계를 탐험하는 것도 큰 즐거움입니다.",
      summary: "다양한 장르의 도서 추천 목록입니다.",
      list: [
        { title: "여행의 이유", creator: "김영하" },
        { title: "멈추면 비로소 보이는 것들", creator: "혜민 스님" },
        { title: "파친코", creator: "이민진" },
        { title: "달러구트 꿈 백화점", creator: "이미예" },
        { title: "하얼빈", creator: "김훈" }
      ]
    }
  };

  // (D) 게임
  const gameJsonResponse = {
    code: "200",
    message: "success",
    data: {
      answer:
        "게임은 방대한 세계관과 액션이 결합된 특별한 체험을 선사합니다. " +
        "오픈월드 RPG로 자유롭게 모험하거나, 친구들과 멀티플레이로 경쟁과 협동을 즐길 수도 있습니다. " +
        "최근엔 스토리성과 그래픽 수준이 뛰어난 작품이 많아 게임의 매력이 더욱 커지고 있습니다.",
      summary: "핫한 게임 추천 목록입니다.",
      list: [
        { title: "엘든 링", creator: "프롬소프트웨어" },
        { title: "젤다의 전설: 브레스 오브 더 와일드", creator: "닌텐도" },
        { title: "오버워치 2", creator: "블리자드" },
        { title: "리그 오브 레전드", creator: "라이엇 게임즈" },
        { title: "원신", creator: "HoYoverse" }
      ]
    }
  };

  // 사용자 입력으로 카테고리 분기
  const lowerText = userText.toLowerCase();
  if (lowerText.includes("음악") || lowerText.includes("/음악")) {
    return musicJsonResponse;
  } else if (lowerText.includes("도서") || lowerText.includes("/도서") || lowerText.includes("책")) {
    return bookJsonResponse;
  } else if (lowerText.includes("게임") || lowerText.includes("/게임")) {
    return gameJsonResponse;
  } else {
    // 기본: 영화
    return movieJsonResponse;
  }
}

function ChatMain({ initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');

  // 초기 메시지 처리
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setMessages((prev) => [...prev, { user: 'User', text: initialMessage }]);
      handleAIRequest(initialMessage);
    }
  }, [initialMessage]);

  // 메시지 전송
  const handleSend = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { user: 'User', text: trimmed }]);
    handleAIRequest(trimmed);
    setInputVal('');
  };

  // API 요청
  const handleAIRequest = async (userText) => {
    const result = await requestOpenAI(userText);
    if (result && result.code === '200') {
      const { data } = result;
      setMessages((prev) => [
        ...prev,
        { user: 'AI', type: 'Recommendation', data }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { user: 'AI', text: String(result) }
      ]);
    }
  };

  // 메시지 렌더링
  const renderMessage = (msg, idx) => {
    if (msg.user === 'AI' && msg.type === 'Recommendation') {
      // AI 추천 JSON
      return (
        <div key={idx} className={styles.aiMessage}>
          <RecommendationCard data={msg.data} />
        </div>
      );
    } else {
      // 일반 텍스트
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
          placeholder="메시지를 입력하세요... (예: /영화, /음악, /도서, /게임)"
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

/**
 * RecommendationCard
 *    data: { answer, summary, list[] }
 *    
 *    - "요약", "답변", "추천 목록" 전부
 *    - "답변" 아이콘을 옆에 배치하여 요약/추천 목록과 동일 레이아웃
 */
function RecommendationCard({ data }) {
  if (!data) return null;
  const { answer, summary, list } = data;

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      {/* 요약 카드 */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <HeartTwoTone twoToneColor="#ff7875" style={{ fontSize: 24 }} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>요약</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              {summary}
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 답변 카드 (아이콘 왼쪽, 제목 오른쪽) */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <MessageTwoTone twoToneColor="#13c2c2" style={{ fontSize: 24 }} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>답변</Title>
            <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
              {answer}
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 추천 목록 카드 */}
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
