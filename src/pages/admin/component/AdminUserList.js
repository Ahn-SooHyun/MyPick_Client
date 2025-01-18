import './AdminUserList.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faIdBadge, faSignature, faUser, faComment, faStop, faUserTie, faDeleteLeft, faFloppyDisk, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function AdminUserList() {

    const [userInfo, setUserInfo] = useState(null);

    return (
        <div className="admin-user-list-container">

            <h1>User List</h1>

            <div className="search">

                <select className="search-select">
                    <option value="all">전체</option>
                    <option value="user">사용자</option>
                    <option value="admin">관리자</option>
                </select>

                <select className="search-select">
                    <option value="all">전체</option>
                    <option value="active">활동 중</option>
                    <option value="stop">정지</option>
                </select>

                <select className="search-select">
                    <option value="all">전체</option>
                    <option value="nick">닉네임</option>
                    <option value="id">아이디</option>
                    <option value="name">이름</option>
                </select>

                <input type="text" className="search-input" placeholder="검색" />

                <button className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>검색</span>
                </button>

            </div>
            <div className="list">
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
                        <tr className="user" onClick={() => { setUserInfo({id: 'broccoli', name: '브로 콜리', step: 'user', status: ''})}}>
                            <td className={`${userInfo?.id === 'broccoli' ? 'active' : ''}`} >broccoli</td>
                            <td>broccoli123</td>
                            <td>브로 콜리</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-01</td>
                        </tr>
                        <tr className="admin" onClick={() => { setUserInfo({id: 'admin', name: '관리자', step: 'admin', status: ''})}}>
                            <td className={`${userInfo?.id === 'admin' ? 'active' : ''}`} >Admin</td>
                            <td>admin123</td>
                            <td>관리자</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-01</td>
                        </tr>
                        <tr className="user" onClick={() => { setUserInfo({id: 'carrot', name: '당근이', step: 'user', status: '2025-01-01'})}}>
                            <td className={`${userInfo?.id === 'carrot' ? 'active' : ''}`} >carrot</td>
                            <td>carrot456</td>
                            <td>당근이</td>
                            <td><div className="stop-status"></div>정지</td>
                            <td>2025-01-02</td>
                        </tr>
                        <tr className="user" onClick={() => { setUserInfo({id: 'potato', name: '감자킹', step: 'user', status: ''})}}>
                            <td className={`${userInfo?.id === 'potato' ? 'active' : ''}`} >potato</td>
                            <td>potato789</td>
                            <td>감자킹</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-03</td>
                        </tr>
                        <tr className="user" onClick={() => { setUserInfo({id: 'cucumber', name: '오이짱', step: 'user', status: ''})}}>
                            <td className={`${userInfo?.id === 'cucumber' ? 'active' : ''}`} >cucumber</td>
                            <td>cucumber321</td>
                            <td>오이짱</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-04</td>
                        </tr>
                        <tr className="user" onClick={() => { setUserInfo({id: 'tomato', name: '토마토맨', step: 'user', status: ''})}}>
                            <td className={`${userInfo?.id === 'tomato' ? 'active' : ''}`} >tomato</td>
                            <td>tomato654</td>
                            <td>토마토맨</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-05</td>
                        </tr>
                        <tr className="user" onClick={() => { setUserInfo({id: 'lettuce', name: '상추씨', step: 'user', status: ''})}}>
                            <td className={`${userInfo?.id === 'lettuce' ? 'active' : ''}`} >lettuce</td>
                            <td>lettuce987</td>
                            <td>상추씨</td>
                            <td><div className="active-status"></div>활동</td>
                            <td>2025-01-06</td>
                        </tr>

                    </tbody>
                </table>

                {userInfo && <UserDeatail info={userInfo}
                    handleClose={() => setUserInfo('')}
                />}
            </div>

            {/** 페이지네이션 */}
            <div className="pagination">
                <button className="pagination-button">이전</button>
                <button className="pagination-button">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <button className="pagination-button">4</button>
                <button className="pagination-button">5</button>
                <button className="pagination-button">다음</button>
            </div>
        </div>
    );
}


