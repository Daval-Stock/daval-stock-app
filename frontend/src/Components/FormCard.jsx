import React from "react";

const FormCard = ({ children }) => {
  return (
    <>
      <div className="relative w-full max-w-lg mx-auto mb-32 rounded-lg drop-shadow-md bg-gray-900">
        {children}
      </div>
    </>
  );
};

export default FormCard;
