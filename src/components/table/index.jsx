import React, { useCallback, useContext, useEffect, useState } from "react";
import "./style.scss";
import allcomments from "../../comments";
import ArrowBtn from "../arrowBtn";
const CommentTable = ({ search, perPage }) => {
  const [comments, setComments] = useState([]);
  const [totalResults, setTotalResults] = useState(100);
  const [sortKey, setSortKey] = useState("at");
  const [sortOrder, setSortOrder] = useState("ascn");
  const [pages, setPages] = useState();


  useEffect(() => {
    updateComments();
    setPages(Math.round(totalResults / perPage));
  }, [perPage]);

  useEffect(()=>{
    
  })

  const updateComments = async () => {
    // let url = `https://dev.ylytic.com/ylytic/test`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    const parsedData = allcomments;
    setComments(parsedData.comments);
    setTotalResults(parsedData.comments.length);
  };

  

  function sortData({ comments, sortKey, reverse }) {
    // if(!sortKey) return comments
    const sortedData = comments.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });
    if (reverse) {
      return sortedData.reverse();
    }
    return sortedData;
  }

  //divide comments in pages
  function array_into_chunks(comments, perPage) {
    const arr = [];
    while (comments.length > 0) {
      const chunk = comments.splice(0, perPage);
      arr.push(chunk);
    }

    return arr;
  }

  const sortedData = useCallback(
    () =>
      sortData({
        comments,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [comments, sortKey, sortOrder]
  );
  function sortAndToggle(key) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="table-header" key="at" label="At">
              At
              <ArrowBtn className="arrow-btn"
                allIcon="◆"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("at")}
              />
            </th>
            <th className="table-header" key="author" label="Author">
              Author
              <ArrowBtn className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("author")}
              />
            </th>
            <th className="table-header" key="reply" label="Reply">
              Reply
              <ArrowBtn className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("reply")}
              />
            </th>
            <th className="table-header" key="like" label="Like">
              Like
              <ArrowBtn className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("like")}
              />
            </th>
            <th className="table-header" key="text" label="Text">
              Text
              <ArrowBtn className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("text")}
              />
            </th>
          </tr>
        </thead>

        {sortedData()
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.text.toLowerCase().includes(search.toLowerCase()) ||
                  item.author.toLowerCase().includes(search.toLowerCase());
          })
          .map((item, index) => (
            <tbody className="table-body" key={index}>
              <tr>
                <td>{item.at}</td>
                <td>{item.author}</td>
                <td>{item.reply}</td>
                <td>{item.like}</td>
                <td>{item.text}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default CommentTable;
