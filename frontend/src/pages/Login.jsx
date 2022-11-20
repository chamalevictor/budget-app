import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { loginUser, setAlertMessage } from "../features/userServices";

import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert, authenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if ([email, password].includes("")) {
    //   setAlert({
    //     msg: "Todos los campos son obligatorios",
    //     error: true,
    //   });
    //   return;
    // }

    // try {
    //   const { data } = await axiosClient.post("/users/login", {
    //     email,
    //     password,
    //   });
    //   setAlert({});
    //   localStorage.setItem("token", data.token);
    // } catch (error) {
    //   setAlert({
    //     msg: error.response.data.msg,
    //     error: true,
    //   });
    // }
    dispatch(loginUser({ email, password }));
    // setAlert({
    //   msg: error.response.data.msg,
    //   error: true,
    // });
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }

    return () => {
      dispatch(
        setAlertMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    };
  }, [authenticated]);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Administra tus finanzas
        <span className="text-slate-700"> personales</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          No tienes cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot_password"
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
