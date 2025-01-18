// LeftSidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteTwoTone } from '@ant-design/icons';
import styles from './LeftSidebar.module.css';

function LeftSidebar({ selectedRoomIdx, onSelectRoom }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetRoom, setTargetRoom] = useState(null);

  // 컴포넌트 마운트 시 roomList 조회
  useEffect(() => {
    fetchRoomList();
  }, []);

  // roomList 조회
  const fetchRoomList = async () => {
    try {
      const ctAt = localStorage.getItem('CT_AT');
      if (!ctAt) return;

      const url = `http://192.168.20.23:8081/api/chat/room/roomList?CT_AT=${ctAt}`;
      const res = await axios.get(url);
      if (res.data.code === '200') {
        // 최신순 리스트
        setChatRooms(res.data.data);
      }
    } catch (error) {
      console.error('roomList 조회 오류:', error);
    }
  };

  // 삭제 아이콘 클릭
  const handleTrashClick = (room) => {
    setTargetRoom(room);
    setShowConfirm(true);
  };

  // 최종 확인 → roomDelete
  const handleConfirmYes = async () => {
    if (!targetRoom) return;
    try {
      const ctAt = localStorage.getItem('CT_AT');
      const url = `http://192.168.20.23:8081/api/chat/room/roomDelete?CT_AT=${ctAt}&chatIDX=${targetRoom.chat_idx}`;
      const res = await axios.get(url);
      if (res.data.code === '200') {
        alert(`Room Number ${targetRoom.chat_idx} deleted`);
        fetchRoomList();  // 다시 목록 갱신
      } else {
        alert('방 삭제 실패:' + res.data.message);
      }
    } catch (error) {
      console.error('roomDelete 오류:', error);
    }

    setShowConfirm(false);
    setTargetRoom(null);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
    setTargetRoom(null);
  };

  return (
    <div className={styles.container}>
      <h3>채팅 방 목록</h3>
      <ul className={styles.chatList}>
        {chatRooms.map((room) => (
          <li
            key={room.chat_idx}
            className={styles.chatItem}
            onClick={() => onSelectRoom(room.chat_idx)}
            style={{
              backgroundColor:
                selectedRoomIdx === room.chat_idx ? '#ccc' : 'transparent'
            }}
          >
            <span>{room.summary || 'New Chat'}</span>
            <DeleteTwoTone
              twoToneColor="#FF4948"
              style={{ fontSize: 20, cursor: 'pointer', marginLeft: '8px' }}
              onClick={(e) => {
                e.stopPropagation();
                handleTrashClick(room);
              }}
            />
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>
              방 #{targetRoom?.chat_idx}("<strong>{targetRoom?.summary}</strong>")
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
