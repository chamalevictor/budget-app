import Header from "../components/Header";
import NewTransaction from "../components/NewTransaction";
import Title from "../components/Title";
import TransactionSummary from "../components/TransactionSummary";

const Transactions = () => {
  return (
    <div>
      <Header linkTo={"/dashboard"} linkName={"dashboard"} />
      <Title lightText="Historial de " darkText="Gastos" />
      <TransactionSummary />
      <NewTransaction />
    </div>
  );
};

export default Transactions;
