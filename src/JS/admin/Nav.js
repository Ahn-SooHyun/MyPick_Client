import "../../css/admin/Nav.css";
import 캐릭터 from "../../assets/img/broccoli.png";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faUser,
  faMugSaucer,
  faDoorOpen,
  faEnvelope,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav({ setSelected }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isClick, setIsClick] = useState("dashboard");

  useEffect(() => {
    setSelected(isClick);
  }, [isClick]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <div className="logo">
        <div className="img"></div>
      </div>

      {/** menu 설정 */}
      <div className="menu">
        <div
          className={`item ${isClick === "dashboard" ? "active" : ""}`}
          onClick={() => setIsClick("dashboard")}
        >
          <FontAwesomeIcon icon={faFlag} />
          <span>Dashboard</span>
        </div>
        <div
          className={`item ${isClick === "users" ? "active" : ""}`}
          onClick={() => setIsClick("users")}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Users</span>
        </div>
        <div
          className={`item ${isClick === "notice" ? "active" : ""}`}
          onClick={() => setIsClick("notice")}
        >
          <FontAwesomeIcon icon={faMugSaucer} />
          <span>Notice</span>
        </div>
      </div>

      <div className="nav-close">
        <div className="item" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faDoorOpen} />
          <span>Close</span>
        </div>
      </div>

      {/** 사용자 정보 부분 */}
      <div className="sidebar-user">
        <img src={캐릭터} alt="캐릭터" />
        <div className="sidebar-user-info">
          {/** 사용자 정보 부분 */}
          <div className="icon">
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </div>
          <div className="info">
            <user>broccoli Piu</user>
            <span>mollangpiu@gmail.com</span>
          </div>
        </div>
      </div>
      {/** 로그아웃 버튼 부분 */}
      <div className="sidebar-option">
        <div>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span>LOG OUT</span>
        </div>
      </div>
    </div>
  );
}
