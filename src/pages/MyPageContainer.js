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

  const [currentSlide, setCurrentSlide] = useState(0);

  const showNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const showPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
          {/* 프로필 이미지 */}
          <div className="profile-img"></div>

          {/* 아이콘 + 라벨(오른쪽 정렬) + 값(왼쪽 정렬) */}
          <div className="profile-item">
            {/* <span className="profile-icon"></span> */}
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
      <button className="btn prev" onClick={showPrevSlide}>Prev</button>
      <button className="btn next" onClick={showNextSlide}>Next</button>
    </div>
  );
}

export default MyPageContainer;
