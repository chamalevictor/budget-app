import { useState } from "react";
import { newTransaction } from "../features/transactionServices";
import Button from "./Button";
import SelectAccount from "./SelectAccount";
import SelectCategoriy from "./SelectCategory";
import SelectCurrency from "./SelectCurrency";
import SelectTransactionType from "./SelectTransactionType";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "./TableHead";
import { generateDate } from "../helpers/currencyConverter";

const NewTransaction = () => {
  const { singleAccount } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const [account, setAccount] = useState("DEFAULT");
  const [transactionType, setTransactionType] = useState("DEFAULT");
  const [category, setCategory] = useState("DEFAULT");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("DEFAULT");
  const [ammount, setAmmount] = useState(0);
  const [alert, setAlert] = useState({});

  const clearFields = () => {
    setAccount("DEFAULT");
    setTransactionType("DEFAULT");
    setCategory("DEFAULT");
    setDescription("");
    setCurrency("DEFAULT");
    setAmmount(0);
  };

  const transactionDate = generateDate();

  const handleSubmit = (e) => {
    setAlert({});
    e.preventDefault();

    // Validation.
    if (
      [
        account,
        transactionType,
        category,
        description,
        currency,
        ammount,
      ].includes("")
    ) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    const newTransactionObj = {
      transactionDate,
      account,
      transactionType,
      category,
      description,
      currency: singleAccount[0].currency_id,
      ammount,
    };

    if (transactionType == 2) {
      if (
        Number(ammount).toFixed(2) < Number(singleAccount[0].balance).toFixed(2)
      ) {
        newTransactionObj.ammount = -1 * newTransactionObj.ammount; // convert it to negative.
      } else {
        setAlert({
          msg: `El monto excede el disponible de la cuenta ${account}`,
          error: true,
        });
        clearFields();
        return;
      }
    }
    dispatch(newTransaction(newTransactionObj)); // Store it.
    clearFields();
  };
  const { msg } = alert;
  return (
    <div>
      {msg && (
        <div className="mx-6">
          {" "}
          <Alert alert={alert} />
        </div>
      )}
      <div className="flex flex-col mx-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg">
              <table className="min-w-full mb-3">
                <TableHead />
                <tbody>
                  <tr className="bg-white border-b ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <SelectAccount
                        setAccount={setAccount}
                        account={account}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <SelectTransactionType
                        setTransactionType={setTransactionType}
                        transactionType={transactionType}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <SelectCategoriy
                        setCategory={setCategory}
                        category={category}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <input
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Escriba una descripción"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={
                          description === "0"
                            ? "Escriba una descripción"
                            : description
                        }
                      />
                    </td>

                    <td
                      className={`"px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900" ${
                        singleAccount[0]?.currency_id == 1
                          ? "esMoney"
                          : "enMoney"
                      } `}
                    >
                      <input
                        type="number"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md accountNumber  "
                        pattern="[0-9]"
                        value={ammount === 0 ? "" : ammount}
                        onChange={(e) => setAmmount(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-column justify-center my-6">
        <Button title={"Realizar Transacción"} onClickAction={handleSubmit} />
      </div>
    </div>
  );
};

export default NewTransaction;
