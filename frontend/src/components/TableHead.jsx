import React from "react";

const TableHead = () => {
  return (
    <>
      <thead className="bg-sky-600 text-white border-b">
        <tr>
          <th scope="col" className="text-lg font-medium  px-6 py-4 text-left">
            Cuenta
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Tipo
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Categoría
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Descripcion
          </th>

          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Monto
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
