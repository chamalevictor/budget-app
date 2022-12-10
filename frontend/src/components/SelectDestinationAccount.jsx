import { useSelector, useDispatch } from "react-redux";
import { destinationAccountService } from "../features/accountService";

const SelectDestinationAccount = ({ setAccount, account }) => {
  const { accounts, singleAccount } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const accountsList =
    accounts.length > 0 &&
    accounts.map((item) => {
      if (item.account_id != singleAccount[0].account_id) {
        return (
          <option key={item.account_id} value={item.account_id}>
            {`${item.account_id} ${item.bank} ${item.balance ?? "0.00"}`}
          </option>
        );
      }
    });

  const handleChange = (e) => {
    setAccount(e.target.value);
    dispatch(destinationAccountService(e.target.value));
  };

  return (
    <select
      id="accountID"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      onChange={(e) => {
        handleChange(e);
      }}
      value={account}
    >
      <option value="DEFAULT" disabled>
        -- Seleccione Cuenta --
      </option>
      {accountsList}
    </select>
  );
};

export default SelectDestinationAccount;
