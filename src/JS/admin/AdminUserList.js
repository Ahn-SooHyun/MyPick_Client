import "../../css/admin/AdminUserList.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faSignature,
  faUser,
  faComment,
  faStop,
  faUserTie,
  faDeleteLeft,
  faFloppyDisk,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "broccoli",
                  name: "브로 콜리",
                  step: "user",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "broccoli" ? "active" : ""}`}>
                broccoli
              </td>
              <td>broccoli123</td>
              <td>브로 콜리</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-01</td>
            </tr>
            <tr
              className="admin"
              onClick={() => {
                setUserInfo({
                  id: "admin",
                  name: "관리자",
                  step: "admin",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "admin" ? "active" : ""}`}>
                Admin
              </td>
              <td>admin123</td>
              <td>관리자</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-01</td>
            </tr>
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "carrot",
                  name: "당근이",
                  step: "user",
                  status: "2025-01-01",
                });
              }}
            >
              <td className={`${userInfo?.id === "carrot" ? "active" : ""}`}>
                carrot
              </td>
              <td>carrot456</td>
              <td>당근이</td>
              <td>
                <div className="stop-status"></div>정지
              </td>
              <td>2025-01-02</td>
            </tr>
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "potato",
                  name: "감자킹",
                  step: "user",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "potato" ? "active" : ""}`}>
                potato
              </td>
              <td>potato789</td>
              <td>감자킹</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-03</td>
            </tr>
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "cucumber",
                  name: "오이짱",
                  step: "user",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "cucumber" ? "active" : ""}`}>
                cucumber
              </td>
              <td>cucumber321</td>
              <td>오이짱</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-04</td>
            </tr>
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "tomato",
                  name: "토마토맨",
                  step: "user",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "tomato" ? "active" : ""}`}>
                tomato
              </td>
              <td>tomato654</td>
              <td>토마토맨</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-05</td>
            </tr>
            <tr
              className="user"
              onClick={() => {
                setUserInfo({
                  id: "lettuce",
                  name: "상추씨",
                  step: "user",
                  status: "",
                });
              }}
            >
              <td className={`${userInfo?.id === "lettuce" ? "active" : ""}`}>
                lettuce
              </td>
              <td>lettuce987</td>
              <td>상추씨</td>
              <td>
                <div className="active-status"></div>활동
              </td>
              <td>2025-01-06</td>
            </tr>
          </tbody>
        </table>

        {userInfo && (
          <UserDeatail info={userInfo} handleClose={() => setUserInfo("")} />
        )}
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
  const [status, setStatus] = useState("info");

  const [stopStatus, setStopStatus] = useState(
    info.status === "" || info.status === null ? false : true
  );
  const [adminStatus, setAdminStatus] = useState(
    info.step === "admin" ? true : false
  );

  return (
    <div className="user-detail-container">
      <div className="info">
        <div className="exit" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
          닫기
        </div>
        {/** 닉네임 위치 */}
        <div className="nickName">
          {info.id}
          <div className={`step ${adminStatus ? "admin" : "user"}`}>
            <div></div>
            <span>{adminStatus ? "관리자" : "사용자"}</span>
          </div>
        </div>
      </div>
      <div className="status-container">
        <div
          className={`info ${status === "info" ? "active" : ""}`}
          onClick={() => setStatus("info")}
        >
          <FontAwesomeIcon icon={faUser} />
          사용자 정보
        </div>
        <div
          className={`chat ${status === "chat" ? "active" : ""}`}
          onClick={() => setStatus("chat")}
        >
          <FontAwesomeIcon icon={faComment} />
          채팅 기록
        </div>
      </div>
      <div className="card-status">
        <small>
          <FontAwesomeIcon icon={faIdBadge} />
          ID
        </small>
        <h2>{info.id}</h2>
        <small>
          <FontAwesomeIcon icon={faSignature} />
          NAME
        </small>
        <h2>{info.name}</h2>
      </div>
      <div className="option stop">
        <div className="title">
          <FontAwesomeIcon icon={faStop} />
          <span>상태</span>
        </div>
        <div className="option-action">
          <label>
            {/*** 활동 중  false -/ 정지 true */}
            {/** info.status가 값이 ''가 아니면 checked 속성 추가 */}
            {/** null은 체크 안 되게 */}

            <input
              type="checkbox"
              checked={stopStatus}
              onChange={() => {
                setStopStatus(!stopStatus);
              }}
            />
            <text>Off</text>
            <text>On</text>
            <div class="angle"></div>
          </label>

          {/*** stopStatus의 값에 따라서 값 표시*/}
          <span className={stopStatus ? "status-active" : "status-stop"}>
            {stopStatus ? "정지" : "활동"}
          </span>
        </div>
      </div>

      <div className="option admin">
        <div className="title">
          <FontAwesomeIcon icon={faUserTie} />
          <span>관리자</span>
        </div>
        <div className="option-action">
          <label>
            {/*** 활동 중  false -/ 정지 true */}
            {/** info.status가 값이 ''가 아니면 checked 속성 추가 */}
            {/** null은 체크 안 되게 */}

            <input
              type="checkbox"
              checked={!adminStatus}
              onChange={() => {
                setAdminStatus(!adminStatus);
              }}
            />
            <text>user</text>
            <text>admin</text>
            <div class="angle"></div>
          </label>

          {/*** stopStatus의 값에 따라서 값 표시*/}
          <span
            className={`result ${adminStatus ? "status-admin" : "status-user"}`}
          >
            {adminStatus ? "관리자" : "사용자"}
          </span>
        </div>
      </div>

      <div className="end">
        <button className="delete">
          <FontAwesomeIcon
            icon={faDeleteLeft}
            style={{
              marginRight: "20px",
            }}
          />
          삭제
        </button>
        <button className="save">
          <FontAwesomeIcon
            icon={faFloppyDisk}
            style={{
              marginRight: "20px",
            }}
          />
          저장
        </button>
      </div>
    </div>
  );
}