function UserDeatail({ info, handleClose }) {

    const [status, setStatus] = useState('info'); // 사용자 정보 / 채팅기록 전환

    const [stopStatus, setStopStatus] = useState(info.status === '' || info.status === null ? false : true );
    const [adminStatus, setAdminStatus] = useState(info.step === 'admin' ? true : false);

    const [chatOpen, setChatOpen] = useState(false);


    const [chatList, setChatList] = useState([
        {
            id: 1,
            title: '채팅 방 1',
            lastChat: '2025-01-18',
        },
        {
            id: 2,
            title: '채팅 방 2',
            lastChat: '2025-01-17',
        },
        {
            id: 3,
            title: '채팅 방 3',
            lastChat: '2025-01-13',
        },
        {
            id: 4,
            title: '채팅 방 4',
            lastChat: '2025-01-04',
        },
        {
            id: 5,
            title: '채팅 방 5',
            lastChat: '2025-01-05',
        },
        {
            id: 6,
            title: '채팅 방 6',
            lastChat: '2025-01-06',
        },
    ]);
    
    

    return (
        <div className="user-detail-container">
            <div className="info">
                <div className="exit"
                    onClick={handleClose}
                >
                <FontAwesomeIcon icon={faXmark} />닫기
                </div>
                {/** 닉네임 위치 */}
                <div className="nickName">
                    {info.id}
                    <div className={`step ${adminStatus ? 'admin' : 'user'}`}>
                        <div></div>
                        <span>{adminStatus ? '관리자' : '사용자'}</span>
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

            <div className={`${status === 'info' ? 'status-info-on' : 'status-info-off'}`}>
                <div className="option stop">
                    <div className="title">
                    <FontAwesomeIcon icon={faStop} /><span>상태</span>
                    </div>
                    <div className="option-action">
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
                        <span className={stopStatus ? 'status-active' : 'status-stop'}>{stopStatus ? '정지' : '활동'}</span>
                    </div>
                </div>
                

                <div className="option admin">
                    <div className="title">
                    <FontAwesomeIcon icon={faUserTie} /><span>관리자</span>
                    </div>
                    <div className="option-action">
                        <label>

                            {/*** 활동 중  false -/ 정지 true */}
                            {/** info.status가 값이 ''가 아니면 checked 속성 추가 */}
                            {/** null은 체크 안 되게 */}

                            <input type="checkbox" checked={!adminStatus} onChange={() => {setAdminStatus(!adminStatus); }}

                            />
                                <text>user</text>
                                <text>admin</text>
                                <div class="angle"></div>
                        </label>
                    
                        {/*** stopStatus의 값에 따라서 값 표시*/}
                        <span className={`result ${adminStatus ?  'status-admin' : 'status-user'}`}>{adminStatus ? '관리자' : '사용자'}</span>
                    </div>
                </div>
            </div>

            <div className={`${status === 'chat' ? 'status-chat-on' : 'status-chat-off'}`} >
                <div className="chat-container">

                    {chatList.map((item, index) => (
                        <div className="chat-item" key={index} data-index={item.id}
                        onClick={() => {setChatOpen(true);}}>
                            <div>

                                <span><FontAwesomeIcon icon={faComment} />마지막 채팅기록: </span><span className={(() => {
                                    const today = new Date();
                                    const lastChat = new Date(item.lastChat);
                                    const diffDays = Math.floor((today - lastChat) / (1000 * 60 * 60 * 24));
                                    
                                    switch(diffDays) {
                                        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                                            return 'day-'+diffDays;
                                        default:
                                            return 'old';
                                    }
                                })()}>

                                {(() => {
                                    const today = new Date();
                                    const lastChat = new Date(item.lastChat);
                                    const diffDays = Math.floor((today - lastChat) / (1000 * 60 * 60 * 24));
                                    
                                    switch(diffDays) {
                                        case 0:
                                            return 'now';
                                        case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                                            return 'day-'+diffDays;
                                        default:
                                            return 'old';
                                    }
                                })()}
                            </span>
                        </div>
                        <div>
                            <span>{item.title}</span>
                        </div>
                    </div>
                    ))}
                </div>

            </div>

            <div className="end">
                <button className="delete" ><FontAwesomeIcon icon={faDeleteLeft}
                style={{
                    marginRight: '20px'
                }}/>삭제</button>
                <button className="save"><FontAwesomeIcon icon={faFloppyDisk}
                style={{
                    marginRight: '20px'
                }}/>저장</button>
            </div>

            
            {chatOpen && <ChatContainer eventClose={() => setChatOpen(false)}/>}
    
        </div>
    );
}

