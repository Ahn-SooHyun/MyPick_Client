import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatBefore from './ChatBefore';
import ChatMain from './ChatMain';
import LeftSidebar from './LeftSidebar';
import { selectRoomIdx } from '../../@modules/chatRoom';

function ChatContainer() {
  // (A) Redux에서 현재 방 번호(roomIdx) 가져오기
  const roomIdx = useSelector(selectRoomIdx);

  useEffect(() => {
    console.log("container", roomIdx);
  }, [roomIdx])

  useEffect(() => {
    console.log("here");
    
  }, [])
  


  return (
    <div style={{ display: 'flex', height: '100vh', width:'100vw' }}>
      {/* 왼쪽 사이드바 (방 목록) */}
      <LeftSidebar />

      {/* (B) roomIdx가 null이면 -> ChatBefore, 아니면 -> ChatMain */}
      {roomIdx === null ? (
        <ChatBefore />
      ) : (
        <ChatMain />
      )}
    </div>
  );
}

export default ChatContainer;
