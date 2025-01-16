import Nav from './component/Nav';
import AdminManager from './component/AdminManager';

import  './AdminMain.css';


export default function AdminMain() {

    return (
        <div>
            {/* 전체 컨테이너 */}
            <div className="admin-main-container">
                <Nav />
                <AdminManager />
            </div>
        </div>
    )
};