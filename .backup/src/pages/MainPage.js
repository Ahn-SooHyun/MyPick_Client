// // MainPage.js
// import React, { useState, useEffect } from 'react';
// import styles from './MainPage.module.css';

// import {
//   Row, Col, Button, Typography, Card, Tag, Carousel, Divider, Avatar, Space, List
// } from 'antd';
// import { GithubOutlined, MailOutlined, SoundOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// import hamsterImg from '../assets/images/hamster_wallpaper.jpg';
// // NoticeList.js에서 export 한 notices 배열 import
// import { notices } from './NoticeList'; 

// const { Title, Paragraph } = Typography;
// const { Meta } = Card;

// const COLORS = {
//   accent: '#F0BB78',
//   darkText: '#543A14',
//   headerBg: '#131010',
// };

// function MainPage() {
//   const [isHeaderVisible, setIsHeaderVisible] = useState(false);
//   const [isLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // 스크롤 감지 → 헤더 표시/숨김
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsHeaderVisible(scrollTop !== 0);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // 최신 공지 4개만 가져오기 (날짜 내림차순)
//   const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
//   const top4Notices = sortedNotices.slice(0, 4);

//   // 공지 클릭 시 상세보기로 이동
//   const handleNoticeClick = (id) => {
//     navigate(`/notice/${id}`);
//   };

//   // 공지사항 섹션 클릭 시 전체 공지사항 리스트 페이지로 이동
//   const handleNoticeSectionClick = () => {
//     navigate('/notice');
//   };

//   // 채팅 버튼 클릭 시 이동
//   const handleChatButtonClick = () => {
//     if (isLoggedIn) {
//       navigate('/chat');
//     } else {
//       navigate('/login');
//     }
//   };

//   // (3) 날짜 기준 내림차순 정렬 후, 최신 4개 공지 추출
//   const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
//   const latestNotices = sortedNotices.slice(0, 4);

//   // (4) 공지 카드 클릭 시 해당 NoticeDetail로 이동
//   const handleNoticeCardClick = (id) => {
//     navigate(`/notice/${id}`);
//   };

//   return (
//     <div className={styles.container}>
//       {/* 헤더 */}
//       <header
//         className={`${styles.header} ${!isHeaderVisible ? styles.headerHidden : ''}`}
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0 1rem',
//         }}
//       >
//         <div>스크롤을 내리면 나타나는 헤더</div>
//         <Button
//           type="primary"
//           style={{
//             borderRadius: '8px',
//             backgroundColor: COLORS.accent,
//             borderColor: COLORS.accent,
//             marginRight: '30px'
//           }}
//           onClick={handleChatButtonClick}
//         >
//           채팅하러 가기
//         </Button>
//       </header>

//       {/* 배경 이미지 + 중앙 텍스트 */}
//       <div className={styles.imageContainer}>
//         <img src={hamsterImg} alt="Hamster Wallpaper" className={styles.myImage} />
//         <h1 className={styles.centerText}>MyPick Project</h1>
//       </div>

//       {/* 메인 (흰색) 영역 */}
//       <main className={styles.content}>

//         {/* 첫 번째 베이지색 섹션 */}
//         <Card
//           bodyStyle={{ padding: 40 }}
//           style={{
//             position: 'relative',
//             left: '50%', 
//             transform: 'translateX(-50%)',
//             width: '100%',  // '100vw'에서 '100%'로 변경
//             backgroundColor: '#FFF0DC',
//             borderRadius: 50,
//             boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
//             marginBottom: 40,
//             overflow: 'hidden',  // 내용이 넘치지 않도록
//           }}
//         >
//           <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//             <Row gutter={[24, 24]}>
//               <Col xs={24} md={12}>
//                 <Title level={2} style={{ color: COLORS.darkText }}>
//                   귀여운 프로젝트
//                 </Title>
//                 <Paragraph style={{ color: COLORS.darkText, fontSize: '1rem' }}>
//                   이 프로젝트는 <strong>React</strong>와 <strong>Ant Design</strong>을 활용해
//                   깜찍하고 사랑스러운 디자인을 구현한 예시입니다.
//                   <br />
//                   밝은 색상을 통해 유저에게 아기자기한 느낌을 전달하고,
//                   심플하지만 포근한 인터페이스를 제공합니다.
//                 </Paragraph>
//                 <Space>
//                   {/* GitHub Repo 버튼: 서버 */}
//                   <Button
//                     type="primary"
//                     icon={<GithubOutlined />}
//                     style={{
//                       backgroundColor: COLORS.accent,
//                       borderColor: COLORS.accent,
//                       borderRadius: 10,
//                       fontWeight: 'bold',
//                     }}
//                     onClick={() => window.open('https://github.com/Ahn-SooHyun/MyPick_Server', '_blank')}
//                   >
//                     MyPick_Server GitHub
//                   </Button>
//                   {/* GitHub Repo 버튼: 클라이언트 */}
//                   <Button
//                     type="primary"
//                     icon={<GithubOutlined />}
//                     style={{
//                       backgroundColor: COLORS.accent,
//                       borderColor: COLORS.accent,
//                       borderRadius: 10,
//                       fontWeight: 'bold',
//                     }}
//                     onClick={() => window.open('https://github.com/Ahn-SooHyun/MyPick_Client', '_blank')}
//                   >
//                     MyPick_Client GitHub
//                   </Button>
//                   {/* Contact Us 버튼 */}
//                   <Button
//                     icon={<MailOutlined />}
//                     style={{
//                       backgroundColor: '#FFF0DC',
//                       borderColor: COLORS.accent,
//                       color: COLORS.darkText,
//                       borderRadius: 10,
//                       fontWeight: 'bold'
//                     }}
//                     onClick={() => window.open('mailto:ahn.soohyun@example.com', '_blank')}  // 실제 이메일 주소로 변경
//                   >
//                     Contact Us
//                   </Button>
//                 </Space>
//               </Col>

