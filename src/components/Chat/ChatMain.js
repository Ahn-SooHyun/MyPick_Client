// ChatMain.js
import React, { useState, useEffect } from 'react';
import styles from './ChatMain.module.css';
import { Card, Row, Col, Typography, Space } from 'antd';
import {
  HeartTwoTone,
  SmileTwoTone,
  MessageTwoTone,
  FolderOpenTwoTone
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * (1) 가상의 OpenAI API 요청 함수
 *   실제로는 Axios 등을 통해 category, userText를 백엔드/AI에 전송해야 합니다.
 *   여기서는 카테고리별로 다른 Mock JSON을 반환합니다.
 */
async function requestOpenAI(category, userText) {
  // Music / Movie / Game / Book / Default
  const mockMusicResponse = {
    category: "Music",
    summary: "비 오는 날 듣기 좋은 음악 추천!",
    content: "재즈나 발라드처럼 차분하고 편안한 음악을 들어보세요.",
    product: [
      { title: "밤편지", singer: "아이유 (IU)" },
      { title: "비 오는 날 듣기 좋은 노래", singer: "에릭남 (Eric Nam)" }
    ]
  };

  const mockMovieResponse = {
    category: "Movie",
    summary: "주말에 보기 좋은 액션 영화 추천!",
    content: "긴장감 넘치는 장면과 통쾌한 액션이 가득한 작품을 찾아보세요.",
    product: [
      { title: "미션 임파서블: 폴아웃", director: "크리스토퍼 맥쿼리" },
      { title: "존 윅", director: "채드 스타헬스키" }
    ]
  };

  const mockGameResponse = {
    category: "Game",
    summary: "요즘 핫한 RPG 게임 추천!",
    content: "방대한 스토리와 뛰어난 그래픽의 오픈월드 게임을 즐겨보세요.",
    product: [
      { title: "엘든 링", company: "프롬소프트웨어" },
      { title: "젤다의 전설: 브레스 오브 더 와일드", company: "닌텐도" }
    ]
  };

  const mockBookResponse = {
    category: "Book",
    summary: "가볍게 읽기 좋은 에세이 추천!",
    content: "짧은 이야기 속에서 인생의 지혜를 얻을 수 있는 책을 만나보세요.",
    product: [
      { title: "여행의 이유", author: "김영하" },
      { title: "멈추면 비로소 보이는 것들", author: "혜민 스님" }
    ]
  };

  // 실제 시나리오에서는 서버/API에서 JSON 형태로 응답을 받고,
  // 여기서 category 등을 확인하여 적절히 처리
  switch (category) {
    case 'Music':
      return mockMusicResponse;
    case 'Movie':
      return mockMovieResponse;
    case 'Game':
      return mockGameResponse;
    case 'Book':
      return mockBookResponse;
    default:
      // 기본: 문자열 응답
      return `[OpenAI 응답]\n카테고리: ${category}\n사용자 메시지: ${userText}\n... (실제 OpenAI 결과) ...`;
  }
}

function ChatMain({ initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');

  // 현재 선택된 카테고리 (초기에는 "Default")
  const [currentCategory, setCurrentCategory] = useState('Default');

  // (2) ChatBefore -> initialMessage가 있으면 첫 메시지 처리
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      // 1) 사용자 메시지 표시
      setMessages(prev => [...prev, { user: 'User', text: initialMessage }]);
      // 2) 만약 슬래시로 시작하면 -> 카테고리 변경, AI 응답은 하지 않음
      if (initialMessage.startsWith('/')) {
        handleCategoryChange(initialMessage);
      } else {
        // 슬래시 없음 -> OpenAI 호출
        handleAIRequest(initialMessage);
      }
    }
  }, [initialMessage]);

  // (3) 메시지 전송 핸들러
  const handleSend = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    // 1) User 메시지 추가
    setMessages(prev => [...prev, { user: 'User', text: trimmed }]);

    // 2) 슬래시로 시작하면 -> 카테고리만 변경
    if (trimmed.startsWith('/')) {
      handleCategoryChange(trimmed);
    } else {
      // 일반 메시지 -> 현재 카테고리에 맞춰 OpenAI API 요청
      handleAIRequest(trimmed);
    }

    // 3) 입력창 비우기
    setInputVal('');
  };

  // (4) 슬래시 명령 -> 카테고리만 변경
  const handleCategoryChange = (slashInput) => {
    // 예: "/음악", "/영화", "/게임", "/도서"
    let newCategory = 'Default';
    if (slashInput.startsWith('/음악')) newCategory = 'Music';
    else if (slashInput.startsWith('/영화')) newCategory = 'Movie';
    else if (slashInput.startsWith('/게임')) newCategory = 'Game';
    else if (slashInput.startsWith('/도서')) newCategory = 'Book';
    else newCategory = 'Default';

    setCurrentCategory(newCategory);

    // 카테고리 변경 안내 메시지를 출력 (선택사항)
    setMessages(prev => [
      ...prev,
      { user: 'System', text: `카테고리를 '${newCategory}'(으)로 변경했습니다.` }
    ]);
  };

  // (5) 일반 메시지 -> OpenAI API 요청
  const handleAIRequest = async (userText) => {
    // currentCategory 기반으로 OpenAI API 요청
    const result = await requestOpenAI(currentCategory, userText);

    // JSON 응답인지, 문자열 응답인지 판별
    if (typeof result === 'object' && result.category) {
      // 음악, 영화, 게임, 도서 등 JSON 객체
      setMessages(prev => [
        ...prev,
        { user: 'AI', type: 'Recommendation', data: result }
      ]);
    } else {
      // 일반 텍스트 응답
      setMessages(prev => [
        ...prev,
        { user: 'AI', text: String(result) }
      ]);
    }
  };

  /**
   * (6) 메시지 렌더링 함수
   *   - AI: 카테고리별 객체 -> RecommendationCard
   *   - 그 외: 기존 텍스트 출력
   */
  const renderMessage = (msg, idx) => {
    if (msg.user === 'AI' && msg.type === 'Recommendation') {
      // 음악 / 영화 / 게임 / 도서 JSON 객체 -> 카드 형식
      return (
        <div key={idx} className={styles.aiMessage}>
          <RecommendationCard data={msg.data} />
        </div>
      );
    } else {
      // 기존 텍스트 메시지 (User / System / AI)
      let className = styles.userMessage;
      if (msg.user === 'AI') className = styles.aiMessage;
      if (msg.user === 'System') className = styles.systemMessage;

      return (
        <div key={idx} className={className}>
          <strong>{msg.user}:</strong>{' '}
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {msg.text}
          </pre>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* 채팅 창 */}
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => renderMessage(msg, idx))}
      </div>

      {/* 입력 영역 */}
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="메시지를 입력하세요... (예: /음악, /영화, /게임, /도서)"
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
 * (7) 카테고리별 추천 내용을 카드로 보여주는 컴포넌트
 *   - “요약”, “카테고리”, “답변”, “추천 + (카테고리)” 4개 카드
 */
