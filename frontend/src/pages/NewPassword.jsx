import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const NewPassword = () => {
  const params = useParams();
  const { token } = params;

  const [password, setPassword] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axiosClient(`/users/forgot_password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe tener como mínimo 6 caractéres",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forgot_password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setModifiedPassword(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu contraseña y sigue en control de tu
        <span className="text-slate-700"> presupuesto</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg px-10 py-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Contraseña Nueva
            </label>
            <input
              type="password"
              placeholder="Escribe tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar contraseña"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {modifiedPassword && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
