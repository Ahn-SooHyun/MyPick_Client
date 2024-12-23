import React from 'react';
import { Layout, Row, Col, Button, Typography, Card, Tag, Carousel, Divider, Avatar } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

function ProjectIntroPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 1) 헤더 영역 */}
      <Header style={{ backgroundColor: '#001529' }}>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>My Awesome Project</div>
      </Header>

      {/* 2) 메인 콘텐츠 */}
      <Content style={{ padding: '50px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero 섹션 */}
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Title level={2}>프로젝트 이름</Title>
            <Paragraph>
              이 프로젝트는 <strong>React</strong>와 <strong>Ant Design</strong>을 활용하여
              개발한 놀라운 웹 애플리케이션입니다. 사용자에게 최고의 경험을 제공하고,
              효율적인 워크플로우를 제안합니다.
            </Paragraph>
            <Button type="primary" icon={<GithubOutlined />}>
              GitHub Repo
            </Button>
            <Button style={{ marginLeft: 10 }} icon={<MailOutlined />}>
              Contact Us
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <img
              src="https://via.placeholder.com/400x250?text=Hero+Image"
              alt="Hero"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Divider />

        {/* 기능/특징 소개 */}
        <section>
          <Title level={3}>주요 기능(Features)</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Meta 
                  title="Feature 1" 
                  description="가장 핵심적인 기능을 안내하는 영역"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Meta 
                  title="Feature 2" 
                  description="두 번째 기능 특징"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Meta 
                  title="Feature 3" 
                  description="세 번째 기능 특징"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Meta 
                  title="Feature 4" 
                  description="네 번째 기능 특징"
                />
              </Card>
            </Col>
          </Row>
        </section>

        <Divider />

        {/* 기술 스택 (Tags, Badges) */}
        <section>
          <Title level={3}>사용된 기술 (Tech Stack)</Title>
          <Paragraph>아래 기술들을 사용하여 프로젝트가 구성되었습니다.</Paragraph>
          <div style={{ marginBottom: 16 }}>
            <Tag color="blue">React</Tag>
            <Tag color="green">Ant Design</Tag>
            <Tag color="cyan">Node.js</Tag>
            <Tag color="geekblue">Express</Tag>
            <Tag color="volcano">MongoDB</Tag>
            {/* 필요에 따라 더 추가 */}
          </div>
        </section>

        <Divider />

        {/* 갤러리 / Carousel */}
        <section>
          <Title level={3}>프로젝트 화면 예시</Title>
          <Carousel autoplay dotPosition="bottom" style={{ maxWidth: 600, margin: '0 auto' }}>
            <div>
              <img
                src="https://via.placeholder.com/600x300?text=Screenshot+1"
                alt="Screenshot1"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x300?text=Screenshot+2"
                alt="Screenshot2"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x300?text=Screenshot+3"
                alt="Screenshot3"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </div>
          </Carousel>
        </section>

        <Divider />

        {/* 팀 정보 / 멤버 소개 */}
        <section>
          <Title level={3}>팀 정보 (Contributors)</Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Meta
                  avatar={<Avatar src="https://via.placeholder.com/80" />}
                  title="홍길동"
                  description="Front-End Developer"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Meta
                  avatar={<Avatar src="https://via.placeholder.com/80" />}
                  title="김삿갓"
                  description="Back-End Developer"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Meta
                  avatar={<Avatar src="https://via.placeholder.com/80" />}
                  title="박문수"
                  description="UI/UX Designer"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Meta
                  avatar={<Avatar src="https://via.placeholder.com/80" />}
                  title="이몽룡"
                  description="PM / Planner"
                />
              </Card>
            </Col>
          </Row>
        </section>
      </Content>

      {/* 3) 푸터 영역 */}
      <Footer style={{ textAlign: 'center' }}>
        My Awesome Project ©2024 Created by Our Team
      </Footer>
    </Layout>
  );
}

export default ProjectIntroPage;
