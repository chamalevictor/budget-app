import { useSelector } from "react-redux";
import TransactionRow from "./TransactionRow";
import Loading from "./Loading";

const TransactionSummary = ({ transactionsListProp }) => {
  const { transactions, loadingTransactions } = useSelector(
    (state) => state.transactions
  );

  const transactionsList =
    transactions.length > 0 &&
    transactions.map((item) => {
      return <TransactionRow transaction={item} key={item.reference} />;
    });

  return (
    <div>
      {loadingTransactions && <Loading />}
      {!loadingTransactions && loadingTransactions.length !== 0 && (
        <div className="flex flex-col rounded mx-6">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden  rounded-lg ">
                <table className="min-w-full  ">
                  <thead className="bg-sky-600 text-white border-b ">
                    <tr>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium  px-6 py-4 text-left"
                      >
                        Cuenta
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Categoría
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Descripcion
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Moneda
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 py-4 text-left"
                      >
                        Monto
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-medium px-6 pt-4 text-left"
                      >
                        No. Referencia
                      </th>
                    </tr>
                  </thead>
                  <tbody>{transactionsListProp || transactionsList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSummary;
