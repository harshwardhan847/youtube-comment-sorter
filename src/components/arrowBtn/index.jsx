import React, { useState } from "react";

const ArrowBtn = ({onClick, allIcon}) => {
  const [icon, seticon] = useState("▼");
  function changeSign() {
    seticon(icon === "▲" ? "▼" : "▲");
    
  }
  return <button onClick={()=>{
    onClick()
    changeSign()
  }}>
    {icon}
  </button>;
};

export default ArrowBtn;
