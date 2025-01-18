/* 임시로 import된 CSS (추후 수정/삭제 가능) */
import './LoginPage.module.css';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import api from '../axiosSetting.js';
import './MinWow.css';

function MinWow() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [newPw, setNewPw] = useState("");
    const [code, setCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);  // 제출 상태 관리
    const [isFindId, setIsFindId] = useState(false);  // ID 찾기 폼 상태
    const [isFindPassword, setIsFindPassword] = useState(false);  // 비밀번호 찾기 폼 상태
    const [isChangePassword, setIsChangePassword] = useState(false);  // 비밀번호 변경 폼 상태

    // 자동 로그인 처리
    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("tocken");

        if (storedId && storedToken) {
            setId(storedId);       
            // 로그인된 상태로 처리, 자동으로 로그인하기 위해 로그인 API 호출
            api.post("/login/autoLogin", { token: storedToken })
                .then(response => {
                    console.log(response.data.code);
                    if (response.data.code === "200") {
                        alert("자동 로그인 성공!");
                    } else {
                        console.log(storedToken);
                        console.log(storedId);
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
        loginForm.classList.toggle("active");
        signupForm.classList.toggle("active");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  // 제출 중임을 표시
        try {
            console.log(id);
            console.log(pw);

            let obj = new Object();
            obj.id = id;
            obj.pw = pw;
            console.log('dataJson, ', obj);

            // {
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //   }
            const response = await api.post(
                "/login/login",
                JSON.stringify(obj)
              );
            if (response.data.code === "200") {
                
                document.cookie = `CT_AT=${response.data.data.ct_at}; path=/;`;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                document.cookie = `token=${response.data.data.token}; path=/; expires=${date.toUTCString()};`;

                // 로그인 성공 시 사용자 정보를 localStorage에 저장
                localStorage.setItem("userId", id);  // 아이디 저장
                localStorage.setItem("tocken", response.data.data.token);  // 토큰 저장
                

                alert("로그인 성공!");

                setId("");
                setPw("");
            } else {
                alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            alert("로그인 중 문제가 발생했습니다.");
        } finally {
            setIsSubmitting(false);  // 제출 완료 후 상태 변경
        }
    };

    const joinSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  // 제출 중임을 표시
        try {
            const response = await api.post('/register/register', {
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
            setIsSubmitting(false);  // 제출 완료 후 상태 변경
        }
    };

    // ID 찾기 처리 함수
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

    // 비밀번호 찾기 처리 함수
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

    // 비밀번호 변경 처리 함수
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
        <div>
            {/* 로그인 폼 */}
            <div id="login-form" className="form-container active">
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="아이디" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={pw} 
                        onChange={(e) => setPw(e.target.value)} 
                        required 
                    />
                    <button type="submit" disabled={isSubmitting}>로그인</button>
                </form>
            </div>

            {/* 회원가입 폼 */}
            <div id="signup-form" className="form-container">
                <form onSubmit={joinSubmit}>
                    <input 
                        type="text" 
                        placeholder="이름" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="닉네임" 
                        value={nickName} 
                        onChange={(e) => setNickName(e.target.value)} 
                        required
                    />
                    <input 
                        type="date" 
                        placeholder="생일" 
                        value={birth} 
                        onChange={(e) => setBirth(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={pw} 
                        onChange={(e) => setPw(e.target.value)} 
                        required 
                    />
                    <button type="submit" disabled={isSubmitting}>회원가입</button>
                </form>
            </div>

            {/* 폼 전환 버튼들 */}
            <div>
                <button onClick={toggleForm}>회원가입 / 로그인 전환</button>
            </div>
        </div>
    );
}

export default MinWow;
