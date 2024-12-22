import React, { useState } from 'react';
import styles from './ChatMain.module.css';

function ChatMain() {
  const [messages, setMessages] = useState([
    { user: 'AI', text: '안녕하세요! 무엇을 추천해드릴까요?' }
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (inputVal.trim() !== '') {
      setMessages(prev => [...prev, { user: 'User', text: inputVal }]);
      setInputVal('');
      // 실제로는 여기서 axios 등을 통한 백엔드 요청 및 AI API 연동 로직 필요
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.user === 'AI' ? styles.aiMessage : styles.userMessage}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button className={styles.button} onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}

export default ChatMain;
