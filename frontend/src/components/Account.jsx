import { useSelector, useDispatch } from "react-redux";
import { getAccounts, markAccountAsDeleted } from "../features/accountService";
import Loading from "./Loading";

const Account = ({ account }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.accounts);
  const balance = Number(account.balance).toLocaleString("en");

  const handleDelete = (e) => {
    e.preventDefault();
    const deleteAccountObj = {
      account_id: account.account_id,
    };
    dispatch(markAccountAsDeleted(deleteAccountObj));
    dispatch(getAccounts());
  };

  return (
    <div className="flex justify-center py-10 mb-10" key={account.account_id}>
      {loading && <Loading />}
      {!loading && account.length !== 0 && (
        <>
          <div className="block   mx-6 rounded-lg shadow-lg bg-white max-w-sm minWidth-50 w-96">
            <h5 className="text-white w-full px-6 py-3 text-2xl leading-tight bg-sky-600 font-medium mb-3 rounded-t-lg shadow">
              {account.bank || "Cargando"}
            </h5>
            <div className="px-6 pb-6">
              <div className="  text-base mb-4 text-gray-500">
                <p className="flex items-center gap-6">
                  <span className=" text-base customText">Cuenta: </span>
                  <span className=" text-base font-medium customText">
                    {account.account_id}
                  </span>
                </p>
                <p className="flex items-center text-sm text-gray-400 mb-3">
                  <span>
                    {account.account_type} ({account.currency})
                  </span>
                </p>

                <p className="flex flex-row ">
                  <span>Balance: </span>
                </p>

                <p className="w-full flex flex-row justify-end">
                  <span
                    className={` ${
                      account.currency_id == 1 ? "esMoney" : "enMoney"
                    } text-3xl font-bold text-gray-600`}
                  >
                    {balance}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-row justify-center gap-6">
                <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-rose-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-rose-800 hover:shadow-lg focus:bg-rose-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg transition duration-100 ease-in-out"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
