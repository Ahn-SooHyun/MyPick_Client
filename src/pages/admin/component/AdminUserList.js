import './AdminUserList.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faIdBadge, faSignature, faUser, faComment, faStop } from "@fortawesome/free-solid-svg-icons";


export default function AdminUserList() {
    return (
        <div className="admin-user-list-container">
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>닉네임</th>
                        <th>ID</th>
                        <th>이름</th>
                        <th>활동 상태</th>
                        <th>마지막 기록</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="user">
                        <td>broccoli</td>
                        <td>broccoli123</td>
                        <td>브로 콜리</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-01</td>
                    </tr>
                    <tr className="admin">
                        <td>Admin</td>
                        <td>admin123</td>
                        <td>관리자</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-01</td>
                    </tr>
                    <tr className="user">
                        <td>carrot</td>
                        <td>carrot456</td>
                        <td>당근이</td>
                        <td><div className="stop-status"></div>정지</td>
                        <td>2025-01-02</td>
                    </tr>
                    <tr className="user">
                        <td>potato</td>
                        <td>potato789</td>
                        <td>감자킹</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-03</td>
                    </tr>
                    <tr className="user">
                        <td>cucumber</td>
                        <td>cucumber321</td>
                        <td>오이짱</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-04</td>
                    </tr>
                    <tr className="user">
                        <td>tomato</td>
                        <td>tomato654</td>
                        <td>토마토맨</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-05</td>
                    </tr>
                    <tr className="user">
                        <td>lettuce</td>
                        <td>lettuce987</td>
                        <td>상추씨</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-06</td>
                    </tr>

                </tbody>
            </table>

            <UserDeatail info={
                {
                    id: 'hayaruby7909',
                    name: '명희승',
                    step: 'user',
                    step: '관리자',
                    status: '' /** 날짜 정보*/
                }
            } />
        </div>
    );
}


function UserDeatail({ info }) {

    const [status, setStatus] = useState('info');

    const [stopStatus, setStopStatus] = useState(info.status === '' || info.status === null ? false : true );


    return (
        <div className="user-detail-container">
            <div className="info">
                <div className="exit"></div>
                {/** 닉네임 위치 */}
                <div className="nickName">
                    {info.id}
                    <div className={`step ${info.step === 'admin' ? 'admin' : 'user'}`}>
                        <div></div>
                        <span>{info.step === 'admin' ? '관리자' : '사용자'}</span>
                    </div>
                </div>
            </div>
            <div className="status-container">
                <div
                className={`info ${status === 'info' ? 'active' : ''}`}
                onClick={() => setStatus('info')}
                ><FontAwesomeIcon icon={faUser} />사용자 정보</div>
                <div
                className={`chat ${status === 'chat' ? 'active' : ''}`}
                onClick={() => setStatus('chat')}
                ><FontAwesomeIcon icon={faComment} />채팅 기록</div>

            </div>
            <div className="card-status">
                <small><FontAwesomeIcon icon={faIdBadge} />ID</small>
                <h2>{info.id}</h2>
                <small><FontAwesomeIcon icon={faSignature} />NAME</small>
                <h2>{info.name}</h2>
            </div>
            <div className="stop">
                <div className="title">
                <FontAwesomeIcon icon={faStop} /><span>상태</span>
                </div>
                <div className="stop-action">
                    <label>

                        {/*** 활동 중  false -/ 정지 true */}
                        {/** info.status가 값이 ''가 아니면 checked 속성 추가 */}
                        {/** null은 체크 안 되게 */}

                        <input type="checkbox" checked={stopStatus} onChange={() => {setStopStatus(!stopStatus); }}

                        />
                            <text>Off</text>
                            <text>On</text>
                            <div class="angle"></div>
                    </label>
                
                    {/*** stopStatus의 값에 따라서 값 표시*/}
                    <span className={stopStatus ? 'span-stop' : 'span-active'}>{stopStatus ? '정지' : '활동'}</span>
                </div>
            </div>
            

    
        </div>
    );
}