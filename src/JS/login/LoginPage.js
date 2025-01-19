import React, { useState, useEffect } from "react";
import axios from 'axios';
import api from '../../util/api/axiosSetting';

// ★ antd 전역 스타일 가져오기 (필수)
// import 'antd/dist/antd.css';

// ★ 모듈 CSS
import styles from '../../css/login/LoginPage.module.css';
import { useNavigate } from "react-router-dom";

function MinWow() {

  const navigate = useNavigate();


    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [newPw, setNewPw] = useState("");
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 자동 로그인
    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token"); 

        if (storedId && storedToken) {
            setId(storedId);
            api.post("/login/autoLogin", { token: storedToken })
                .then(response => {
                    if (response.data.code === "200") {
                        alert("자동 로그인 성공!");
                    } else {
                        console.log("storedToken:", storedToken);
                        console.log("storedId:", storedId);
                        alert("자동 로그인 실패.");
                    }
                })
                .catch(error => {
                    console.error("자동 로그인 오류:", error);
                    alert("자동 로그인 중 오류가 발생했습니다.");
                });
        }
    }, []);

    const toggleForm = () => {
        const loginForm = document.getElementById("login-form");
        const signupForm = document.getElementById("signup-form");
        loginForm.classList.toggle(styles.active);
        signupForm.classList.toggle(styles.active);
    };

    // 로그인
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const dataJson = { id, pw };
            const response = await api.post("/login/login", JSON.stringify(dataJson));

            if (response.data.code === "200") {
                document.cookie = `CT_AT=${response.data.data.ct_at}; path=/;`;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                document.cookie = `token=${response.data.data.token}; path=/; expires=${date.toUTCString()};`;

                localStorage.setItem("userId", id);
                localStorage.setItem("token", response.data.data.token);

                alert("로그인 성공!");
                setId("");
                setPw("");
                
                navigate('/chat');
            } else {
                alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            alert("로그인 중 문제가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 회원가입
    const joinSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post("/register/register", {
                id: id,
                pw: pw,
                name: name,
                nickName: nickName,
                birth: birth,
            });
            if (response.data.code === "200") {
                alert("회원가입 성공!");
                setId("");
                setPw("");
                setName("");
                setNickName("");
                setBirth("");
            } else {
                alert('회원가입 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ID 찾기
    const handleFindId = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post('/login/findId', {
                name: name,
                birth: birth,
            });
            if (response.data.code === "200") {
                alert(`찾은 ID: ${response.data.data.id}`);
            } else {
                alert("해당 정보로는 ID를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("ID 찾기 오류:", error);
            alert("ID 찾기 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 비밀번호 찾기
    const handleFindPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post('/login/findPassword', {
                id: id,
                name: name,
                birth: birth,
            });
            if (response.data.code === "200") {
                alert("비밀번호를 재설정했습니다.");
            } else {
                alert("해당 정보로는 비밀번호를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("비밀번호 찾기 오류:", error);
            alert("비밀번호 찾기 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 비밀번호 변경
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await api.post('/login/changePassword', {
                id: id,
                code: code,
                newPw: newPw,
            });
            if (response.data.code === "200") {
                alert("비밀번호가 성공적으로 변경되었습니다.");
            } else {
                alert("비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("비밀번호 변경 오류:", error);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            {/* 상단 빨간 헤더 영역 */}
            <div className={styles.header}>
                <span className={styles.headerTitle}>Login/Register Center</span>
            </div>

            {/* 메인 컨텐츠: 로그인/회원가입 폼 */}
            <div className={styles.contentWrapper}>
                {/* 로그인 폼 */}
                <div id="login-form" className={`${styles.formContainer} ${styles.active}`}>
                    <form onSubmit={handleLogin}>
                        <input
                            className="ant-input"
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                        <input
                            className="ant-input"
                            type="password"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            required
                        />
                        <button className="ant-btn ant-btn-primary" type="submit" disabled={isSubmitting}>
                            로그인
                        </button>
                    </form>
                </div>

                {/* 회원가입 폼 */}
                <div id="signup-form" className={styles.formContainer}>
                    <form onSubmit={joinSubmit}>
                        {/* 회원가입에 필요한 추가 input */}
                        <input
                            className="ant-input"
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                        <input
                            className="ant-input"
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            className="ant-input"
                            type="text"
                            placeholder="닉네임"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            required
                        />
                        <input
                            className="ant-input"
                            type="date"
                            placeholder="생일"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                            required
                        />
                        <input
                            className="ant-input"
                            type="password"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            required
                        />
                        <button className="ant-btn ant-btn-primary" type="submit" disabled={isSubmitting}>
                            회원가입
                        </button>
                    </form>
                </div>

                {/* 폼 전환 버튼 */}
                <div className={styles.toggleBtnWrapper}>
                    <button className="ant-btn" onClick={toggleForm}>
                        회원가입 / 로그인 전환
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MinWow;
