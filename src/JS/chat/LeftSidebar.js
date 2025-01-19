import React, { useState, useEffect } from 'react';
import { DeleteTwoTone } from '@ant-design/icons';
import styles from '../../css/chat/LeftSidebar.module.css';
import api from '../../util/api/axiosSetting';
import { getCookieValue } from '../../util/cookie/cookie';
import { getChatMessageList } from '../../util/api/chatApi.js';
import { useDispatch } from 'react-redux';
import { changeMessageList, changeRoomIdx } from '../../util/@modules/chatRoom';

function LeftSidebar() {
  const dispatch = useDispatch();
  const onChangeRoomIdx = (idx) => dispatch(changeRoomIdx(idx));
  const onChangeMessageList = (list) => dispatch(changeMessageList(list));

  const [chatRooms, setChatRooms] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetRoom, setTargetRoom] = useState(null);

  // (A) 마운트 시 roomList 조회
  useEffect(() => {
    fetchRoomList();
  }, []);

  // (B) roomList 조회
  const fetchRoomList = async () => {
    try {
      const CT_AT = getCookieValue('CT_AT');
      if (!CT_AT) {
        console.log('쿠키에 CT_AT 없음, roomList 조회 불가');
        return;
      }

      const response = await api.get('/chat/room/roomList', {
        params: {
          CT_AT: CT_AT,
        },
      });
      if (response.data.code === '200') {
        setChatRooms(response.data.data);
      } else {
        console.log('roomList 조회 실패:', response.data.message);
      }
    } catch (error) {
      console.error('roomList 조회 오류:', error);
    }
  };

  // (C) 삭제 아이콘 클릭 → 삭제 모달
  const handleTrashClick = (room) => {
    setTargetRoom(room);
    setShowConfirm(true);
  };

  // (D) 최종 확인 → roomDelete
  const handleConfirmYes = async () => {
    if (!targetRoom) return;
    try {
      const CT_AT = getCookieValue('CT_AT');
      if (!CT_AT) {
        alert('쿠키에 CT_AT 없음');
        setShowConfirm(false);
        setTargetRoom(null);
        return;
      }
      const response = await api.get('/chat/room/roomDelete', {
        params: {
          CT_AT: CT_AT,
          chatIDX: targetRoom.chat_idx,
        },
      });

      if (response.data.code === '200') {
        alert(`Room Number ${targetRoom.chat_idx} deleted`);
        fetchRoomList();
      } else {
        alert('방 삭제 실패:' + response.data.message);
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

  // (E) 방 클릭
  const handleClickRoom = async (room) => {
    const CT_AT = getCookieValue('CT_AT');
    if (!CT_AT) {
      alert('로그인이 필요합니다. (쿠키에 CT_AT 없음)');
      return;
    }

    const obj = {
      CT_AT: CT_AT,
      chatIDX: room.chat_idx,
    };

    // 서버에서 해당 방의 messageList를 받아온 뒤, Redux에 반영
    getChatMessageList(obj)
      .then((res) => {
        if (res.status === 200 && res.data.code === '200') {
          // (1) 현재 방 번호 갱신
          onChangeRoomIdx(room.chat_idx);
          // (2) 메시지 리스트 갱신
          onChangeMessageList(res.data.data);
        } else {
          alert('채팅 목록 조회 실패:' + (res.data?.message || '오류'));
        }
      })
      .catch((err) => {
        console.error('messageList 조회 오류:', err);
        alert('채팅 목록 조회 중 오류 발생');
      });
  };

  return (
    <div className={styles.container}>
      <h3>채팅 방 목록</h3>
      <ul className={styles.chatList}>
        {chatRooms.map((room) => (
          <li
            key={room.chat_idx}
            className={styles.chatItem}
            onClick={() => handleClickRoom(room)}
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

      {/* 삭제 확인 모달 */}
      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>
              방 #{targetRoom?.chat_idx}(
              <strong>{targetRoom?.summary}</strong>)
              <br />
              삭제 하시겠습니까?
            </p>
            <div className={styles.modalButtons}>
              <button onClick={handleConfirmYes} className={styles.confirmYes}>
                네
              </button>
              <button onClick={handleConfirmNo} className={styles.confirmNo}>
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
