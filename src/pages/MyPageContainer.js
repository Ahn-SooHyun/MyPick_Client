import React, { useState } from 'react';
import './MyPageContainer.css';

function MyPageContainer() {
  // 슬라이드로 사용할 이미지 경로를 배열에 정의
  const slides = [
    './img/game/슈퍼마리오.jpeg',
    './img/game/발로란트.png',
    './img/game/메이플스토리.jpg',
    './img/game/리그오브레전드.jpg'
  ];

  // 현재 보여줄 슬라이드 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);

  // 프로필로 사용될 예시 이미지들
  // (원하는 개수만큼 배열에 넣고, 클릭 시 순환하게 만들 수 있음)
  const profileImages = [
    './img/profile1.jpg',
    './img/profile2.jpg'
  ];
  // 현재 프로필 이미지 index
  const [profileIdx, setProfileIdx] = useState(0);

  // 슬라이드 전환
  const showNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const showPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 프로필 변경 버튼 클릭 시
  const handleProfileChange = () => {
    // 간단한 예시: profileIdx를 0 -> 1 -> 0 -> 1...로 번갈아 가도록
    setProfileIdx((prev) => (prev + 1) % profileImages.length);
  };

  // 현재 프로필 이미지 경로
  const profileUrl = profileImages[profileIdx];

  return (
    <div className="mypage-container">
      {/* 오른쪽 슬라이드 페이드 */}
      {slides.map((slideUrl, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ '--slide-bg': `url('${slideUrl}')` }}
        />
      ))}

      {/* 왼쪽 프로필 영역 */}
      <div className="mypage-info">
        <div className="profile-section">
          
          {/* 프로필 이미지 + 변경 버튼을 같은 부모 안에 둠 */}
          <div
            className="profile-img"
            style={{ backgroundImage: `url(${profileUrl})` }}
          >
            {/* 프로필 변경 버튼 */}
            <button
              className="profile-edit-btn"
              onClick={handleProfileChange}
            >
              프로필 변경
            </button>
          </div>

          {/* 아이콘 + 라벨(오른쪽 정렬) + 값(왼쪽 정렬) */}
          <div className="profile-item">
            <span className="profile-text">&#128100; ID</span>
            <span className="profile-id">user1234</span>
          </div>
          <div className="profile-item">
            <span className="profile-text">&#128101; Name</span>
            <span className="profile-id">Mario</span>
          </div>
          <div className="profile-item">
            <span className="profile-icon">&#8505;</span>
            <span className="profile-text">Desc</span>
            <span className="profile-id">게임 좋아하는 유저</span>
          </div>
        </div>
      </div>

      {/* Prev / Next 버튼 */}
      <button className="btn prev" onClick={showPrevSlide}>
        Prev
      </button>
      <button className="btn next" onClick={showNextSlide}>
        Next
      </button>
    </div>
  );
}

export default MyPageContainer;
