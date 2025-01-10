import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

function LoginPage() {
  const [id, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirthDate] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("login"); // 현재 화면 단계 ("login", "findId", "findPw", "verifyCode", "resetPassword")

  // 페이지가 로드될 때 자동 로그인 상태 확인
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setStep("home"); // 자동 로그인 후 홈 화면으로 이동
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.20.23:8081/api/login/login", { id, pw });
      console.log(response)
      if (response.data.code == "200") {
        // 로그인 성공 시, 로컬 스토리지에 사용자 이메일 저장
        document.cookie = `CT_AT=${response.data.data.ct_AT}; path=/; secure`;
        const date = new Date();
        date.setDate(date.getDate() + 30); // 30일 후 날짜 설정
        document.cookie = `tocken=${response.data.data.tocken}; path=/; expires=${date.toUTCString()}; secure`;
        alert("로그인 성공!");
        setStep("home"); // 홈 화면으로 이동
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.20.23:8081/api/Found/idFound", { name, birth });
      if (response.data.code == "200") {
        document.cookie = `CT_AT=${response.data.data.ct_AT}; path=/; secure`;
        alert(`아이디: ${response.data.email}`);
        console.log(response)
        setStep("login"); // 로그인 화면으로 이동
      } else {
        alert("해당 정보를 가진 사용자가 없습니다.");
      }
    } catch (error) {
      console.error("아이디 찾기 오류:", error);
      alert("아이디 찾기 중 문제가 발생했습니다.");
    }
  };

  const handleFindPw = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.20.23:8081/api/Found/pwFound", {
        id,
        name,
        birth,
      });
      if (response.data.code === "200") {
        // 성공 시 CT_AT 쿠키 저장
        document.cookie = `CT_AT=${response.data.data.ct_AT}; path=/; secure`;
  
        alert("인증 코드가 생성되었습니다. 인증 단계를 진행하세요.");
        setGeneratedCode(response.data.data.code); // 인증 코드 저장
        setStep("verifyCode"); // 인증 코드 입력 단계로 이동
      } else {
        alert("해당 정보를 가진 사용자가 없습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 오류:", error);
      alert("비밀번호 찾기 중 문제가 발생했습니다.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
  
    try {
      // 서버로 인증 코드 검증 요청
      const response = await axios.post("http://192.168.20.23:8081/api/Found/pwFoundCheck", {
        id,    // 사용자 이메일 또는 ID
        code: verificationCode, // 입력한 인증 코드
      });
  
      // 서버 응답 코드 확인
      if (response.data.code === "200") {
        alert("인증 성공! 비밀번호 변경 페이지로 이동합니다.");
        setStep("resetPassword"); // 새 비밀번호 설정 단계로 이동
      } else {
        alert("인증 실패! 식별 코드가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 코드 확인 오류:", error);
      alert("인증 코드 확인 중 문제가 발생했습니다.");
    }
  };
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // 비밀번호 확인 일치 여부 체크
    if (newPassword !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
  
    try {
      // 비밀번호 변경 요청
      const response = await axios.post("http://192.168.20.23:8081/api/Found/pwChange", {
        id,
        newPassword,
      });
  
      // 응답 코드 확인
      if (response.data.code === "200") {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setStep("login"); // 로그인 화면으로 이동
      } else {
        alert("비밀번호 변경 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경 중 문제가 발생했습니다.");
    }
  };
  
  const handleLogout = () => {
    try {
      // 로컬 스토리지에서 사용자 정보 삭제
      localStorage.removeItem("userEmail"); 
      // 필요에 따라 다른 사용자 관련 데이터를 모두 제거
      localStorage.removeItem("userToken"); // 예: 인증 토큰 삭제
      localStorage.clear(); // 로컬 스토리지 전체 삭제 (필요한 경우만 사용)
  
      // 애플리케이션 상태를 초기화 (예: 전역 상태 관리)
      setStep("login"); // 로그인 화면으로 돌아가기
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <section className="login">
      <div className="login_box">
        <div className="left">
          <div className="contact">
            {step === "login" && (
              <form onSubmit={handleLogin}>
                <h3>SIGN IN</h3>
                <input
                  type="email"
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={pw}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">LET'S GO</button>
                <div>
                  <button type="button" onClick={() => setStep("findId")}>
                    아이디 찾기
                  </button>
                  <button type="button" onClick={() => setStep("findPw")}>
                    비밀번호 찾기
                  </button>
                </div>
              </form>
            )}
            {step === "findId" && (
              <form onSubmit={handleFindId}>
                <h3>아이디 찾기</h3>
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="생년월일"
                  value={birth}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <button type="submit">아이디 찾기</button>
                <button type="button" onClick={() => setStep("login")}>
                  뒤로가기
                </button>
              </form>
            )}
            {step === "findPw" && (
              <form onSubmit={handleFindPw}>
                <h3>비밀번호 찾기</h3>
                <input
                  type="email"
                  placeholder="아이디(이메일)"
                  value={id}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="생년월일"
                  value={birth}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <button type="submit">비밀번호 찾기</button>
                <button type="button" onClick={() => setStep("login")}>
                  뒤로가기
                </button>
              </form>
            )}
            {step === "verifyCode" && (
              <form onSubmit={handleVerifyCode}>
                <h3>식별 코드 확인</h3>
                <input
                  type="text"
                  placeholder="식별 코드"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">확인</button>
              </form>
            )}
            {step === "resetPassword" && (
              <form onSubmit={handleResetPassword}>
                <h3>새 비밀번호 설정</h3>
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">비밀번호 변경</button>
              </form>
            )}
            {step === "home" && (
              <div>
                <h3>환영합니다, {id}님!</h3>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-text">
            <h2>LONYX</h2>
            <h5>A UX BASED CREATIVE AGENCY</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