//               <Col xs={24} md={12} style={{ textAlign: 'center' }}>
//                 <div
//                   style={{
//                     backgroundColor: COLORS.accent,
//                     borderRadius: '20px',
//                     padding: '20px'
//                   }}
//                 >
//                   <img
//                     src="https://via.placeholder.com/400x250?text=Cute+Hero+Image"
//                     alt="Hero"
//                     style={{ width: '100%', borderRadius: '20px' }}
//                   />
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Card>

//         {/* 일반 섹션 (중앙 정렬) */}
//         <div className={styles.innerContainer}>
//           <Divider className={styles.sectionDivider} />
//           <section>
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               주요 기능(Features)
//             </Title>
//             <Row gutter={[24, 24]}>
//               {[1, 2, 3, 4].map((idx) => (
//                 <Col key={idx} xs={24} sm={12} md={6}>
//                   <Card
//                     hoverable
//                     style={{
//                       borderRadius: '16px',
//                       backgroundColor: '#fff',
//                       borderColor: COLORS.accent
//                     }}
//                   >
//                     <Meta
//                       title={`Feature ${idx}`}
//                       description={`기능 ${idx}의 간단한 설명을 적어주세요.`}
//                       style={{ color: COLORS.darkText }}
//                     />
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </section>

//           <Divider className={styles.sectionDivider} />
          
//           {/* 공지사항 섹션을 클릭 가능하게 설정 */}
//           <section
//             onClick={handleNoticeSectionClick}
//             style={{ 
//               cursor: 'pointer', 
//               padding: '20px', 
//               backgroundColor: '#f5f5f5', 
//               borderRadius: '8px',
//               marginBottom: '20px', // 공지사항 섹션과 리스트 사이 간격
//             }}
//             role="button"
//             tabIndex="0"
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleNoticeSectionClick();
//               }
//             }}
//           >
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               공지사항(Notice)
//             </Title>
//             <Paragraph style={{ color: COLORS.darkText }}>
//               이곳은 프로젝트와 관련된 공지사항을 보여주는 공간입니다.
//               업데이트 소식, 이벤트, 버전 변경 등 중요한 정보를 여기에 작성할 수 있습니다.
//             </Paragraph>
//           </section>

//           {/* 최신 공지 4개 리스트 (미리보기) */}
//           <List
//             itemLayout="horizontal"
//             dataSource={top4Notices}
//             renderItem={(item) => {
//               const preview = item.content.length > 40
//                 ? item.content.slice(0, 40) + '...'
//                 : item.content;

//               return (
//                 <List.Item
//                   onClick={() => handleNoticeClick(item.id)}
//                   style={{ cursor: 'pointer', padding: '10px 0' }}  // 리스트 아이템에도 포인터 커서
//                 >
//                   <List.Item.Meta
//                     avatar={
//                       <SoundOutlined
//                         style={{
//                           marginLeft: 15,
//                           fontSize: 24,
//                           color: COLORS.darkText
//                         }}
//                       />
//                     }
//                     title={
//                       <span style={{ color: COLORS.darkText, fontWeight: 'bold' }}>
//                         {item.title}
//                       </span>
//                     }
//                     description={
//                       <span style={{ color: COLORS.darkText }}>
//                         {preview}
//                       </span>
//                     }
//                   />
//                 </List.Item>
//               );
//             }}
//           />

