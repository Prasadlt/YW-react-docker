import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";

function Layout() {
  return (
    <div className="outer-layout">
      <div className="sidebar-layout">
        <Sidebar ></Sidebar>
      </div>
      <div className="body-header-layout">
        <Header></Header>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
