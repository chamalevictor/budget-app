import { useSelector } from "react-redux";

const SelectAccountType = ({ setAccountType }) => {
  const { accountTypes } = useSelector((state) => state.accounts);

  const accountTypesList =
    accountTypes.length > 0 &&
    accountTypes.map((item) => {
      return (
        <option key={item.id_account_type} value={item.id_account_type}>
          {item.name}
        </option>
      );
    });

  return (
    <select
      id="account-type"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      defaultValue={"DEFAULT"}
      onChange={(e) => setAccountType(e.target.value)}
    >
      <option value="DEFAULT" disabled>
        -- Tipo de Cuenta --
      </option>
      {}
      {accountTypesList}
    </select>
  );
};

export default SelectAccountType;
