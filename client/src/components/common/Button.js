import React from "react";

const Button = ({ name, id, onClick }) => {
  return (
    <p>
      <button
        id={id}
        onClick={onClick}
        className="btn btn-info text-center display-4"
      >
        {name}
      </button>
    </p>
  );
};

export default Button;