function RecommendationCard({ data }) {
  if (!data) return null;
  const { summary, category, content, product } = data;

  // 카테고리별 "추천 음악/영화/게임/도서" 문구를 동적으로
  const categoryMap = {
    Music: "음악",
    Movie: "영화",
    Game: "게임",
    Book: "도서"
  };
  const categoryLabel = categoryMap[category] || "기타";

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
            <Paragraph style={{ marginTop: 8 }}>{summary}</Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 카테고리 */}
      <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <SmileTwoTone twoToneColor="#faad14" style={{ fontSize: 24 }} />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>카테고리</Title>
            <Paragraph style={{ marginTop: 8 }}>
              {category}
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
            <Title level={4} style={{ margin: 0 }}>답변</Title>
            <Paragraph style={{ marginTop: 8 }}>{content}</Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 추천 (카테고리) */}
      {Array.isArray(product) && product.length > 0 && (
        <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '16px' }}>
          <Row gutter={16} align="middle">
            <Col>
              <FolderOpenTwoTone twoToneColor="#52c41a" style={{ fontSize: 24 }} />
            </Col>
            <Col flex="auto">
              <Title level={4} style={{ margin: 0 }}>
                추천 {categoryLabel}
              </Title>
              <Space direction="vertical" style={{ marginTop: 8 }}>
                {product.map((item, idx) => (
                  <Paragraph key={idx} style={{ margin: 0 }}>
                    {/* 음악/영화/게임/도서에 따라 표시 텍스트 다를 수 있음 */}
                    {category === 'Music' && (
                      <><strong>{item.title}</strong> - {item.singer}</>
                    )}
                    {category === 'Movie' && (
                      <><strong>{item.title}</strong> ({item.director} 감독)</>
                    )}
                    {category === 'Game' && (
                      <><strong>{item.title}</strong> ({item.company})</>
                    )}
                    {category === 'Book' && (
                      <><strong>{item.title}</strong> ({item.author})</>
                    )}
                    {/* 필요 시 Default 처리 */}
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
