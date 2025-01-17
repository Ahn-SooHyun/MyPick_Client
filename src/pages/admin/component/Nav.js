import './Nav.css';
import 캐릭터 from '../../../assets/img/broccoli.png';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFlag, faUser, faMugSaucer, faEnvelope, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}
        >

            <input type="button" value="메뉴 열기"
                onClick={() => setIsOpen(!isOpen)}
            />

            {/** menu 설정 */}
            <div className="menu">
                <div className="item"><FontAwesomeIcon icon={faFlag} /><span>Dashboard</span></div>
                <div className="item"><FontAwesomeIcon icon={faUser} /><span>Users</span></div>
                <div className="item"><FontAwesomeIcon icon={faMugSaucer} /><span>Notice</span></div>
                
            </div>


            {/** 사용자 정보 부분 */}
            <div className="sidebar-user">
                <img src={캐릭터} alt="캐릭터" />
                <div className="sidebar-user-info">
                    {/** 사용자 정보 부분 */}
                    <div className="icon">
                        <div><FontAwesomeIcon icon={faUser} /></div>
                        <div><FontAwesomeIcon icon={faEnvelope} /></div>
                        
                    </div>
                    <div className="info">
                        <user>broccoli Piu</user>
                        <span>mollangpiu@gmail.com</span>
                    </div>
                        
                    
                </div>

                
            </div>
            {/** 로그아웃 버튼 부분 */}
            <div className="sidebar-option">
                <div><FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Log Out</span>
                </div>
            </div>
        </div>
            
    );
}