import { useSelector } from "react-redux";

const SelectBank = ({ setBank }) => {
  const { banks } = useSelector((state) => state.accounts);

  const banksList =
    banks.length > 0 &&
    banks.map((item) => {
      return (
        <option key={item.id_bank} value={item.id_bank}>
          {item.name}
        </option>
      );
    });

  return (
    <select
      id="bankID"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      defaultValue={"DEFAULT"}
      onChange={(e) => setBank(e.target.value)}
    >
      <option value="DEFAULT" disabled>
        -- Seleccione un Banco --
      </option>
      {banksList}
    </select>
  );
};

export default SelectBank;
