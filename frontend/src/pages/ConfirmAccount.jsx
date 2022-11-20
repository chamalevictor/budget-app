import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState("");
  const [verifiedAccount, setVerifiedAccount] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm_account/${id}`;
        const { data } = await axiosClient(url);

        setAlert({
          msg: data.msg,
          error: false,
        });

        setVerifiedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y empieza a rastrear tus
        <span className="text-slate-700"> finanzas</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {verifiedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
