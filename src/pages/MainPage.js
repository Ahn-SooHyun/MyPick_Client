import React, { useState, useEffect } from 'react';
import styles from './MainPage.module.css';

import {
  Layout, Row, Col, Button, Typography, Card, Tag, Carousel, Divider, Avatar
} from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import hamsterImg from '../assets/images/hamster_wallpaper.jpg';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

// 메인 페이지에서 사용될 색상 정의
const COLORS = {
  backgroundLight: '#FFF0DC',
  accent: '#F0BB78',
  darkText: '#543A14',
  headerBg: '#131010',
};

function CombinedPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  // 로그인 여부 (예시로 가정)
  const [isLoggedIn] = useState(false);

  // 공지 데이터 (NoticeList.js와 동일한 배열 일부만 가져옴)
  // 실제로는 API 호출 또는 Context/Redux 등을 통해 받아올 수 있습니다.
  const notices = [
    {
      id: 1,
      title: '새해 맞이 이벤트 안내',
      date: '2024-01-01',
      content: '안녕하세요. 새해 맞이 이벤트에 대한 상세 안내 내용이 들어갑니다. 많은 관심 부탁드립니다!'
    },
    {
      id: 2,
      title: '서버 점검 일정 안내',
      date: '2024-01-15',
      content: '서버 점검이 예정되어 있으니 이용에 참고 부탁드립니다. 점검 상세 사항은 홈페이지를 확인하세요.'
    },
    {
      id: 3,
      title: '설 연휴 고객센터 운영 안내',
      date: '2024-02-02',
      content: '설 연휴 기간 동안 고객센터 운영 시간이 변경됩니다. 자세한 내용은 이후 공지를 통해 안내해 드리겠습니다.'
    },
    {
      id: 4,
      title: '신규 기능 업데이트',
      date: '2024-02-10',
      content: '신규 기능이 추가되었습니다. 자세한 내용은 공지 사항을 확인하세요.'
    },
    {
      id: 5,
      title: '보안 패치 안내',
      date: '2024-02-15',
      content: '보안 패치가 적용될 예정입니다. 서비스 이용에 참고 부탁드립니다.'
    },
    // 필요에 따라 추가...
  ];

  // (1) 스크롤 시 헤더 노출 여부와 오버레이 투명도 설정
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsHeaderVisible(scrollTop !== 0);

      // 스크롤 비례 오버레이 투명도 계산
      const fadeDistance = window.innerHeight;
      let newOpacity = scrollTop / fadeDistance;
      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 1) newOpacity = 1;
      setOverlayOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  // (2) 로그인 여부에 따라 채팅 버튼 클릭 시 이동할 페이지 결정
  const handleChatButtonClick = () => {
    if (isLoggedIn) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  };

  // (3) 날짜 기준 내림차순 정렬 후, 최신 4개 공지 추출
  const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestNotices = sortedNotices.slice(0, 4);

  // (4) 공지 카드 클릭 시 해당 NoticeDetail로 이동
  const handleNoticeCardClick = (id) => {
    navigate(`/notice/${id}`);
  };

  return (
    <div className={styles.container}>
      {/* --- (1) 스크롤 시 나타나는 헤더 --- */}
      <header
        className={`${styles.header} ${!isHeaderVisible ? styles.headerHidden : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
        <div>스크롤을 내리면 나타나는 헤더</div>
        <Button
          type="primary"
          style={{
            borderRadius: '8px',
            backgroundColor: COLORS.accent,
            borderColor: COLORS.accent,
            marginRight: '30px'
          }}
          onClick={handleChatButtonClick}
        >
          채팅하러 가기
        </Button>
      </header>

      {/* --- (2) 고정 배경 이미지 + 오버레이 + 중앙 텍스트 --- */}
      <div className={styles.imageContainer}>
        <img
          src={hamsterImg}
          alt="Hamster Wallpaper"
          className={styles.myImage}
        />
        <div
          className={styles.overlay}
          style={{ opacity: overlayOpacity }}
        />
        <h1 className={styles.centerText}>MyPick Project</h1>
      </div>

      {/* (3) 본문 영역 */}
      <main className={styles.content}>
        <Layout style={{ backgroundColor: COLORS.backgroundLight, minHeight: '100vh' }}>
          <Content style={{ padding: '30px', margin: '0 auto' }}>
            {/* Hero 섹션 */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Title level={2} style={{ color: COLORS.darkText }}>
                  귀여운 프로젝트
                </Title>
                <Paragraph style={{ color: COLORS.darkText, fontSize: '1rem' }}>
                  이 프로젝트는 <strong>React</strong>와 <strong>Ant Design</strong>을 활용해
                  깜찍하고 사랑스러운 디자인을 구현한 예시입니다.
                  <br />
                  밝은 색상을 통해 유저에게 아기자기한 느낌을 전달하고,
                  심플하지만 포근한 인터페이스를 제공합니다.
                </Paragraph>
                <Button
                  type="primary"
                  icon={<GithubOutlined />}
                  style={{
                    backgroundColor: COLORS.accent,
                    borderColor: COLORS.accent,
                    borderRadius: 10,
                    fontWeight: 'bold',
                  }}
                >
                  GitHub Repo
                </Button>
                <Button
                  icon={<MailOutlined />}
                  style={{
                    marginLeft: 10,
                    backgroundColor: COLORS.backgroundLight,
                    borderColor: COLORS.accent,
                    color: COLORS.darkText,
                    borderRadius: 10,
                    fontWeight: 'bold'
                  }}
                >
                  Contact Us
                </Button>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    backgroundColor: COLORS.accent,
                    borderRadius: '20px',
                    padding: '20px'
                  }}
                >
                  <img
                    src="https://via.placeholder.com/400x250?text=Cute+Hero+Image"
                    alt="Hero"
                    style={{ width: '100%', borderRadius: '20px' }}
                  />
                </div>
              </Col>
            </Row>

            <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

            {/* 기능/특징 소개 (Features) */}
            <section>
              <Title level={3} style={{ color: COLORS.darkText }}>
                주요 기능(Features)
              </Title>
              <Row gutter={[24, 24]}>
                {[1, 2, 3, 4].map((idx) => (
                  <Col key={idx} xs={24} sm={12} md={6}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: '16px',
                        backgroundColor: COLORS.backgroundLight,
                        borderColor: COLORS.accent
                      }}
                    >
                      <Meta
                        title={`Feature ${idx}`}
                        description={`기능 ${idx}의 간단한 설명을 적어주세요.`}
                        style={{ color: COLORS.darkText }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>

            <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

            {/* 공지사항(Notice) 섹션 */}
            <section>
              <Title level={3} style={{ color: COLORS.darkText }}>
                공지사항(Notice)
              </Title>
              <Paragraph style={{ color: COLORS.darkText }}>
                이곳은 프로젝트와 관련된 공지사항을 보여주는 공간입니다.
                업데이트 소식, 이벤트, 버전 변경 등 중요한 정보를 여기에 작성할 수 있습니다.
              </Paragraph>

              {/* (4) 최신 공지 4개 카드 형태 표시 */}
              <Row gutter={[16, 16]}>
                {latestNotices.map((notice) => (
                  <Col key={notice.id} xs={24} sm={12} md={6}>
                    <Card
                      hoverable
                      title={notice.title}
                      style={{
                        borderColor: COLORS.accent,
                        borderRadius: '10px',
                      }}
                      onClick={() => handleNoticeCardClick(notice.id)}
                    >
                      <p style={{ marginBottom: 4, color: COLORS.darkText }}>
                        작성일: {notice.date}
                      </p>
                      <p style={{ color: COLORS.darkText }}>
                        {notice.content.length > 30
                          ? notice.content.slice(0, 30) + '...'
                          : notice.content}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>

            <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

            {/* 기술 스택 (Tags, Badges) */}
            <section>
              <Title level={3} style={{ color: COLORS.darkText }}>
                사용된 기술 (Tech Stack)
              </Title>
              <Paragraph style={{ color: COLORS.darkText }}>
                해당 프로젝트는 아래 기술 스택을 통해 만들어졌습니다.
              </Paragraph>
              <div style={{ marginBottom: 16 }}>
                <Tag
                  color={COLORS.accent}
                  style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
                >
                  React
                </Tag>
                <Tag
                  color={COLORS.accent}
                  style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
                >
                  Ant Design
                </Tag>
                <Tag
                  color={COLORS.accent}
                  style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
                >
                  Node.js
                </Tag>
              </div>
            </section>

            <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

            {/* 갤러리 / Carousel */}
            <section style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: COLORS.darkText }}>
                프로젝트 화면 예시
              </Title>
              <Carousel autoplay dotPosition="bottom" style={{ maxWidth: 600, margin: '0 auto' }}>
                <div>
                  <img
                    src="https://via.placeholder.com/600x300?text=Screenshot+1"
                    alt="Screenshot1"
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/600x300?text=Screenshot+2"
                    alt="Screenshot2"
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/600x300?text=Screenshot+3"
                    alt="Screenshot3"
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </div>
              </Carousel>
            </section>

            {/* 개발 로그(Development Log) 섹션 */}
            <section style={{ marginTop: 24 }}>
              <Title level={3} style={{ color: COLORS.darkText }}>
                개발 로그(Development Log)
              </Title>
              <Paragraph style={{ color: COLORS.darkText }}>
                이곳은 프로젝트 개발 과정에서의 로그나 변화 내역을 공유하는 공간입니다.
                예를 들어, 일정 관리, 기능 추가/제거 내용, 버그 수정 사항 등을 간단히 안내할 수 있습니다.
              </Paragraph>
            </section>

            {/* Gradient Button (예시) */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button
                style={{
                  background: 'linear-gradient(to right, #F0BB78, #543A14)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 10,
                  padding: '0 24px',
                  height: 40,
                  fontWeight: 'bold',
                }}
                onClick={() => navigate('/chat')}
              >
                채팅하러 가기
              </Button>
            </div>

            <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

            {/* 팀 정보 / 멤버 소개 */}
            <section>
              <Title level={3} style={{ color: COLORS.darkText }}>
                팀 정보 (Contributors)
              </Title>
              <Row gutter={[16, 16]}>
                {[
                  { name: '홍길동', role: 'Front-End' },
                  { name: '김삿갓', role: 'Back-End' },
                  { name: '박문수', role: 'UI/UX' },
                  { name: '이몽룡', role: 'PM' }
                ].map((member, idx) => (
                  <Col key={idx} xs={24} sm={12} md={6}>
                    <Card
                      style={{
                        borderRadius: '16px',
                        borderColor: COLORS.accent
                      }}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            src="https://via.placeholder.com/80"
                            style={{ border: `2px solid ${COLORS.accent}` }}
                          />
                        }
                        title={member.name}
                        description={member.role}
                        style={{ color: COLORS.darkText }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </Content>

          <Footer style={{ backgroundColor: COLORS.headerBg, textAlign: 'center', color: COLORS.backgroundLight }}>
            My Cute Project ©2024 Created by Our Team
          </Footer>
        </Layout>
      </main>
    </div>
  );
}

export default CombinedPage;
