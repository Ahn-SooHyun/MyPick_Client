import React from 'react';
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Card,
  Tag,
  Carousel,
  Divider,
  Avatar
} from 'antd';
import {
  GithubOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

// 색상 팔레트
const COLORS = {
  backgroundLight: '#FFF0DC', // 주 배경
  accent: '#F0BB78',         // 포인트(버튼, 강조)
  darkText: '#543A14',       // 본문 텍스트, 강조 텍스트
  headerBg: '#131010',       // 헤더/진한 컬러
};

function ProjectIntroPage() {
  return (
    <Layout style={{ backgroundColor: COLORS.backgroundLight, minHeight: '100vh' }}>
      {/* --- Header 영역 --- */}
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

      {/* --- 메인 콘텐츠 --- */}
      <Content style={{ padding: '30px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero 섹션 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={2} style={{ color: COLORS.darkText }}>
              귀여운 프로젝트
            </Title>
            <Paragraph style={{ color: COLORS.darkText, fontSize: '1rem' }}>
              이 프로젝트는 <strong>React</strong>와 <strong>Ant Design</strong>을 활용해 
              깜찍하고 사랑스러운 디자인을 구현한 예시입니다.  
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

        {/* 기능/특징 소개 */}
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
            {/* 필요 시 더 추가 */}
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

        <Divider style={{ borderColor: COLORS.darkText, opacity: 0.4 }} />

        {/* 팀 정보 / 멤버 소개 */}
        <section>
          <Title level={3} style={{ color: COLORS.darkText }}>
            팀 정보 (Contributors)
          </Title>
          <Row gutter={[16, 16]}>
            {[{ name: '홍길동', role: 'Front-End' }, { name: '김삿갓', role: 'Back-End' }, { name: '박문수', role: 'UI/UX' }, { name: '이몽룡', role: 'PM' }].map((member, idx) => (
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

      {/* --- Footer 영역 --- */}
      <Footer style={{ backgroundColor: COLORS.headerBg, textAlign: 'center', color: COLORS.backgroundLight }}>
        My Cute Project ©2024 Created by Our Team
      </Footer>
    </Layout>
  );
}

export default ProjectIntroPage;
