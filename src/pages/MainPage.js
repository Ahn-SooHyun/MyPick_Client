import React, { useState, useEffect } from 'react';
// 기존에 MainIMG.module.css 로 불리던 스타일
import styles from './MainPage.module.css';    

// Ant Design 관련
import { 
  Layout, Row, Col, Button, Typography, Card, Tag, Carousel, Divider, Avatar 
} from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

// 색상 팔레트
const COLORS = {
  backgroundLight: '#FFF0DC', // 주 배경
  accent: '#F0BB78',         // 포인트(버튼, 강조)
  darkText: '#543A14',       // 본문 텍스트, 강조 텍스트
  headerBg: '#131010',       // 헤더/진한 컬러
};

function CombinedPage() {
  // ----- MainIMG 관련 상태 & 스크롤 로직 ----- 
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // 헤더 표시/숨김
      setIsHeaderVisible(scrollTop !== 0);

      // 오버레이 불투명도 (0 ~ 1)
      const fadeDistance = 1080;
      let newOpacity = scrollTop / fadeDistance;
      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 1) newOpacity = 1;
      setOverlayOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ----- MainPage(기존) 관련 로직 -----
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* --- (1) 스크롤 시 나타나는 헤더 --- */}
      <header
        className={`${styles.header} ${!isHeaderVisible ? styles.headerHidden : ''}`}
      >
        스크롤을 내리면 나타나는 헤더
      </header>

      {/* --- (2) 고정 배경 이미지 + 오버레이 + 중앙 텍스트 --- */}
      <div className={styles.imageContainer}>
        {/* 
          (중요) public 폴더 파일은 import 하지 않고
          '/assets/images/hamster_wallpaper.jpg' 로 직접 경로만 작성 
        */}
        <img
          src="/assets/images/hamster_wallpaper.jpg"
          alt="Hamster Wallpaper"
          className={styles.myImage}
        />

        <div
          className={styles.overlay}
          style={{ opacity: overlayOpacity }}
        />
        <h1 className={styles.centerText}>MyPick Project</h1>
      </div>

      {/*
        (3) MainIMG의 '본문' 역할이 여기부터 시작됩니다.
        이 부분 아래로 스크롤하면 MainPage(프로젝트 소개) 콘텐츠가 이어짐 
      */}
      <main className={styles.content}>

        {/* ========================= */}
        {/* === MainPage 영역 시작 === */}
        {/* ========================= */}
        <Layout style={{ backgroundColor: COLORS.backgroundLight, minHeight: '100vh' }}>
          
          {/* 
            -- MainPage의 Header(원하면 삭제 가능) --
            주석 처리된 상태
          */}
          {/*
          <Header
            style={{
              backgroundColor: COLORS.headerBg,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px'
            }}
          >
            <div style={{ color: COLORS.backgroundLight, fontSize: 24, fontWeight: 'bold' }}>
              My Cute Project
            </div>
          </Header>
          */}

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
                onClick={() => navigate('/chat')} // 예: /chat 경로로 이동
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

          {/* MainPage의 Footer (원하면 제거 가능) */}
          <Footer style={{ backgroundColor: COLORS.headerBg, textAlign: 'center', color: COLORS.backgroundLight }}>
            My Cute Project ©2024 Created by Our Team
          </Footer>
        </Layout>
        {/* === MainPage 영역 끝 === */}
        
      </main>
    </div>
  );
}

export default CombinedPage;
