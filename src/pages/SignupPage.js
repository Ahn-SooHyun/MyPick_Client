import React, { useState, useRef } from "react";
import axios from 'axios';
import './MinWow.css';

function MinWow() {
    const [idCheck, setIdCheck] = useState(false);
    const [pwCheck, setPwCheck] = useState(false);
    const [pw2Check, setPw2Check] = useState(false);
    const [nameCheck, setNameCheck] = useState(false);
    const [nickNameCheck, setNickNameCheck] = useState(false);
    const [birthCheck, setBirthCheck] = useState(false);
    const [idUnqiueCheck, setIdUnqiueCheck] = useState(false);
    const [buffer, setBuffer] = useState(false);

    const idRef = useRef(null);
    const pwRef = useRef(null);
    const pw2Ref = useRef(null);
    const nameRef = useRef(null);
    const nickNameRef = useRef(null);
    const birthRef = useRef(null); // 생년월일 날짜 입력 필드 추가

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const joinSubmit = async () => {
        console.log('회원가입 버튼 클릭');

        // ID 유효성 검사
        if (idRef.current.value === '') {
            setIdCheck(true);
            alert('아이디를 입력하세요.');
            idRef.current.focus();
            return;
        } else if (!isValidEmail(idRef.current.value)) {
            setIdCheck(true);
            alert('유효한 이메일 형식이 아닙니다.');
            idRef.current.focus();
            return;
        }

        // PW 유효성 검사
        if (pwRef.current.value === '') {
            setPwCheck(true);
            alert('비밀번호를 입력하세요.');
            pwRef.current.focus();
            return;
        } else if (!isValidPassword(pwRef.current.value)) {
            setPwCheck(true);
            alert('비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
            pwRef.current.focus();
            return;
        }

        // 비밀번호 확인
        if (pw2Ref.current.value === '') {
            alert('비밀번호 확인을 입력하세요.');
            pw2Ref.current.focus();
            return;
        } else if (pwRef.current.value !== pw2Ref.current.value) {
            alert('비밀번호가 일치하지 않습니다.');
            pw2Ref.current.focus();
            return;
        }

        // 이름 유효성 검사
        if (nameRef.current.value === '') {
            setNameCheck(true);
            nameRef.current.focus();
            return;
        }

        // 닉네임 유효성 검사
        if (nickNameRef.current.value === '') {
            setNickNameCheck(true);
            nickNameRef.current.focus();
            return;
        }

        // 생년월일 유효성 검사
        if (birthRef.current.value === '') {
            setBirthCheck(true);
            alert('생년월일을 입력하세요.');
            birthRef.current.focus();
            return;
        }

        // 서버로 데이터 전송 (POST 요청)
        setBuffer(true);
        setTimeout(() => {
            setBuffer(false);
        }, 1000);

        try {
            const response = await axios.post('/api/register', {
                id: idRef.current.value,
                password: pwRef.current.value,
                name: nameRef.current.value,
                nickName: nickNameRef.current.value,
                birth: birthRef.current.value, // 날짜는 YYYY-MM-DD 형식으로 전달됩니다.
            });

            if (response.data.success) {
                alert('회원가입 성공!');
                // 성공 후 동작 추가 (예: 리디렉션)
            } else {
                alert('회원가입 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <main>
                <div className="join-container">
                    <div className="join_area">
                        <div className="img_ham"></div>
                        <div className="joinForm-container">
                            <form>
                                <div className="joinForm">
                                    <div className="ham-area">
                                        <input type="text" name="id" id="id" ref={idRef} autoComplete="off" required />
                                        <label htmlFor="id" className={`${idCheck ? 'warning' : ''}`}>ID 입력</label>
                                    </div>

                                    <div className="ham-area">
                                        <input type="password" name="pw1" id="pw1" autoComplete="off" ref={pwRef} required />
                                        <label htmlFor="pw1" className={`${pwCheck ? 'warning' : ''}`}>PASSWORD 입력</label>
                                    </div>

                                    <div className="ham-area">
                                        <input type="password" name="pw2" id="p23" autoComplete="off" ref={pw2Ref} required />
                                        <label htmlFor="pw2" className={`${pw2Check ? 'warning' : ''}`}>PASSWORD 확인</label>
                                    </div>

                                    <div className="ham-area">
                                        <input type="text" name="name" id="name" ref={nameRef} autoComplete="off" required />
                                        <label htmlFor="name" className={`${nameCheck ? 'warning' : ''}`}>NAME 입력</label>
                                    </div>

                                    <div className="ham-area nicknameArea">
                                        <input type="text" name="NickName" id="NickName" ref={nickNameRef} autoComplete="off" required />
                                        <label htmlFor="NickName" className={`${nickNameCheck ? 'warning' : ''}`}>NickName 입력</label>
                                    </div>

                                    <span className="spanYear">생년 월일</span>
                                    <div className="ham-area" style={{ width: "100%", marginTop: "5px" }}>
                                        <input 
                                            type="date" 
                                            ref={birthRef} 
                                            className="sel" 
                                            required 
                                        />
                                    </div>

                                    <div className="btnArea" onClick={joinSubmit}>
                                        <div>
                                            <div className="submitBtn">&nbsp;</div>
                                            <span>회원 가입</span>
                                        </div>
                                        <div>
                                            <div className="returnBtn">&nbsp;</div>
                                            <span>이전 으로</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <div className={buffer ? 'buffer-outSide' : ''}>
                <div className="buffer-inSide"></div>
            </div>
        </>
    );
}

export default MinWow;
