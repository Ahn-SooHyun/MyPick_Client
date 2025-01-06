import React, { useState, useRef } from "react";
import './MinWow.css'

function MinWow() {

    const [idCheck, setIdCheck] = useState(false);              //ID 유효성 검사
    const [pwCheck, setPwCheck] = useState(false);            //PW 유효성 검사
    const [pw2Check, setPw2Check] = useState(false);          //PW 확인 유효성 검사
    const [nameCheck, setNameCheck] = useState(false);        //NAME 유효성 검사
    const [nickNameCheck, setNickNameCheck] = useState(false); //NickName 유효성 검사
    const [birthCheck, setBirthCheck] = useState(false);     //생년월일 유효성 검사 ( 사용 안 하는 중)
    const [idUnqiueCheck, setIdUnqiueCheck] = useState(false); //ID 중복 확인

    const [buffer, setBuffer] = useState(false); //버퍼 영역

    const idRef = useRef(null);             //ID 입력 참조
    const pwRef = useRef(null);            //PW 입력 참조
    const pw2Ref = useRef(null);          //PW 확인 입력 참조
    const nameRef = useRef(null);         //NAME 입력 참조
    const nickNameRef = useRef(null);     //NickName 입력 참조
    const birthRef = useRef(null);        //생년월일 입력 참조

        // 이메일 유효성 검사 함수
    const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

        // 비밀번호 유효성 검사 함수
    const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };


        //Id 유효성 검사
        const joinSubmit = () => {
            console.log('회원가입 버튼 클릭');
            console.log(idRef.current.value);

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

        if (pw2Ref.current.value === '') {
            alert('비밀번호 확인을 입력하세요.');
            pw2Ref.current.focus();
            return;
        } else if (pwRef.current.value !== pw2Ref.current.value) {
            alert('비밀번호가 일치하지 않습니다.');
            pw2Ref.current.focus();
            return;
        }

        //NAME 유효성 검사
        if(nameRef.current.value === '') {
            setNameCheck(true);
            thread();
            nameRef.current.focus();
            return;
        }

        //NickName 유효성 검사
        if(nickNameRef.current.value === '') {
            setNickNameCheck(true);
            thread();
            nickNameRef.current.focus();
            return;
        }

        //Birth 유효성 검사
        if(birthRef.current.value === '') {
            setBirthCheck(true);
            thread();
            birthRef.current.focus();
            return;
        }

        setBuffer(true);
        setTimeout(() => {
            setBuffer(false);
        }, 1000);
    }

    //유효성 검사 CSS Warning 효과 삭제하기
    const thread = () => {
        setTimeout(() => {
            setIdCheck(false);
            setPwCheck(false);
            setNameCheck(false);
            setNickNameCheck(false);
            setBirthCheck(false);
        }, 1000);
    }

// ID 중복 확인 함수
const btnIdCheck = async () => {
    const id = idRef.current.value;
    console.log('ID 중복 확인 버튼 클릭');

    // 이메일 형식 검사 추가
    if (!isValidEmail(id)) {
        setIdUnqiueCheck(false);
        alert('유효한 이메일 형식이 아닙니다.');
        idRef.current.focus();
        return;  // 이메일 형식이 아니면 중복 확인을 진행하지 않음
    }

    // 서버에서 ID 중복을 확인하는 비동기 함수 예시
    const isDuplicate = await checkIdDuplicate(id); // 수정: 이미 id 변수로 값이 저장됨

    if (!isDuplicate) {
        setIdUnqiueCheck(false);  // 중복된 ID가 있으면 중복 확인 실패
        alert('이미 사용 중인 아이디입니다.');
    } else {
        setIdUnqiueCheck(true);  // 중복되지 않으면 중복 확인 성공
        alert('사용 가능한 아이디입니다.');
    }
}

// 중복 확인을 위한 가상 API 호출 예시
const checkIdDuplicate = (id) => {
    const existingIds = ['test@example.com', 'hello@example.com']; // 가상 중복 ID 목록

    return new Promise((resolve) => {
        setTimeout(() => {
            // ID가 existingIds 목록에 포함되어 있으면 중복된 것으로 간주
            resolve(!existingIds.includes(id));  // 수정: 포함되지 않으면 사용 가능
        }, 1000);
    });
}




  return (
    <>

      <main>
        <div className="join-container">
          <div className="join_area">
            <div className="img_ham"></div>
            <div className="joinForm-container">
              <div>
                {/* onSubmit 등 이벤트 핸들링을 원하시면 form 태그에 추가하시면 됩니다. */}
                <form>
                  <div className="joinForm">
                    {/* ID 입력 */}
                    <div className={`ham-area`}>
                      <input type="text" name="id" id="id" ref={idRef} autoComplete="off" required />
                      {/* React에서는 htmlFor 속성을 사용해야 합니다. */}
                      <label htmlFor="id" className={`${idCheck ? 'warning': ''}`} >ID 입력</label>
                      <div className="btn-idCheck" onClick={btnIdCheck}>
                        <div className="sunFlowerImg">&nbsp;</div>
                        <span className={idUnqiueCheck ? 'font-color-green' : 'font-color-red'}>중복 확인</span>
                      </div>
                      <div className={idUnqiueCheck ? 'seedImg' : ''}
                      style={{display: idUnqiueCheck ? 'block' : 'none'}}
                      >&nbsp;</div>
                    </div>
                    {/* <div className="btn-idCheck" onClick={( ) => { e.preventDefault(); btnIdCheck(); }}> */}
                    {/* PASSWORD 입력 */}
                    <div className="ham-area">
                      <input
                        type="password"
                        name="pw1"
                        id="pw1"
                        autoComplete="off"
                        ref={pwRef}
                        required
                      />
                      <label htmlFor="pw1" className={`${pwCheck ? 'warning': ''}`}>PASSWORD 입력</label>
                    </div>

                    {/* PASSWORD 입력(재입력 또는 다른 용도?) */}
                    <div className="ham-area">
                      <input
                        type="password"
                        name="pw2"
                        id="p23"
                        autoComplete="off"
                        ref={pw2Ref}
                        required
                      />
                      <label htmlFor="pw2" className={`${pw2Check ? 'warning': ''}`}>PASSWORD 확인</label>
                    </div>

                    {/* NAME 입력 */}
                    <div className="ham-area">
                      <input
                      type="text"
                      name="name"
                      id="name"
                      ref={nameRef}
                      autoComplete="off"
                      required />
                      <label htmlFor="name" className={`${nameCheck ? 'warning': ''}`}>NAME 입력</label>
                    </div>

                    {/* NickName 입력 */}
                    <div className="ham-area nicknameArea">
                      <input
                        type="text"
                        name="NickName"
                        id="NickName"
                        ref={nickNameRef}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="NickName" className={`${nickNameCheck ? 'warning': ''}`}>NickName 입력</label>
                    </div>

                    {/* 생년월일 */}
                    <span className="spanYear">생년 월일</span>
                    <div
                      className="ham-area"
                      style={{ width: "100%", marginTop: "5px" }}
                    >
                      <select className="sel" ref={birthRef}>
                        {Array.from({ length: 2025 - 1960 + 1 }, (_, i) => 1960 + i).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <span>년</span>
                      
                      <select ref={birthRef}>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                      <span>월</span>

                      <select ref={birthRef}>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                      </select>
                      <span>일</span>
                    </div>

                    {/* 하단 버튼 */}
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
        </div>
      </main>

      {/* 버퍼 영역 */}
      <div className={buffer ? 'buffer-outSide' : '' }>
        <div className="buffer-inSide"></div>
      </div>
    </>
  );
}

export default MinWow;
