// ChatContainer.js
import React, { useState } from 'react';
import ChatBefore from './ChatBefore';
import ChatMain from './ChatMain';

function ChatContainer() {
  const [initialMessage, setInitialMessage] = useState('');
  const [isChatStarted, setIsChatStarted] = useState(false);

  // ChatBefore → ChatContainer
  const handleStartChat = (message) => {
    setInitialMessage(message); // ChatBefore에서 받은 메시지 저장
    setIsChatStarted(true);     // 채팅 시작 여부
  };

  return (
    <>
      {
        !isChatStarted ? (
          // 아직 채팅이 시작되지 않았으면 ChatBefore
          <ChatBefore onStartChat={handleStartChat} />
        ) : (
          // 채팅이 시작되면 ChatMain (initialMessage props 전달)
          <ChatMain initialMessage={initialMessage} />
        )
      }
    </>
  );
}

export default ChatContainer;
