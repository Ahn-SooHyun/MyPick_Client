// LeftSidebar.js
import React, { useState } from 'react';
import styles from './LeftSidebar.module.css';
import { DeleteTwoTone } from '@ant-design/icons';

const initialChatRooms = [
  { id: 1, title: '첫 번째 채팅방' },
  { id: 2, title: '두 번째 채팅방' },
  { id: 3, title: '세 번째 채팅방' },
];

function LeftSidebar() {
  const [chatRooms, setChatRooms] = useState(initialChatRooms);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetRoom, setTargetRoom] = useState(null);

  // 새 채팅
  const handleNewChat = () => {
    const newId = Date.now();
    const newTitle = `새 채팅방 ${chatRooms.length + 1}`;
    const newRoom = { id: newId, title: newTitle };
    setChatRooms([...chatRooms, newRoom]);
  };

  // 삭제 아이콘 클릭
  const handleTrashClick = (room) => {
    setTargetRoom(room);
    setShowConfirm(true);
  };

  // "네" 클릭 → 삭제
  const handleConfirmYes = () => {
    if (targetRoom) {
      const updated = chatRooms.filter((r) => r.id !== targetRoom.id);
      setChatRooms(updated);
    }
    setShowConfirm(false);
    setTargetRoom(null);
  };

  // "아니오"
  const handleConfirmNo = () => {
    setShowConfirm(false);
    setTargetRoom(null);
  };

  return (
    <div className={styles.container}>
      {/* 새 채팅 버튼 */}
      <div className={styles.newChat}>
        <button className={styles.newChatBtn} onClick={handleNewChat}>
          새 채팅
        </button>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.chatList}>
        {chatRooms.map((room) => (
          <li key={room.id} className={styles.chatItem}>
            <span className={styles.chatTitle}>{room.title}</span>
            <DeleteTwoTone
              twoToneColor="#FF4948"
              style={{ fontSize: 20, cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => handleTrashClick(room)}
            />
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>
              "<strong>{targetRoom?.title}</strong>"
              <br />
              삭제 하시겠습니까?
            </p>
            <div className={styles.modalButtons}>
              <button
                onClick={handleConfirmYes}
                className={styles.confirmYes}
              >
                네
              </button>
              <button
                onClick={handleConfirmNo}
                className={styles.confirmNo}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
