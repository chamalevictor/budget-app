import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ProtectedRoutes = () => {
  const { authenticated } = useSelector((state) => state.user);
  const { links } = useSelector((state) => state.transactions);
  return authenticated ? (
    <div>
      {" "}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
