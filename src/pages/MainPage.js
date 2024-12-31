import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Carousel, Card, Row, Col } from "antd";
import styles from './MainPage.module.css';

const { Title } = Typography;
const { MainCard } = Card ;



function MainPage() {

  const containerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',     // 한 줄에 강제로 배치
    overflowX: 'auto',      // 가로 스크롤 활성화
    gap: '16px',            // 카드 간 간격
    width: '600px',         // 스크롤이 필요한 만큼 적절한 고정 폭(예시)
    border: '1px solid #ccc'
  };

  const contentStyle = {
    height: '200px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    lineHeight: '200px',
  };



  const cardStyle = {
    width: 300,
    minWidth: 300,          // 혹은 'flex: 0 0 auto' 처럼 고정 폭 지정
  };

  

  return (
    <>
    <div className={styles.imageContainer}>
      <img
        src="https://via.placeholder.com/600x400" // 원하는 이미지 URL로 변경하세요
        alt="Example"
        className={styles.image}
      />
      <div className={styles.overlay}>
        <Title level={2} className={styles.text}>Project MyPick</Title>
      </div>
    </div>
    <div>
      <h1>이런 기능들 있다~ 주저리주저리</h1>
    </div>
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card title="음악" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="영화" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="도서" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="게임" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>


    
    </>
    // <>
    //   {/* 4가지 이미지 그리드 영역 */}
    //   <div className={styles.container}>
    //     <div>
    //     <h1>AI 기반 개인화 추천 플랫폼</h1>
    //     </div>
    //     <div className={styles.topLeft}>
    //       <img src="/assets/images/booksimages.jpg" alt="Books" className={styles.image} height={'10%'} width={'10%'}/>
    //     </div>
    //     <div className={styles.topRight}>
    //       <img src="/assets/images/gameimages.jpg" alt="Games" className={styles.image} height={'10%'} width={'10%'} />
    //     </div>
    //     <div className={styles.bottomLeft}>
    //       <img src="/assets/images/movieimages.jpg" alt="Movies" className={styles.image} height={'10%'} width={'10%'} />
    //     </div>
    //     <div className={styles.bottomRight}>
    //       <img src="/assets/images/musicimages.jpg" alt="Music" className={styles.image} height={'10%'} width={'10%'} />
    //     </div>
    //   </div>

    //   {/* 풀스크린 이미지 및 소개 섹션 */}
    //   <div>
    //     <div className={styles.heroSection}>
    //       <img src="/assets/images/booksimages.jpg" alt="Hero Image" />
    //     </div>
        
    //     <div className={styles.container}>
          
    //       <p className={styles.description}>
    //         본 프로젝트는 사용자의 행동 데이터를 기반으로 영화, 음악, 도서, 상품 등 다양한 분야에서
    //         개인화된 추천 서비스를 제공하는 플랫폼입니다.
    //       </p>
    //       <p className={styles.description}>
    //         최신 AI 추천 알고리즘과 안정적인 백엔드(SpringBoot, MyBatis, MariaDB) 인프라를 기반으로 
    //         React 프론트엔드 및 Axios 연동을 통해 사용자 친화적인 인터페이스를 제공합니다.
    //       </p>
    //       <Link to="/chat" className={styles.linkButton}>채팅 페이지로 이동하기</Link>
    //     </div>
    //   </div>
    // </>
  );
}

export default MainPage;
