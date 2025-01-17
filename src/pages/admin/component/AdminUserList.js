import './AdminUserList.css';

export default function AdminUserList() {
    return (
        <div className="admin-user-list-container">
            <h1>User List</h1>
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
                    <tr className="user">
                        <td>broccoli</td>
                        <td>broccoli123</td>
                        <td>브로 콜리</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-01</td>
                    </tr>
                    <tr className="admin">
                        <td>Admin</td>
                        <td>admin123</td>
                        <td>관리자</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-01</td>
                    </tr>
                    <tr className="user">
                        <td>carrot</td>
                        <td>carrot456</td>
                        <td>당근이</td>
                        <td><div className="stop-status"></div>정지</td>
                        <td>2025-01-02</td>
                    </tr>
                    <tr className="user">
                        <td>potato</td>
                        <td>potato789</td>
                        <td>감자킹</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-03</td>
                    </tr>
                    <tr className="user">
                        <td>cucumber</td>
                        <td>cucumber321</td>
                        <td>오이짱</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-04</td>
                    </tr>
                    <tr className="user">
                        <td>tomato</td>
                        <td>tomato654</td>
                        <td>토마토맨</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-05</td>
                    </tr>
                    <tr className="user">
                        <td>lettuce</td>
                        <td>lettuce987</td>
                        <td>상추씨</td>
                        <td><div className="active-status"></div>활동</td>
                        <td>2025-01-06</td>
                    </tr>

                </tbody>
            </table>

            <UserDeatail />
        </div>
    );
}


function UserDeatail() {
    return (
        <div className="user-detail-container">
            <h1>User Detail</h1>
        </div>
    );
}