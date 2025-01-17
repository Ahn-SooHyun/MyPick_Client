import './Nav.css';
import 캐릭터 from '../../../assets/img/broccoli.png';
import { useState } from 'react';

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}
        >

            <input type="button" value="메뉴 열기"
                onClick={() => setIsOpen(!isOpen)}
            />

            <div className="sidebar-user">
                <img src={캐릭터} alt="캐릭터" />
                <div>
                <h3>broccoli Piu</h3>
                <span>mollangpiu@gmail.com</span>
                </div>
            </div>
        </div>
            
    );
}