import React, { useState } from "react";
import CommentTable from "../../components/table";
import "./style.scss";
const Header = () => {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <header>
      <h1>Youtube Comment Sorter</h1>

      {/* taking input from user to search*/}
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* taking input for comments per page */}

      <input
        type="text"
        placeholder="Comments per page"
        onChange={(e) => {
          if (e.target.value === "" || e.target.value === "0") {
            setPerPage(10);
            return;
          }
          setPerPage(e.target.value);
        }}
      />
      <div className="btn-container">
        {/* btn for previous page */}
        <button
          className="next-pre-btn"
          onClick={() => {
            if (currentPage === 0) {
              return;
            }
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </button>
        {/* btn for next page */}
        <button
          className="next-pre-btn"
          onClick={() => {
            if (currentPage === 100 / perPage) {
              return;
            }
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>{" "}
      </div>

      <CommentTable
        perPage={perPage}
        search={search}
        currentPage={currentPage}
      />
    </header>
  );
};

export default Header;
