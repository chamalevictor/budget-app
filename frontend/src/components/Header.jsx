import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { userActions } from "../features/userSlice";

const Header = ({ linkTo, linkName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const today = new Date();
  const now = today.toLocaleDateString("es-GT");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logOutUser());
    navigate("/");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <div>
          <Link to="/dashboard">
            <h2 className="text-4xl text-sky-600 font-black text-center">
              Budget Manager
            </h2>
          </Link>
          <p className="mt-1 font-bold">Guatemala {now}</p>
        </div>
        <h3 className="p-2 font-bold  uppercase">Bienvenido {users.name}</h3>
        <div className="flex items-center gap-4">
          <Link to={linkTo} className="font-bold uppercase">
            {" "}
            {linkName}{" "}
          </Link>

          <Button title={"Cerrar Sesión"} onClickAction={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
