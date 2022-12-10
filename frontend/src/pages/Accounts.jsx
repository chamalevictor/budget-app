import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../features/accountService";
import Account from "../components/Account";
import AccountForm from "../components/AccountForm";
import Title from "../components/Title";
import Button from "../components/Button";
import Header from "../components/Header";
import { useEffect } from "react";

const Accounts = () => {
  const dispatch = useDispatch();
  const { accounts, createAccountComplete } = useSelector(
    (state) => state.accounts
  );
  const [addAccount, setAddAccount] = useState(false);

  useEffect(() => {
    if (createAccountComplete) {
      dispatch(getAccounts());
    }
  }, [createAccountComplete]);

  const accountsList =
    accounts.length > 0 &&
    accounts.map((item) => {
      if (item.state) {
        return <Account account={item} key={item.account_id} />;
      }
    });

  return (
    <div>
      <Header linkTo={"/dashboard"} linkName={"dashboard"} />
      <Title lightText={"Resumen de"} darkText={"cuentas"} />
      <div className="flex flex-row justify-center">{accountsList}</div>

      {addAccount ? (
        <div className=" w-full flex flex-column justify-center my-6 ">
          <AccountForm setAddAccount={setAddAccount} />{" "}
        </div>
      ) : (
        <div className=" w-full flex flex-column justify-center mt-6 gap-4">
          <button
            onClick={(e) => setAddAccount(true)}
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700"
          >
            {" "}
            Agregar Cuenta{" "}
          </button>

          <Link to="/dashboard" className="font-bold uppercase">
            <Button title={"Volver"} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Accounts;
