// NoticeList.js
import React, { useState } from 'react';
import { List, Typography, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SoundOutlined } from '@ant-design/icons';
import styles from './NoticeList.module.css';

const { Title } = Typography;
const { Search } = Input;

/** 
 * notices 배열을 export
 * 다른 파일에서 import하여 사용할 수 있도록 함
 */
export const notices = [
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
  {
    id: 6,
    title: '오프라인 행사 초대',
    date: '2024-03-01',
    content: '오프라인 행사에 참여해 주신 분들께 소정의 기념품을 드립니다.'
  },
  {
    id: 7,
    title: '회원 등급 조정 안내',
    date: '2024-03-05',
    content: '회원 등급 정책이 일부 변경됩니다. 자세한 내용은 공지를 확인하세요.'
  },
  {
    id: 8,
    title: '시스템 점검 완료',
    date: '2024-03-10',
    content: '시스템 점검이 정상적으로 완료되었습니다. 불편을 드려 죄송합니다.'
  },
  {
    id: 9,
    title: '모바일 앱 리뉴얼 소식',
    date: '2024-03-15',
    content: '모바일 앱 인터페이스가 새로워집니다. 더 편리해진 기능을 기대해주세요.'
  },
  {
    id: 10,
    title: '휴면 계정 정책 변경',
    date: '2024-03-20',
    content: '휴면 계정 정책이 변경될 예정이니, 자세한 내용 확인 부탁드립니다.'
  },
  {
    id: 11,
    title: 'UI/UX 개선 사항',
    date: '2024-04-01',
    content: '다양한 UI/UX 개선 작업이 진행되었습니다. 더 편리한 환경을 제공드립니다.'
  },
  {
    id: 12,
    title: '포인트 적립 이벤트',
    date: '2024-04-05',
    content: '특정 활동을 하면 포인트가 적립됩니다. 기간 한정 이벤트를 놓치지 마세요.'
  },
  {
    id: 13,
    title: '주말 고객센터 운영',
    date: '2024-04-10',
    content: '주말에도 고객센터를 운영합니다. 자세한 운영 시간을 확인하세요.'
  },
  {
    id: 14,
    title: '유지보수 안내',
    date: '2024-04-15',
    content: '일시적인 유지보수가 예정되어 있으며, 서비스에 잠시 영향이 있을 수 있습니다.'
  },
  {
    id: 15,
    title: '신규 가입 혜택',
    date: '2024-04-20',
    content: '신규 가입 회원들을 위한 특별 혜택을 준비했습니다.'
  },
  {
    id: 16,
    title: '임시 점검 공지',
    date: '2024-05-01',
    content: '긴급 상황으로 인해 임시 점검이 있을 예정입니다. 이용에 참고해 주시기 바랍니다.'
  },
  {
    id: 17,
    title: 'FAQ 업데이트',
    date: '2024-05-05',
    content: '자주 묻는 질문(FAQ) 항목이 추가 및 업데이트되었습니다.'
  },
  {
    id: 18,
    title: '계정 보호 기능 추가',
    date: '2024-05-10',
    content: '계정 안전성을 위해 2단계 인증 등 보호 기능이 추가되었습니다.'
  },
  {
    id: 19,
    title: '회원정보 업데이트 요청',
    date: '2024-05-15',
    content: '회원정보 업데이트를 권장합니다. 일부 오래된 정보는 삭제될 수 있습니다.'
  },
  {
    id: 20,
    title: '테스트 서버 운영 소식',
    date: '2024-05-20',
    content: '새로운 기능 테스트를 위한 테스트 서버가 개설되었습니다. 원하는 분은 참여하세요.'
  },
  {
    id: 21,
    title: '기타 문의 안내',
    date: '2024-05-25',
    content: '기타 문의 사항은 고객센터로 문의해 주시면 성심껏 답변 드리겠습니다.'
  },
];

function NoticeList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 날짜 내림차순 정렬
  const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));

  // 검색 (content 포함 여부)
  const filteredNotices = sortedNotices.filter((notice) =>
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (id) => {
    navigate(`/notice/${id}`);
  };

  // 관리자용 신규 등록 버튼 (예시로 콘솔로깅)
  const handleCreateNotice = () => {
    message.info('공지 등록 기능은 아직 구현되지 않았습니다.');
    // TODO: 실제 구현 시, 등록 페이지로 이동 or Modal 오픈 등 처리
  };

  // 공지 수정 버튼
  const handleEditNotice = (e, id) => {
    e.stopPropagation(); // 상위 onClick(공지 상세보기) 이벤트가 실행되지 않도록
    message.info(`공지 수정 기능(공지 ID: ${id})은 아직 구현되지 않았습니다.`);
    // TODO: 실제 구현 시, 수정 페이지 or Modal 등으로 이동
  };

  // 공지 삭제 버튼
  const handleDeleteNotice = (e, id) => {
    e.stopPropagation(); // 상위 onClick(공지 상세보기) 이벤트가 실행되지 않도록
    message.info(`공지 삭제 기능(공지 ID: ${id})은 아직 구현되지 않았습니다.`);
    // TODO: 실제 구현 시, 서버 요청 후 목록 갱신
  };

  // content 미리보기
  const MAX_LENGTH = 40;

  return (
    <div className={styles.noticeListContainer}>
      <div className={styles.headerArea}>
        <Title level={2} className={styles.noticeTitle}>
          공지사항
        </Title>

        <Search
          placeholder="내용 검색"
          allowClear
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />

        {/* 관리자 전용: 공지 등록 버튼 */}
        {isAdmin && (
          <Button
            type="primary"
            style={{ marginLeft: 16 }}
            onClick={handleCreateNotice}
          >
            공지 등록
          </Button>
        )}
      </div>

      <List
        className={styles.noticeList}
        itemLayout="horizontal"
        dataSource={filteredNotices}
        pagination={{
          pageSize: 10,
          position: 'bottom',
        }}
        renderItem={(item) => {
          let preview = item.content;
          if (preview.length > MAX_LENGTH) {
            preview = preview.slice(0, MAX_LENGTH) + '...';
          }

          return (
            <List.Item
              className={styles.noticeItem}
              onClick={() => handleItemClick(item.id)}
              actions={
                isAdmin
                  ? [
                      <Button
                        type="link"
                        onClick={(e) => handleEditNotice(e, item.id)}
                        key="edit"
                      >
                        수정
                      </Button>,
                      <Button
                        type="link"
                        danger
                        onClick={(e) => handleDeleteNotice(e, item.id)}
                        key="delete"
                      >
                        삭제
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={
                  <SoundOutlined
                    style={{
                      marginRight: 0,
                      marginLeft: 15,
                      fontSize: 24,
                      color: '#543A14',
                    }}
                  />
                }
                title={
                  <span className={styles.noticeItemTitle}>{item.title}</span>
                }
                description={
                  <span className={styles.noticeItemDesc}>{preview}</span>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default NoticeList;
