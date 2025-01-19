// NoticeDetail.js
import React from "react";
import { Card, Typography } from "antd";
import { useParams } from "react-router-dom";
import styles from "../../css/notice/NoticeDetail.module.css"; // CSS Modules import

const { Title, Paragraph } = Typography;

function NoticeDetail() {
  // URL 파라미터에서 noticeId 추출
  const { noticeId } = useParams();

  // 실제로는 서버에서 noticeId로 상세 데이터를 fetch할 수 있음
  // 여기서는 예시로 하드코딩
  const noticeData = {
    title: `공지사항 ${noticeId} 제목 예시`,
    date: "2024-01-01",
    content: `
      자세한 공지 내용 예시... 
      공지 ${noticeId}에 대한 상세 설명이 들어갑니다.
    `,
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
      </Card>
    </div>
  );
}

export default NoticeDetail;
