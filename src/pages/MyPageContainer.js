import React, { useState, useRef } from 'react';
import './MyPageContainer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faUser, faComment } from "@fortawesome/free-solid-svg-icons";


function MyPageSubMenu({handleMypageSubMenu}) {
    return (
        <div className="mypage-sub-menu"
        >
            <span onClick={() => handleMypageSubMenu('info')}>나의 프로필</span> |
            <span onClick={() => handleMypageSubMenu('password')}>비밀번호 변경</span> |
            <span onClick={() => handleMypageSubMenu('profile')}>프로필 변경</span>
        </div>
    )
}


/*** 팝업 창 */
function MyPopup({isPopup, handlePopupClose}) {
  return (
    <div className="mypage-popup" style={{display: isPopup ? 'block' : 'none',
      position: 'fixed',
      top: '0px',
      left: '0px',
      transform: 'scale(1.8)',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      zIndex: '1000',
      cursor: 'pointer'
     }}
      onClick={handlePopupClose}
     >

      <div className="mypage-popup-content"
      style={{
        display: isPopup ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1000'
      }}
      >
        <p>비밀번호 변경 완료</p>
      </div>
    </div>
  )
}

/*** 비밀번호 변경 영역 ***/
function MyPasswordContainer({myPageSubMenu}) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  const [isPopup, setIsPopup] = useState(false);

  //팝업창 생성
  const handlePopup = () => {
    setIsPopup(true);
  }

  //팝업창 닫기
  const handlePopupClose = () => {
    setIsPopup(false);
  }

  const handlePasswordChange = (event) => {
    const { className, value } = event.target;

    console.log('check', className);

    //inupt 했을 때, 색 변경
    if (className === 'old-password') {

      // 값이 입력 받았을 때, 색 변경
      if (value.length < 8) {
         console.log('value', value);
        event.target.style.borderBottom = '3px solid red';
      }
      else if (value.length > 8) {
        event.target.style.borderBottom = '3px solid #08ec17';
      }
      else {
        event.target.style.borderBottom = '1px solid #ccc';
      }

      setOldPassword(value);
    }
    else if (className === 'new-password') {
      if (value.length < 8) {
        event.target.style.borderBottom = '3px solid red';
      }
      else if (value.length > 8) {
        event.target.style.borderBottom = '3px solid #08ec17';
      }
      else {
        event.target.style.borderBottom = '1px solid #ccc';
      }
      setNewPassword(value);
    }
    else if (className === 'new-password-check') {
      if (value.length < 8) {
        event.target.style.borderBottom = '3px solid red';
      }
      else if (value.length > 8) {
        event.target.style.borderBottom = '3px solid #08ec17';
      }
      else {
        event.target.style.borderBottom = '1px solid #ccc';
      }
      setNewPasswordCheck(value);
    }
  }

  const handlePasswordSubmit = () => {
    console.log('비밀번호 변경');

    //비밀번호 변경 성공
    setOldPassword('');
    setNewPassword('');
    setNewPasswordCheck('');

    //팝업창 생성
    handlePopup(true);
  }

  return (
    <div className={`mypage-password-container ${myPageSubMenu === 'password' ? 'front' : 'left'}`}>

      {/* 팝업창 */}
      {isPopup && <MyPopup isPopup={isPopup} handlePopupClose={() => setIsPopup(false)}/>}


      <label className="mypage-password-label first">기존 비밀번호</label>
      <input type="password" placeholder="기존 비밀번호" className="old-password" onInput={handlePasswordChange}/>
      
      
      <label className="mypage-password-label second"
      style={{display: oldPassword.length > 8 ? 'block' : 'none' }}
      >새 비밀번호</label>
      <input type="password"
      placeholder="새 비밀번호"
      className="new-password"
      style={{display: oldPassword.length > 8 ? 'block' : 'none' }}
      onInput={handlePasswordChange}/>
      
      
      <label className="mypage-password-label third"
      style={{display: oldPassword.length > 8 ? 'block' : 'none' }}
      >새 비밀번호 확인</label>
      <input type="password"
      placeholder="새 비밀번호 확인"
      className="new-password-check"
      style={{display: oldPassword.length > 8 ? 'block' : 'none' }}
      onInput={handlePasswordChange}/>

      {/* 비밀번호 변경 버튼 */}
      <button
      className="mypage-password-btn"
      onClick={handlePasswordSubmit}
      style={{display: oldPassword.length > 8 ? 'block' : 'none' }}
      >비밀번호 변경</button>
    </div>
  );
}



