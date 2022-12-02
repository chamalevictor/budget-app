import { useSelector } from "react-redux";

const SelectAccount = ({ setAccount, account }) => {
  const { accounts } = useSelector((state) => state.accounts);

  const accountsList =
    accounts.length > 0 &&
    accounts.map((item) => {
      return (
        <option key={item.account_id} value={item.account_id}>
          {`${item.account_id} ${item.bank} `}
        </option>
      );
    });

  return (
    <select
      id="accountID"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      onChange={(e) => setAccount(e.target.value)}
      value={account}
    >
      <option value="DEFAULT" disabled>
        -- Seleccione Cuenta --
      </option>
      {accountsList}
    </select>
  );
};

export default SelectAccount;
