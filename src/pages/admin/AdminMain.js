import Nav from './component/Nav';
import AdminManager from './component/AdminManager';
import AdminUserList from './component/AdminUserList';
import AdminNoticeBoard from './component/AdminNotice';


import  './AdminMain.css';
import { useState, useEffect } from 'react';


export default function AdminMain() {

    const [selected, setSelected] = useState('dashboard');

    useEffect(() => {

        console.log('nav: ',selected);
    }, [selected]);

    return (
        <div>
            {/* 전체 컨테이너 */}
            <div className="admin-main-container">
                <Nav setSelected={setSelected} />
                {selected === 'dashboard' && <AdminManager />}
                {selected === 'users' && <AdminUserList />}
                {selected === 'notice' && <AdminNoticeBoard />}
            </div>
        </div>
    )
};