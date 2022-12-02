import { useSelector } from "react-redux";

const CurrenciesRadioButton = ({ setCurrency, currency }) => {
  const { currencies } = useSelector((state) => state.accounts);

  const currenciesGroup =
    currencies.length > 0 &&
    currencies.map((item) => {
      return (
        <div key={item.id_currency}>
          <input
            type="radio"
            className="radioButtons"
            value={item.id_currency}
            name="currency"
            id={item.name}
            onChange={(e) => setCurrency(e.target.value)}
          />{" "}
          <label htmlFor={item.name} className="ml-1">
            {item.name}
          </label>
        </div>
      );
    });

  return (
    <div className="flex flex-row justify-between w-full ">
      <input
        type="radio"
        className="hidden"
        value={0}
        checked={currency === 0}
        name="currency"
        id={0}
        onChange={(e) => setCurrency(e.target.value)}
      />
      {currenciesGroup}
    </div>
  );
};

export default CurrenciesRadioButton;
