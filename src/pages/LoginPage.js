import React from "react";
import "./LoginPage.css";

function App() {
  return (
    <div className="login-body">
      <div className="login full-height">
        <div className="login card-3d-wrap">
          <div className="login card-3d-wrapper">
            {/* 로그인 카드 */}
            <div className="login card-front">
              <div className="login center-wrap">
                <h4>로그인</h4>
                <form>
                  <div className="login form-group">
                    <span className="login input-icon">👤</span>
                    <input type="text" className="login form-style" placeholder="아이디" />
                  </div>
                  <div className="login form-group">
                    <span className="login input-icon">🔒</span>
                    <input type="password" className="login form-style" placeholder="비밀번호" />
                  </div>
                  <button type="submit" className="login btn">로그인</button>
                </form>
              </div>
            </div>
            {/* 회원가입 카드 */}
            <div className="login card-back">
              <div className="login center-wrap">
                <h4>회원가입</h4>
                <form>
                  <div className="login form-group">
                    <span className="login input-icon">👤</span>
                    <input type="text" className="login form-style" placeholder="아이디" />
                  </div>
                  <div className="login form-group">
                    <span className="login input-icon">📧</span>
                    <input type="email" className="login form-style" placeholder="이메일" />
                  </div>
                  <div className="login form-group">
                    <span className="login input-icon">🔒</span>
                    <input type="password" className="login form-style" placeholder="비밀번호" />
                  </div>
                  <button type="submit" className="login btn">가입하기</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