function ChatContainer({info, eventClose}) {

    /***info 안에는 chatList idx, chatList가 열은 userId가 들어 있음.  */
    const [target, setTarget] = useState({'userId': 'a1', 'chatIdx': 1});

    //** 채팅 내용 리스트 */
    const chatContentList = [
        {
            userId: 'a1',
            content: '안녕하세요! 오늘 날씨가 정말 좋네요. 이런 날씨에는 산책을 가거나 야외 활동을 하기에 딱 좋은 것 같아요. 여러분은 오늘 어떤 계획이 있으신가요?',
        },
        {
            userId: 'a2',
            content: '맞아요, 저도 오늘 아침에 일어나서 창문을 열어보니 햇살이 너무 따뜻하고 기분이 좋더라고요. 그래서 아침 운동을 좀 했어요. 그리고 나서 커피 한 잔 마시면서 책을 읽고 있었어요.',
        },
        {
            userId: 'a2',
            content: '혹시 주말에 같이 등산 가실 분 계신가요? 요즘 날씨가 좋아서 등산하기에 딱 좋은 것 같아요. 산 정상에서 보는 경치가 정말 멋질 것 같아요.',
        },
        {
            userId: 'a1',
            content: '등산 좋죠! 저도 등산을 좋아해서 자주 가는데, 이번 주말에 시간이 되면 같이 가고 싶어요. 어느 산을 가실 계획인가요?',
        },
        {
            userId: 'a1',
            content: '그리고 등산 후에는 근처 맛집에서 맛있는 음식도 먹으면 좋을 것 같아요. 등산 후에 먹는 음식은 정말 꿀맛이잖아요!',
        },
        {
            userId: 'a2',
            content: '저는 북한산을 생각하고 있었어요. 북한산은 경치도 좋고, 등산로도 잘 되어 있어서 초보자도 쉽게 갈 수 있거든요. 그리고 근처에 맛집도 많아서 등산 후에 맛있는 음식도 먹을 수 있을 것 같아요.',
        },
        {
            userId: 'a1',
            content: '좋아요! 그럼 이번 주말에 북한산으로 가는 걸로 할까요? 시간은 어떻게 되세요? 아침 일찍 출발하는 게 좋을 것 같아요.',
        },
        {
            userId: 'a2',
            content: '네, 아침 일찍 출발하는 게 좋을 것 같아요. 그럼 토요일 아침 7시에 출발하는 걸로 할까요? 그 시간에 출발하면 사람도 많지 않고, 여유롭게 등산할 수 있을 것 같아요.',
        },
        {
            userId: 'a1',
            content: '좋습니다! 그럼 토요일 아침 7시에 만나요. 준비물은 각자 챙기고, 물과 간단한 간식 정도만 준비하면 될 것 같아요. 그럼 주말에 뵙겠습니다!',
        },
        {
            userId: 'a2',
            content: '네, 준비물은 각자 챙기고, 물과 간단한 간식 정도만 준비하면 될 것 같아요. 그럼 주말에 뵙겠습니다!',
        },
    ];

    return (
        <div className="chat-content-container">
            <div className="close-btn" 
                onClick={() => eventClose(false)} 
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '24px',
                    zIndex: 10
                }}>
                ×
            </div>
            {chatContentList.map((item, index) => (
                
                <div className={`chat-content-item ${item.userId === target.userId ? 'eq' : 'ne'}`} key={index}>
                    <div className="chat-content-item-user">{item.userIdx}</div>
                    <div className="chat-content-item-content">{item.content}</div>
                    <div className="chat-content-item-time" style={{
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '5px',
                        marginLeft: '10px',
                        margin: '0 20px'
                    }}>
                    {new Date().toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                    </div>
                </div>
            ))}
        </div>
    );
}
