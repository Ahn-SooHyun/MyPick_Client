import React, { useState } from 'react';
import { Card, Typography, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './NoticeDetail.module.css';  // CSS Modules import

const { Title, Paragraph } = Typography;

function NoticeDetail() {
  // [가상의 관리자 판단 로직] 실제로는 로그인/토큰 등으로부터 관리자 여부를 받아와야 함.
  const [isAdmin] = useState(true);

  // URL 파라미터에서 noticeId 추출
  const { noticeId } = useParams();

  // 실제로는 서버에서 noticeId로 상세 데이터를 fetch할 수 있음
  // 여기서는 예시로 하드코딩
  const noticeData = {
    title: `공지사항 ${noticeId} 제목 예시`,
    date: '2024-01-01',
    content: `
      자세한 공지 내용 예시... 
      공지 ${noticeId}에 대한 상세 설명이 들어갑니다.
    `,
  };

  // 관리자용 수정/삭제 버튼
  const handleEdit = () => {
    message.info(`[공지 ${noticeId}] 수정 기능은 아직 구현되지 않았습니다.`);
    // TODO: 실제로는 수정 페이지 이동 or Modal 노출 등
  };

  const handleDelete = () => {
    message.info(`[공지 ${noticeId}] 삭제 기능은 아직 구현되지 않았습니다.`);
    // TODO: 실제로는 서버 요청 후 페이지 이동 등
  };

  return (
    <div className={styles.noticeDetailContainer}>
      <Card className={styles.noticeDetailCard}>
        <Title level={3} className={styles.noticeDetailTitle}>
          {noticeData.title}
        </Title>
        <Paragraph className={styles.noticeDetailDate}>
          작성일: {noticeData.date}
        </Paragraph>
        <Paragraph className={styles.noticeDetailContent}>
          {noticeData.content}
        </Paragraph>

        {/* 관리자 전용: 수정, 삭제 버튼 */}
        {isAdmin && (
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={handleEdit}>
              수정
            </Button>
            <Button danger onClick={handleDelete}>
              삭제
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default NoticeDetail;