//           <Divider className={styles.sectionDivider} />
//           <section>
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               사용된 기술 (Tech Stack)
//             </Title>
//             <Paragraph style={{ color: COLORS.darkText }}>
//               해당 프로젝트는 아래 기술 스택을 통해 만들어졌습니다.
//             </Paragraph>
//             <div style={{ marginBottom: 16 }}>
//               <Tag
//                 color={COLORS.accent}
//                 style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
//               >
//                 React
//               </Tag>
//               <Tag
//                 color={COLORS.accent}
//                 style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
//               >
//                 Ant Design
//               </Tag>
//               <Tag
//                 color={COLORS.accent}
//                 style={{ color: COLORS.headerBg, fontWeight: 'bold', borderRadius: 10 }}
//               >
//                 Node.js
//               </Tag>
//             </div>
//           </section>
//         </div>

//         {/* 베이지색 섹션 (프로젝트 화면 예시) */}
//         <Card
//           bodyStyle={{ padding: 40 }}
//           style={{
//             position: 'relative',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             width: '100%',  // '100vw'에서 '100%'로 변경
//             backgroundColor: '#FFF0DC',
//             borderRadius: 50,
//             boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
//             margin: '40px 0',
//             textAlign: 'center',
//             overflow: 'hidden',  // 내용이 넘치지 않도록
//           }}
//         >
//           <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               프로젝트 화면 예시
//             </Title>
//             <Carousel autoplay dotPosition="bottom" style={{ maxWidth: 600, margin: '0 auto' }}>
//               <div>
//                 <img
//                   src="https://via.placeholder.com/600x300?text=Screenshot+1"
//                   alt="Screenshot1"
//                   style={{ width: '100%', borderRadius: '16px' }}
//                 />
//               </div>
//               <div>
//                 <img
//                   src="https://via.placeholder.com/600x300?text=Screenshot+2"
//                   alt="Screenshot2"
//                   style={{ width: '100%', borderRadius: '16px' }}
//                 />
//               </div>
//               <div>
//                 <img
//                   src="https://via.placeholder.com/600x300?text=Screenshot+3"
//                   alt="Screenshot3"
//                   style={{ width: '100%', borderRadius: '16px' }}
//                 />
//               </div>
//             </Carousel>
//           </div>
//         </Card>

//         <div className={styles.innerContainer}>
//           <Divider className={styles.sectionDivider} />
//           <section style={{ marginTop: 24 }}>
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               개발 로그(Development Log)
//             </Title>
//             <Paragraph style={{ color: COLORS.darkText }}>
//               이곳은 프로젝트 개발 과정에서의 로그나 변화 내역을 공유하는 공간입니다.
//               예를 들어, 일정 관리, 기능 추가/제거 내용, 버그 수정 사항 등을 간단히 안내할 수 있습니다.
//             </Paragraph>
//           </section>

//           <div style={{ textAlign: 'center', marginTop: 24 }}>
//             <Button
//               style={{
//                 background: 'linear-gradient(to right, #F0BB78, #543A14)',
//                 color: '#FFF',
//                 border: 'none',
//                 borderRadius: 10,
//                 padding: '0 24px',
//                 height: 40,
//                 fontWeight: 'bold',
//               }}
//               onClick={() => navigate('/chat')}
//             >
//               채팅하러 가기
//             </Button>
//           </div>

//           <Divider className={styles.sectionDivider} />

//           {/* 팀 정보 */}
//           <section
//             style={{
//               paddingBottom: 60,
//             }}
//           >
//             <Title level={3} style={{ color: COLORS.darkText }}>
//               팀 정보 (Contributors)
//             </Title>
//             <Row gutter={[16, 16]}>
//               {[
//                 { name: '홍길동', role: 'Front-End' },
//                 { name: '김삿갓', role: 'Back-End' },
//                 { name: '박문수', role: 'UI/UX' },
//                 { name: '이몽룡', role: 'PM' }
//               ].map((member, idx) => (
//                 <Col key={idx} xs={24} sm={12} md={6}>
//                   <Card
//                     style={{
//                       borderRadius: '16px',
//                       borderColor: COLORS.accent
//                     }}
//                   >
//                     <Meta
//                       avatar={
//                         <Avatar
//                           src="https://via.placeholder.com/80"
//                           style={{ border: `2px solid ${COLORS.accent}` }}
//                         />
//                       }
//                       title={member.name}
//                       description={member.role}
//                       style={{ color: COLORS.darkText }}
//                     />
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </section>
//         </div>
//       </main>

//       {/* 푸터 */}
//       <footer
//         style={{
//           backgroundColor: COLORS.headerBg,
//           textAlign: 'center',
//           color: '#FFF0DC',
//           padding: '16px 0',
//         }}
//       >
//         My Cute Project ©2024 Created by Our Team
//       </footer>
//     </div>
//   );
// }

// export default MainPage;
