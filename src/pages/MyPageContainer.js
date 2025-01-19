import React, { useState, useRef, useEffect } from 'react';
import './MyPageContainer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faUser, faIdCard, faCakeCandles } from "@fortawesome/free-solid-svg-icons";


function MyPageSubMenu({handleMypageSubMenu}) {
    return (
        <div className="mypage-sub-menu"
        >
            <span onClick={() => handleMypageSubMenu('info')}>나의 프로필</span> |
            <span onClick={() => handleMypageSubMenu('password')}>비밀번호 변경</span> |
            <span onClick={() => handleMypageSubMenu('update')}>프로필 변경</span>
        </div>
    )
}


/*** 비밀번호 팝업 창 */
function MyPopup({isPopup, handlePopupClose}) {
  return (
    <div className="mypage-popup pw" style={{display: isPopup ? 'block' : 'none',
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

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const newPasswordCheckRef = useRef(null);

  const [isPopup, setIsPopup] = useState(false);

  //팝업창 생성
  const handlePopup = () => {
    setIsPopup(true);
  }


  const handlePasswordChange = (event) => {
    const { className, value } = event.target;

    //inupt 했을 때, 색 변경
    if (className === 'old-password') {

      // 값이 입력 받았을 때, 색 변경
      if (value.length < 8) {
         console.log('value', value);
        event.target.style.borderBottom = '3px solid red';
      }
      else if (value.length >= 8) {
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
      else if (value.length >= 8) {
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
      else if (value.length >= 8) {
        event.target.style.borderBottom = '3px solid #08ec17';
      }
      else {
        event.target.style.borderBottom = '1px solid #ccc';
      }
      setNewPasswordCheck(value);
    }
  }

  const handlePasswordSubmit = () => {


    //비밀번호 변경 성공
    oldPasswordRef.current.value = '';
    newPasswordRef.current.value = '';
    newPasswordCheckRef.current.value = '';

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
      <input type="password" placeholder="기존 비밀번호"
      className="old-password"
      ref={oldPasswordRef}
      onInput={handlePasswordChange}/>
      
      
      <label className="mypage-password-label second"
      style={{display: oldPassword.length >= 8 ? 'block' : 'none' }}
      >새 비밀번호</label>
      <input type="password"
      placeholder="새 비밀번호"
      className="new-password"
      ref={newPasswordRef}
      style={{display: oldPassword.length >= 8 ? 'block' : 'none' }}
      onInput={handlePasswordChange}/>
      
      
      <label className="mypage-password-label third"
      style={{display: oldPassword.length >= 8 ? 'block' : 'none' }}
      >새 비밀번호 확인</label>
      <input type="password"
      placeholder="새 비밀번호 확인"
      className="new-password-check"
      ref={newPasswordCheckRef}
      style={{display: oldPassword.length >= 8 ? 'block' : 'none' }}
      onInput={handlePasswordChange}/>

      {/* 비밀번호 변경 버튼 */}
      <button
      className="mypage-password-btn"
      onClick={handlePasswordSubmit}
      style={{display: oldPassword.length >= 8 ? 'block' : 'none' }}
      >비밀번호 변경</button>
    </div>
  );
}



function MyPageContainer() {


  /** axio로 DB에서 받아온 데이터는 여기에!*/
  const [userInfo, setUserInfo] = useState({
    id: 'boroColi id',
    name: 'Brocoli Name',
    nickName: 'Brocoli NickName',
    birth: '2001-03-10'
  });



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


  // (3) 프로필 영역 선택 ( nav )
  const [isMyprofile, setIsMyprofile] = useState('info');

  // 5초마다 slide 전환 되도록 설정
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


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



        {/*** 프로필 업데이트 영역 ***/}
        <MyProfileUpdate profileUrl={profileUrl} fileInputRef={fileInputRef} userInfo={userInfo} isMyprofile={isMyprofile}/>


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
            <span className="profile-id">{userInfo.id}</span>
          </div>
          <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faSignature}
            style={{marginRight: '10px',
                color: '#333'
            }}/>Name</span>
            <span className="profile-id">{userInfo.name}</span>
          </div>

          <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faIdCard}
            style={{marginRight: '10px',
                color: '#333'
            }}/>NickName</span>
            <span className="profile-id">{userInfo.nickName}</span>
          </div>

          <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faCakeCandles}
            style={{marginRight: '10px',
                color: '#333'
            }}/>Birth</span>
            <span className="profile-id">{userInfo.birth}</span>
          </div>
        </div>

        
      </div>

    </div>
  );
}

export default MyPageContainer;


{/*** 프로필 업데이트 영역 ***/}
function MyProfileUpdate({profileUrl, userInfo, isMyprofile}) {

  const [isPopup, setIsPopup] = useState(false);

  const handlePopup = () => {
    setIsPopup(false);
  }

  return (
    <div className={`profile-section ${isMyprofile === 'update' ? 'front' : 'left'}`}>
    {/* 프로필 이미지 + 변경 버튼을 같은 부모 안에 둠 */}
    <div
      className="profile-img"
      style={{ backgroundImage: `url(${profileUrl})` }}
    >
    </div>

    {/* 아이콘 + 라벨(오른쪽 정렬) + 값(왼쪽 정렬) */}
    <div className="profile-item">
      <span className="profile-text">
      <FontAwesomeIcon icon={faUser}
      style={{marginRight: '40px',
          color: '#333'
      }}/> ID</span>


        <input type="text" placeholder="ID" className="profile-id-input" value={userInfo.id}/>
    </div>

    <div className="profile-item">
            <span className="profile-text">
            <FontAwesomeIcon icon={faIdCard}
            style={{marginRight: '10px',
                color: '#333'
            }}/>NickName</span>
            <input type="text" placeholder="NickName" className="profile-id-input" value={userInfo.nickName}/>

          </div>

    <button
      className="mypage-profile-update-btn"
      onClick={() => setIsPopup(true)}
      >비밀번호 변경</button>
      <MyUpdatePopup isPopup={isPopup} handlePopupClose={() => setIsPopup(false)}/>
  </div>
  );

  
}


/*** 프로필 변경, 팝업 창 */
function MyUpdatePopup({isPopup, handlePopupClose}) {
  return (
    <div className="mypage-popup update" style={{display: isPopup ? 'block' : 'none',
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
        fontSize: '16px',
        zIndex: '1000'
      }}
      >
        <input type="password" placeholder="비밀번호 확인" className="profile-id-input"/>
        <button className="mypage-profile-update-btn"
        onClick={handlePopupClose}
        >비밀번호 변경</button>
      </div>
    </div>
  )
}