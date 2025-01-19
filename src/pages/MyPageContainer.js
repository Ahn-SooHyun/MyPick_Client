import React, { useState } from 'react';
import './MyPageContainer.css'; // CSS는 별도 파일로 분리

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

  // 다음 슬라이드
  const showNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // 이전 슬라이드
  const showPrevSlide = () => {
    // (prev - 1 + 길이) % 길이 => 음수 인덱스 보정
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mypage-container">

      {/* 슬라이드를 동적으로 생성 */}
      {slides.map((slideUrl, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          // CSS 커스텀 프로퍼티를 사용하여 이미지 경로만 교체
          style={{ '--slide-bg': `url('${slideUrl}')` }}
        />
      ))}

      {/* 프로필 정보 (디자인에 맞춰 자유롭게 구성) */}
      <div className="mypage-info">
        1234
        <div className="profile-img"></div>
        <div className="profile-id"></div>
        <div className="profile-name"></div>
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
