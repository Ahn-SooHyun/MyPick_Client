import React, { useEffect, useState } from 'react';
import { Button, Input, Card, Typography } from 'antd';
import styles from './ChatBefore.module.css';
import api from '../../axiosSetting';
import { getCookieValue } from '../../utils/cookie';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessageList, selectRoomIdx, changeRoomIdx } from '../../@modules/chatRoom';

const { Title, Paragraph, Text } = Typography;

function ChatBefore() {
  const dispatch = useDispatch();

  const [initialMessage, setInitialMessage] = useState('');

  // Redux selector 예시(디버깅용)
  const messageListT = useSelector(selectMessageList);
  const RoomIdxT = useSelector(selectRoomIdx);

  useEffect(() => {
    console.log("=== ChatBefore Debug ===");
    console.log("Redux messageList: ", messageListT);
    console.log("Redux roomIdx: ", RoomIdxT);
    console.log("========================");
  }, [messageListT, RoomIdxT]);

  // 방 생성 로직
  const handleStart = async () => {
    const trimmed = initialMessage.trim();

    // 1) 슬래시 + (게임|음악|도서|영화)
    if (!/^\/(게임|음악|도서|영화)$/.test(trimmed)) {
      alert('올바른 카테고리를 입력하세요. (예: /게임, /음악, /도서, /영화)');
      return;
    }

    try {
      const CT_AT = getCookieValue('CT_AT');
      if (!CT_AT) {
        alert('로그인이 필요합니다. (쿠키에 CT_AT 없음)');
        return;
      }

      const response = await api.get('/chat/message/message', {
        params: {
          prompt: trimmed,
          CT_AT: CT_AT, // 대문자로 전송
          chatIDX: 0,   // createRoom
        },
      });

      if (response.data.code === '200') {
        alert('방이 생성되었습니다!');
        
        // 백엔드 응답에서 chat_idx가 있다면 꺼내기
        const newRoomIdx = response.data.data?.chat_idx || 1;
        
        // (A) Redux에 방 번호 설정
        dispatch(changeRoomIdx(newRoomIdx));
      } else {
        alert('방 생성 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('방 생성 오류:', error);
      alert('방 생성 중 오류 발생');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={3}>카테고리 입력</Title>
        <Paragraph>아래 순서대로 채팅을 입력하세요.</Paragraph>

        <div className={styles.exampleArea}>
          <Paragraph>
            <strong>1.</strong> <Text code>/게임, /음악, /도서, /영화</Text> 중 택일<br/>
            예: <Text code>/게임</Text> → 게임 추천 모드
          </Paragraph>
          <Paragraph>
            <strong>2.</strong> AI에게 원하는 내용 입력<br/>
            예: "눈 오는 날 듣기 좋은 노래 추천"
          </Paragraph>
          <Paragraph type="secondary">
            <em>
              1번은 여기서, 2번은 ChatMain에서<br/>
              일반 메시지로 입력합니다.
            </em>
          </Paragraph>
        </div>

        <Input
          className={styles.input}
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
          style={{ marginTop: 16 }}
        />
        <Button type="primary" style={{ marginTop: 16 }} onClick={handleStart}>
          채팅 시작
        </Button>
      </Card>
    </div>
  );
}

export default ChatBefore;
