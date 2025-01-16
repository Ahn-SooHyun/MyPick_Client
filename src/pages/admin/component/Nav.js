import '../AdminMain.css';
import MainLogo from '../../../assets/img/mypick-logo.png';
import { useState, useEffect } from 'react';

export default function Nav() {

    const menuList = ['Home', 'User', 'Notice'];

    const [menuOpen, setMenuOpen] = useState(false);            //nav 메뉴 열기 상태 ( false : 닫힘, true : 열림)
    const [navMenuHover, setNavHoverMenu] = useState('home');

    useEffect(() => {
        console.log(navMenuHover);
    }, [navMenuHover]);

    function testcon() {
        console.log('1234');
    }

    return (
            
            <div className={`admin-nav ${menuOpen? 'menu-open' : ''}`}> {/* 네비게이션 컨테이너 */}

                {/* Navvigation Title 부분 */}
                <div className="admin-nav-title"></div>

                {/* 네비게이션 메뉴 부분 */}
                
                <div className="admin-nav-menu">

                    {menuList.map((menu, index) => (
                        <div className={`admin-nav-menu-item ${navMenuHover == menu? 'menu-item-active' : ''}`}
                            onMouseOver={() => setNavHoverMenu(menu)}
                            onMouseOut={() => setNavHoverMenu('')}
                        >
                            <div className="admin-nav-menu-item-title"></div>
                            <div className="admin-nav-menu-item-content">{menu}</div>
                        </div>
                    ))}

                </div>
            </div>
    );
}