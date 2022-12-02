import React from "react";

const Title = ({ lightText, darkText }) => {
  return (
    <h1 className="text-sky-600 font-black text-6xl capitalize text-center py-6 ">
      {lightText}
      <span className="text-slate-700"> {darkText}</span>
    </h1>
  );
};

export default Title;
