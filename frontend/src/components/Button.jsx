import React from "react";

const Button = ({ title, onClickAction }) => {
  return (
    <button
      type="button"
      onClick={onClickAction}
      className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700"
    >
      {" "}
      {title}{" "}
    </button>
  );
};

export default Button;