function MyPageContainer() {
  // 슬라이드로 사용할 이미지 경로 배열
  const slides = [
    './img/game/슈퍼마리오.jpeg',
    './img/game/발로란트.png',
    './img/game/메이플스토리.jpg',
    './img/game/리그오브레전드.jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // (1) 기본 프로필 이미지 경로 (초기값)
  const [profileUrl, setProfileUrl] = useState('./img/profile-default.jpg');

  // (2) 파일 입력창에 접근하기 위한 ref
  const fileInputRef = useRef(null);


  const [isMyprofile, setIsMyprofile] = useState('info');

  // 슬라이드 전환
  const showNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const showPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // “프로필 변경” 버튼을 누르면 => 파일 입력창 열기
  const handleProfileChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨둔 input[type=file]를 클릭
    }
  };

  const handleMypageSubMenu = (menu) => {
    setIsMyprofile(menu);
  }

  // 파일이 실제로 선택됐을 때 처리
  {/** axios 연결 부분 */}
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return; // 사용자가 파일을 선택하지 않았다면 종료

    // FileReader 사용해서 로컬 이미지를 읽어온 뒤 setProfileUrl
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target.result;
      setProfileUrl(imageDataUrl); // 프로필 URL 상태 갱신
    };
    reader.readAsDataURL(file);

    // 만약 매번 파일을 다시 선택하도록 하고 싶다면:
    event.target.value = ''; // input value 초기화
  };

  return (
    <div className="mypage-container">
        
      {/* (1) 오른쪽 슬라이드 페이드 */}
      {slides.map((slideUrl, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ '--slide-bg': `url('${slideUrl}')` }}
        />
      ))}

      {/* (2) 왼쪽 프로필 영역 */}
      <div className="mypage-info">

        {/*** 서브 메뉴 영역 ***/}
        <MyPageSubMenu  handleMypageSubMenu={handleMypageSubMenu}/>


        {/*** 비밀번호 변경 영역 ***/}
        <MyPasswordContainer myPageSubMenu={isMyprofile}/>


        {/*** 프로필 영역 ***/} 
        <div className={`profile-section ${isMyprofile === 'info' ? 'front' : 'left'}`}>
          {/* 프로필 이미지 + 변경 버튼을 같은 부모 안에 둠 */}
          <div
            className="profile-img"
            style={{ backgroundImage: `url(${profileUrl})` }}
          >
            <button className="profile-edit-btn" onClick={handleProfileChange}>
              프로필 변경
            </button>
          </div>

          {/* 실제로 파일을 선택하는 input (화면에는 숨김) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {/* 아이콘 + 라벨(오른쪽 정렬) + 값(왼쪽 정렬) */}
          <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faUser}
            style={{marginRight: '40px',
                color: '#333'
            }}/> ID</span>
            <span className="profile-id">user1234</span>
          </div>
          <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faSignature}
            style={{marginRight: '10px',
                color: '#333'
            }}/>Name</span>
            <span className="profile-id">Mario</span>
          </div>
          <div className="profile-item">
            <span className="profile-id">
            <FontAwesomeIcon icon={faComment}
            style={{marginRight: '20px',
                color: '#333'
            }}/> 게임 좋아하는 유저</span>
          </div>
        </div>
      </div>

      {/* (3) Prev / Next 버튼 */}
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
