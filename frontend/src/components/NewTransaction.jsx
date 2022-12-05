import { useState } from "react";
import { newTransaction } from "../features/transactionServices";
import Button from "./Button";
import SelectAccount from "./SelectAccount";
import SelectCategoriy from "./SelectCategory";
import SelectCurrency from "./SelectCurrency";
import SelectTransactionType from "./SelectTransactionType";
import Alert from "./Alert";
import { useDispatch } from "react-redux";

const NewTransaction = ({ refresh }) => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("DEFAULT");
  const [transactionType, setTransactionType] = useState("DEFAULT");
  const [category, setCategory] = useState("DEFAULT");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("DEFAULT");
  const [ammount, setAmmount] = useState(0);
  const [alert, setAlert] = useState({});

  const today = new Date().toLocaleDateString("es-GT").split("T")[0];
  const transactionDate = today
    .split("/")
    .reverse()
    .join("/")
    .replace(/[\/]/g, "-");

  const handleSubmit = (e) => {
    e.preventDefault();

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
      console.log("elemento vacio");
      return;
    }

    const newTransactionObj = {
      transactionDate,
      account,
      transactionType,
      category,
      description,
      currency,
      ammount,
    };

    if (transactionType == 2) {
      newTransactionObj.ammount = -Math.abs(newTransactionObj.ammount);
    }

    dispatch(newTransaction(newTransactionObj));

    setAlert({
      msg: "Realizado con exito",
      error: false,
    });
    setAccount("DEFAULT");
    setTransactionType("DEFAULT");
    setCategory("DEFAULT");
    setDescription("");
    setCurrency("DEFAULT");
    setAmmount(0);
    refresh();
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
                <thead className="bg-sky-600 text-white border-b">
                  <tr>
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
                  </tr>
                </thead>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      <SelectCurrency
                        setCurrency={setCurrency}
                        currency={currency}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900 esMoney">
                      <input
                        type="number"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md accountNumber  "
                        pattern="[0-9]"
                        value={ammount === 0 ? "Número de cuenta" : ammount}
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
