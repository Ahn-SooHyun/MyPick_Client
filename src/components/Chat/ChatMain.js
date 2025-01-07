// ChatMain.js
import React, { useState, useEffect } from 'react';
// (A) ChatMain.module.css 임포트
import styles from './ChatMain.module.css';

function ChatMain({ initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');

  // 예시 JSON 응답
  const mockMusicResponse = {
    summary: "수능 앞둔 고3 학생이 스터디 카페에서...",
    category: "Music",
    title: "고3 집중을 위한 늦은 밤 플레이리스트",
    content: "밤늦게까지 공부하는 고3 학생이라면...",
    product: [
      { title: "밤편지", singer: "아이유 (IU)" },
      { title: "비 오는 날 듣기 좋은 노래", singer: "에릭남 (Eric Nam)" },
      { title: "Way Back Home", singer: "숀 (SHAUN)" },
      { title: "Cafe", singer: "빅뱅 (BIGBANG)" },
      { title: "River Flows In You", singer: "이루마 (Yiruma)" },
    ],
  };

  // (B) initialMessage가 있으면 자동 메시지 추가
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setMessages(prev => [...prev, { user: 'User', text: initialMessage }]);
      const aiReply = formatMusicResponse(mockMusicResponse);
      setMessages(prev => [...prev, { user: 'AI', text: aiReply }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // (C) 전송 핸들러
  const handleSend = () => {
    if (inputVal.trim() === '') return;
    setMessages(prev => [...prev, { user: 'User', text: inputVal }]);
    const aiReply = formatMusicResponse(mockMusicResponse);
    setMessages(prev => [...prev, { user: 'AI', text: aiReply }]);
    setInputVal('');
  };

  // (D) JSON → 채팅용 문자열 변환
  const formatMusicResponse = (data) => {
    return (
      `[요약] ${data.summary}\n` +
      `[카테고리] ${data.category}\n` +
      `[플레이리스트 제목] ${data.title}\n` +
      `[설명]\n${data.content}\n\n` +
      data.product.map(
        (item, idx) => `(${idx + 1}) ${item.title} - ${item.singer}`
      ).join('\n')
    );
  };

  return (
    <div className={styles.container}>
      {/* 채팅 영역 */}
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.user === 'AI' ? styles.aiMessage : styles.userMessage}
          >
            <strong>{msg.user}:</strong>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</pre>
          </div>
        ))}
      </div>

      {/* 입력창 영역 */}
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="메시지를 입력하세요..."
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
