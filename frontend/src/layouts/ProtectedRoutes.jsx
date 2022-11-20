import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { authenticated } = useSelector((state) => state.user);
  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
