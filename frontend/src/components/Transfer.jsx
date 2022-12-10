import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectAccount from "./SelectAccount";
import { newTransfer } from "../features/transactionServices";
import Alert from "./Alert";
import SelectDestinationAccount from "./SelectDestinationAccount";
import { currencyConverter, generateDate } from "../helpers/currencyConverter";

const Transfer = () => {
  const { singleAccount, destinationAccount } = useSelector(
    (state) => state.accounts
  );
  const dispatch = useDispatch();

  const [origin, setOrigin] = useState("DEFAULT");
  const [destination, setDestination] = useState("DEFAULT");
  const [ammount, setAmmount] = useState(0);
  const [alert, setAlert] = useState({});
  const transferDate = generateDate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([origin, destination, currency, ammount].includes(0)) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    if (
      Number(singleAccount[0].balance).toFixed(2) < Number(ammount).toFixed(2)
    ) {
      console.log(singleAccount[0].balance, ammount);
      setAlert({
        msg: "El monto ingresado supera el disponible en cuenta",
        error: true,
      });
      return;
    }
    setAlert({});
    const newTransferObj = {
      transferDate,
      origin,
      destination,
      currency: singleAccount[0].currency_id,
      destinationCurrency: destinationAccount[0].currency_id,
      ammount,
      destinationAmmount: currencyConverter(
        singleAccount[0].currency_id,
        destinationAccount[0].currency_id,
        ammount
      ),
    };

    dispatch(newTransfer(newTransferObj));
    setAlert({
      msg: "Transferencia realizada con éxito",
      error: false,
    });
    setOrigin("DEFAULT");
    setDestination("DEFAULT");
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

          <SelectDestinationAccount
            setAccount={setDestination}
            account={destination}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase front-bold text-sm "
            htmlFor="currency"
          >
            Moneda de Origen
          </label>
          <div className="flex justify-between py-3 px-6 mb-3" id="currency">
            {singleAccount[0]?.currency ? singleAccount[0].currency : "nada"}
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
