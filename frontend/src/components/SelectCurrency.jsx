import { useSelector } from "react-redux";

const SelectCurrency = ({ setCurrency, currency }) => {
  const { currencies } = useSelector((state) => state.accounts);

  const currenciesList =
    currencies.length > 0 &&
    currencies.map((item) => {
      return (
        <option key={item.id_currency} value={item.id_currency}>
          {item.name}
        </option>
      );
    });

  return (
    <select
      id="currency-id"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      onChange={(e) => setCurrency(e.target.value)}
      value={currency}
    >
      <option value="DEFAULT" disabled>
        -- Seleccione Moneda --
      </option>
      {currenciesList}
    </select>
  );
};
export default SelectCurrency;
