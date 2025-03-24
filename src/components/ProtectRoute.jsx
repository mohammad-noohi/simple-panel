import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectRoute;
