import { useState } from "react";
import { createAccount, getAccounts } from "../features/accountService";
import { useDispatch } from "react-redux";
import CurrenciesRadioButton from "./CurrenciesRadioButton";
import SelectAccountType from "./SelectAccountType";
import SelectBank from "./SelectBank";
import Alert from "./Alert";
import { useEffect } from "react";

const AccountForm = ({ setAddAccount }) => {
  const dispatch = useDispatch();
  const [id_account, setIdAccount] = useState(0);
  const [id_bank, setIdBank] = useState(0);
  const [id_account_type, setIdAccountType] = useState(0);
  const [id_currency, set_IdCurrency] = useState(0);
  const [alert, setAlert] = useState({});

  const generateAccountNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([id_account, id_bank, id_account_type, id_currency].includes(0)) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    const newAccount = {
      id_account,
      id_bank,
      id_account_type,
      id_currency,
    };
    dispatch(createAccount(newAccount));
    dispatch(getAccounts());
    setAddAccount(false);
  };
  useEffect(() => {
    if (id_bank == 1) {
      setIdAccount(generateAccountNumber());
    }
  }, [id_bank]);
  const { msg } = alert;

  return (
    <div className="bg-white  md:w-1/2 rounded-lg shadow ">
      {msg && <Alert alert={alert} />}
      <h5 className="text-white w-full px-6 py-3 text-2xl leading-tight bg-sky-600 font-medium rounded-t-lg shadow">
        Cuenta Nueva
      </h5>
      <form onSubmit={handleSubmit} className="pt-5 pb-10 px-5 ">
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="bankID"
          >
            Banco
          </label>
          <SelectBank setBank={setIdBank} />
        </div>
        <div className="accountNumber mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="accountId"
          >
            Número de cuenta
          </label>

          <input
            type="number"
            id="accountId"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Número de cuenta"
            pattern="[0-9]"
            value={id_account === 0 ? "Número de cuenta" : id_account}
            onChange={(e) => setIdAccount(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="account-type"
          >
            Tipo de Cuenta
          </label>
          <SelectAccountType setAccountType={setIdAccountType} />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm "
            htmlFor="currency"
          >
            Moneda
          </label>
          <div className="flex justify-between py-3 px-6 mb-3" id="currency">
            <CurrenciesRadioButton setCurrency={set_IdCurrency} />
          </div>
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </div>
  );
};

export default AccountForm;
