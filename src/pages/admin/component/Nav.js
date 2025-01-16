import '../AdminMain.css';
import MainLogo from '../../../assets/img/mypick-logo.png';
import Hamsic from '../../../assets/img2/joinImg.jpg';
import { useState, useEffect } from 'react';

export default function Nav() {

    const menuList = ['Home', 'User', 'Notice'];

    const [menuOpen, setMenuOpen] = useState(false);            //nav 메뉴 열기 상태 ( false : 닫힘, true : 열림)
    const [navMenuHover, setNavHoverMenu] = useState('home');   //mouse 올리기
    const [navMenuClick, setNavMenuClick] = useState('home');   //Click

    useEffect(() => {
        console.log(navMenuHover);
    }, [navMenuHover]);

    function testcon() {
        console.log('1234');
    }

    return (
            
            <div className={`admin-nav ${menuOpen? 'menu-open' : ''}`}
            onMouseOver={() => setMenuOpen(true)}
            onMouseOut={() => setMenuOpen(false)}> {/* 네비게이션 컨테이너 */}

                {/* Navvigation Title 부분 */}
                <div className="admin-nav-title"></div>

                {/* 네비게이션 메뉴 부분 */}
                
                <div className="admin-nav-menu">

                    {menuList.map((menu, index) => (
                        <div className={`admin-nav-menu-item
                            ${navMenuHover == menu? 'menu-item-active' : ''}
                            ${navMenuClick == menu? 'menu-item-click' : ''}
                            }`}
                            onMouseOver={() => setNavHoverMenu(menu)}
                            onMouseOut={() => setNavHoverMenu('')}
                            onClick={() => setNavMenuClick(menu)}>
                            <div className="admin-nav-menu-item-title"></div>
                            <div className="admin-nav-menu-item-content">{menu}</div>
                        </div>
                    ))}

                </div>

                <div className="admin-bottom-menu">
                    <div className="admin-profile">
                        {/** 프로파일 영역 */}
                        <div className="admin-profile-img">
                            <img src={Hamsic} alt="admin-profile-img" />
                        </div>
                        <div className="admin-profile-name">
                            <span>MollangPiu</span>
                        </div>
                    </div>

                    {/** 설정 버튼 */}
                    <div className="admin-btn admin-setting">
                        <div className="icon"></div>
                        <div className="text">Setting</div>
                    </div>
                    {/* 로그아웃 버튼 */}
                    <div className="admin-btn  admin-logout">
                        <div className="icon"></div>
                        <div className="text">Logout</div>
                    </div>
                </div>
            </div>
    );
}