import './Nav.css';
import 캐릭터 from '../../../assets/img/broccoli.png';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faEnvelope, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}
        >

            <input type="button" value="메뉴 열기"
                onClick={() => setIsOpen(!isOpen)}
            />


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
            <div className="sidebar-option">
                <div><FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Log Out</span>
                </div>
            </div>
        </div>
            
    );
}