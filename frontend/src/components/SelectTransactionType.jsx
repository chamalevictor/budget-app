const SelectTransactionType = ({ setTransactionType, transactionType }) => {
  return (
    <select
      id="transaction-id"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      onChange={(e) => setTransactionType(e.target.value)}
      value={transactionType}
    >
      <option value="DEFAULT" disabled>
        -- Tipo de Transacción --
      </option>
      <option key={1} value={1}>
        {"Crédito"}
      </option>
      <option key={2} value={2}>
        {"Débito"}
      </option>
      <option key={3} value={3}>
        {"Transferencia"}
      </option>
    </select>
  );
};

export default SelectTransactionType;
