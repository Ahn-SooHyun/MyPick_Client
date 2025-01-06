// ChatMain.js
import React, { useState, useEffect } from 'react';
import styles from './ChatMain.module.css';

function ChatMain({ initialMessage }) {
  // (A) 기존 메시지 목록
  const [messages, setMessages] = useState([]);
  // 입력창 상태
  const [inputVal, setInputVal] = useState('');

  // (B) 예시 JSON 응답
  const mockMusicResponse = {
    "summary": "수능 앞둔 고3 학생이 스터디 카페에서 마음 편히 공부할 수 있는 잔잔한 음원 추천",
    "category": "Music",
    "title": "고3 집중을 위한 늦은 밤 플레이리스트",
    "content": "밤늦게까지 공부하는 고3 학생이라면, 주변 소음을 차단해 주는 잔잔한 배경음악이 큰 도움이 돼요. 특히 재즈나 어쿠스틱 기반의 발라드, 혹은 부드러운 감성의 팝송 같은 곡들은 심신을 안정시켜 주어 집중력을 높여주죠. 스터디 카페라 하더라도 완벽히 조용하지 않을 때가 많으니, 은은하게 들리는 가사와 편안한 멜로디로 머릿속을 너무 복잡하게 만들지 않는 플레이리스트를 준비해보세요. 이 시간에 듣기 좋은 곡들은 의외로 외로움이나 스트레스를 덜어주는 효과도 있어서, 혼자 공부하는 느낌이 조금은 사라질 거예요. 혹시 클래식도 괜찮다면, 모차르트나 쇼팽의 피아노 소나타처럼 귀에 크게 거슬리지 않으면서 호흡을 안정시키는 음악을 곁들여보세요. 이왕이면 자신이 좋아하는 장르를 살짝 첨가하면 공부에 대한 동기 부여도 살짝 올라가겠죠? 지금부터 소개해 드리는 곡들은 실제 음원 차트에서도 사랑받는 노래들이니, 즐겁게 들어보시면서 무사히 수능 공부를 이어나가시길 바랄게요. 힘내세요!",
    "product": [
      {
        "title": "밤편지",
        "singer": "아이유 (IU)"
      },
      {
        "title": "비 오는 날 듣기 좋은 노래",
        "singer": "에릭남 (Eric Nam)"
      },
      {
        "title": "Way Back Home",
        "singer": "숀 (SHAUN)"
      },
      {
        "title": "Cafe",
        "singer": "빅뱅 (BIGBANG)"
      },
      {
        "title": "River Flows In You",
        "singer": "이루마 (Yiruma)"
      }
    ]
  };

  // (C) 처음 렌더링될 때, initialMessage가 있으면 자동으로 메시지를 추가
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      // 1) User 메시지 추가
      setMessages(prev => [...prev, { user: 'User', text: initialMessage }]);

      // 2) 곧바로 AI 응답
      const aiReply = formatMusicResponse(mockMusicResponse);
      setMessages(prev => [...prev, { user: 'AI', text: aiReply }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // (D) 메시지 전송 핸들러
  const handleSend = () => {
    // (1) 공백만 입력한 경우 무시
    if (inputVal.trim() === '') return;

    // (2) 사용자 메시지 추가
    setMessages(prev => [...prev, { user: 'User', text: inputVal }]);

    // (3) AI 응답 (테스트용)
    const aiReply = formatMusicResponse(mockMusicResponse);
    setMessages(prev => [...prev, { user: 'AI', text: aiReply }]);

    // (4) 입력값 비우기
    setInputVal('');
  };

  // (E) JSON 응답을 채팅용 문자열로 변환
  const formatMusicResponse = (data) => {
    return (
      `[요약] ${data.summary}\n` +
      `[카테고리] ${data.category}\n` +
      `[플레이리스트 제목] ${data.title}\n` +
      `[설명]\n${data.content}\n\n` +
      data.product.map((item, idx) => `(${idx + 1}) ${item.title} - ${item.singer}`).join('\n')
    );
  };

  return (
    <div className={styles.container}>
      {/* 채팅 메시지 영역 */}
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
