import Nav from "./Nav";
import AdminManager from "./AdminManager";
import AdminUserList from "./AdminUserList";
import "../../css/admin/AdminMain.css";
import { useState, useEffect } from "react";

export default function AdminMain() {
  const [selected, setSelected] = useState("dashboard");

  useEffect(() => {
    console.log("nav: ", selected);
  }, [selected]);

  return (
    <div>
      {/* 전체 컨테이너 */}
      <div className="admin-main-container">
        <Nav setSelected={setSelected} />
        {selected === "dashboard" && <AdminManager />}
        {selected === "users" && <AdminUserList />}
      </div>
    </div>
  );
}
