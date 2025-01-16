import './AdminManager.css';

export default function AdminManager() {
    return (
        <div className="dashboard-default admin-manager-container">
            <div className="dashboard-first">

                <div className="status-box">
                    <div className="status-first">
                        <div className="icon"></div>
                        <div className="content">User</div>
                    </div>
                    <div className="count">1211</div>
                </div>

                <div className="status-box"></div>
                <div className="status-box"></div>
                <div className="status-box"></div>
            </div>
            <div className="dashboard-second">

                <div className="graf-box"></div>
                <div className="graf-box"></div>

            </div>
            <div className="dashboard-third">
                <div className="row-box">
                    <div className="col1"><div className="icon"></div>사용자 이름</div>
                    <div className="col2">상태1</div>
                    <div className="col3">상태2</div>
                    <div className="col4">상태3</div>
                    <div className="col5">상태4</div>
                </div>

                <div className="row-box">
                    <div className="col1"><div className="icon"></div>사용자 이름</div>
                    <div className="col2">상태1</div>
                    <div className="col3">상태2</div>
                    <div className="col4">상태3</div>
                    <div className="col5">상태4</div>
                </div>

                <div className="row-box">
                    <div className="col1"><div className="icon"></div>사용자 이름</div>
                    <div className="col2">상태1</div>
                    <div className="col3">상태2</div>
                    <div className="col4">상태3</div>
                    <div className="col5">상태4</div>
                </div>
            </div>
        </div>
    )
}