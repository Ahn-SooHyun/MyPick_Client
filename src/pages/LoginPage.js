import React, { useState, useRef } from "react";
import "./Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      usernameRef.current.focus();
      return;
    }

    alert(`로그인 성공: ${username}`);
  };

  return (
    <section className="login">
      <div className="login_box">
        <div className="left">
          <div className="top_link">
            <a href="/">
              <img
                src="/assets/img2/ham.png"  // public 폴더 내 경로로 수정
                alt="Home"
              />
              Return home
            </a>
          </div>
          <div className="contact">
            <form onSubmit={handleLogin}>
              <h3>SIGN IN</h3>
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="submit">
                LET'S GO
              </button>
            </form>
          </div>
        </div>
        <div className="right">
          <div className="right-text">
            <h2>LONYX</h2>
            <h5>A UX BASED CREATIVE AGENCY</h5>
          </div>
          <div className="right-inductor">
            <img
              src="/assets/img2/buffer.gif"  // public 폴더 내 경로로 수정
              alt="Design"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
