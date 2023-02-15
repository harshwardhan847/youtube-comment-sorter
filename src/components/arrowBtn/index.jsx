import React, { useState } from "react";
import "./style.scss";
const ArrowBtn = ({ onClick }) => {
  const [icon, seticon] = useState("▼");
  function changeSign() {
    seticon(icon === "▲" ? "▼" : "▲");
  }
  return (
    <button
      onClick={() => {
        onClick();
        changeSign();
      }}
    >
      {icon}
    </button>
  );
};

export default ArrowBtn;
