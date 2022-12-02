import { useSelector } from "react-redux";

const SelectCategory = ({ setCategory, category }) => {
  const { categories } = useSelector((state) => state.accounts);

  const categoriesList =
    categories.length > 0 &&
    categories.map((item) => {
      return (
        <option key={item.id_category} value={item.id_category}>
          {item.name}
        </option>
      );
    });

  return (
    <select
      id="category-id"
      className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
      onChange={(e) => setCategory(e.target.value)}
      value={category}
    >
      <option value="DEFAULT" disabled>
        -- Elija una Categoría --
      </option>
      {categoriesList}
    </select>
  );
};
export default SelectCategory;
