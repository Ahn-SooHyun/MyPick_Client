// ChatMain.js
import React, { useState, useEffect } from 'react';
import styles from './ChatMain.module.css';

/*
  (1) 가상의 OpenAI API 요청 함수
  - 실제로는 Axios 등을 통해 category, userText를 백엔드/AI에 전송
  - 여기서는 간단히 "category + userText" 로 만들어진 응답을 가정
*/
async function requestOpenAI(category, userText) {
  // 실제론 백엔드나 OpenAI API 호출
  // 여기서는 mock 응답 문자열로 대체
  return `[OpenAI 응답]\n카테고리: ${category}\n사용자 메시지: ${userText}\n... (실제 OpenAI 결과) ...`;
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
    const aiReply = await requestOpenAI(currentCategory, userText);
    // AI 메시지 추가
    setMessages(prev => [...prev, { user: 'AI', text: aiReply }]);
  };

  return (
    <div className={styles.container}>
      {/* 채팅 창 */}
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.user === 'AI'
                ? styles.aiMessage
                : msg.user === 'System'
                ? styles.systemMessage  // 시스템 메시지 스타일
                : styles.userMessage
            }
          >
            <strong>{msg.user}:</strong>{' '}
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</pre>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="메시지를 입력하세요... (예: /음악, /영화)"
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

export default ChatMain;
