import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const role = sessionStorage.getItem("role");
  return role?.toLowerCase() === "contractor" ? <Outlet></Outlet> : <h1>Permission denied</h1>;
}

export default ProtectedRoutes;
