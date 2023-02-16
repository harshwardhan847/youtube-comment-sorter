import React from "react";
import spinner from "../../assets/spinner.gif";

export default function Spinner() {
  return (
    <div className="text-center">
      <img className="my-3" src={spinner} alt="loading" />
    </div>
  );
}
