import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAccounts, getExtras } from "../features/accountService";
import { getAllTransactions } from "../features/transactionServices";
import Account from "../components/Account";
import Button from "../components/Button";
import NewTransaction from "../components/NewTransaction";
import Title from "../components/Title";
import TransactionSummary from "../components/TransactionSummary";
import TransactionRow from "../components/TransactionRow";
import Header from "../components/Header";
import Transfer from "../components/Transfer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const { transactions } = useSelector((state) => state.transactions);

  const refresh = () => {
    dispatch(getExtras());
    dispatch(getAllTransactions());
    dispatch(getAccounts());
  };

  useEffect(() => {
    refresh();
  }, []);

  const accountsList =
    accounts.length > 0 &&
    accounts.slice(0, 2).map((item) => {
      if (item.state) {
        return <Account account={item} key={item.account_id} />;
      }
    });

  const transactionsList =
    transactions.length > 0 &&
    transactions.slice(0, 3).map((item) => {
      return <TransactionRow transaction={item} key={item.reference} />;
    });

  return (
    <>
      <Header linkTo={"accounts"} linkName={"cuentas"} />
      {accounts.length > 0 ? (
        <div>
          <Title lightText={"Resumen de"} darkText={"Cuentas"} />
          <div className="flex flex-row justify-center autofocus">
            {accountsList}
          </div>
        </div>
      ) : (
        <div>
          <Title lightText={"No tienes cuentas"} darkText={"registradas"} />
          <Link to="accounts" className="font-bold uppercase">
            <div className=" w-full flex flex-column justify-center mt-6">
              <Button title={"Ir a Cuentas"} />
            </div>
          </Link>
        </div>
      )}

      <h3 className="text-1xl font-black py-3">Últimos Movimientos</h3>
      <TransactionSummary transactionsListProp={transactionsList} />
      <Link to="transactions" className="font-bold uppercase">
        <div className=" w-full flex flex-column justify-center mt-6">
          <Button title={"ver Transacciones"} />
        </div>
      </Link>
      <h3 className="text-1xl font-black py-6">Operaciones Rápidas</h3>
      <NewTransaction refresh={refresh} />
      <div className=" w-full flex flex-column justify-center my-6">
        {" "}
        <Transfer refresh={refresh} />
      </div>
    </>
  );
};

export default Dashboard;
