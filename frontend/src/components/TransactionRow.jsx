const TransactionRow = ({ transaction }) => {
  return (
    <tr className="bg-white border-b ">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.date.split("T")[0]}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.account}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.transaction}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.currency}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {transaction.ammount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
        {transaction.reference}
      </td>
    </tr>
  );
};

export default TransactionRow;
