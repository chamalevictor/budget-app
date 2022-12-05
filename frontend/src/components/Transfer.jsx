import { useState } from "react";
import { useDispatch } from "react-redux";
import SelectAccount from "./SelectAccount";
import CurrenciesRadioButton from "./CurrenciesRadioButton";
import { newTransfer } from "../features/transactionServices";
import Alert from "./Alert";

const Transfer = ({ refresh }) => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState("DEFAULT");
  const [destination, setDestination] = useState("DEFAULT");
  const [currency, setCurrency] = useState(false);
  const [ammount, setAmmount] = useState(0);
  const [alert, setAlert] = useState({});

  const today = new Date().toLocaleDateString("es-GT").split("T")[0];
  const transferDate = today
    .split("/")
    .reverse()
    .join("/")
    .replace(/[\/]/g, "-");

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([origin, destination, currency, ammount].includes(0)) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    setAlert({});
    const newTransferObj = {
      transferDate,
      origin,
      destination,
      currency,
      ammount,
    };
    dispatch(newTransfer(newTransferObj));
    // setAlert({
    //   msg: "Transferencia realizada con éxito",
    //   error: false,
    // });
    refresh();
    setOrigin("DEFAULT");
    setDestination("DEFAULT");
    setCurrency(0);
    setAmmount(0);
  };
  const { msg } = alert;
  return (
    <div className="bg-white  md:w-1/2 rounded-lg shadow mt-10">
      {msg && <Alert alert={alert} />}
      <h5 className="text-white w-full px-6 py-3 text-2xl leading-tight bg-sky-600 font-medium rounded-t-lg shadow">
        Nueva Transferencia
      </h5>
      <form onSubmit={handleSubmit} className="pt-5 pb-10 px-5 ">
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="bankID"
          >
            Origen
          </label>
          <SelectAccount setAccount={setOrigin} account={origin} />
        </div>
        <div className="accountNumber mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="accountId"
          >
            Destino
          </label>

          <SelectAccount setAccount={setDestination} account={destination} />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm "
            htmlFor="currency"
          >
            Moneda
          </label>
          <div className="flex justify-between py-3 px-6 mb-3" id="currency">
            <CurrenciesRadioButton
              setCurrency={setCurrency}
              currency={currency}
            />
          </div>
        </div>
        <div className="accountNumber mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm"
            htmlFor="accountId"
          >
            Monto
          </label>

          <input
            type="number"
            id="accountId"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            placeholder="Ingrese Monto "
            pattern="[0-9]"
            value={ammount === 0 ? "Ingrese monto" : ammount}
            onChange={(e) => setAmmount(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <input
          type="submit"
          value="Realizar transferencia"
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </div>
  );
};

export default Transfer;
