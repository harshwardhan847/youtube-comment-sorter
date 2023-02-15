import React, { useState } from "react";
import CommentTable from "../../components/table";
import "./style.scss";
const Header = () => {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState("10");
  return (
    <header>
      <h1>Youtube comment Sorter</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <select name="pages" id="pages">
        <option value="10" onClick={(e)=>setPerPage(e.target.value)}>10 per page</option>
        <option value="20" onClick={(e)=>setPerPage(e.target.value)}>20 per page</option>
        <option value="30" onClick={(e)=>setPerPage(e.target.value)}>30 per page</option>
        <option value="50" onClick={(e)=>setPerPage(e.target.value)}>50 per page</option>
      </select>
      <CommentTable perPage={perPage} search={search} />
    </header>
  );
};

export default Header;
