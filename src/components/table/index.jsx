import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import ArrowBtn from "../arrowBtn";
import Spinner from "../spinner/Spinner";
const CommentTable = ({ search, perPage, currentPage }) => {
  const [comments, setComments] = useState([]);
  const [currentComments, setCurrentComments] = useState([]);
  const [sortKey, setSortKey] = useState("at");
  const [sortOrder, setSortOrder] = useState("ascn");
  const [loading, setLoading] = useState(false);

  const SortedData = useCallback(
    () =>
      sortData({
        comments,
        sortKey,
        reverse: sortOrder === "desc",
      }),
    [comments, sortKey, sortOrder]
  );
  function sortData({ comments, sortKey, reverse }) {
    // if(!sortKey) return comments

    console.log(comments);
    const sortedData = [...comments].sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    console.log(comments);
    if (reverse) {
      return sortedData.reverse();
    }
    return sortedData;
  }

  useEffect(() => {
    const updatedComments = async () => {
      await updateComments();
      console.log("fetch");
    };
    updatedComments();
  }, []);
  useEffect(() => {
    console.log(comments);
    setCurrentComments(array_into_chunks(SortedData(), perPage));

    // eslint-disable-next-line
  }, [perPage, comments, sortKey, sortOrder]);

  useEffect(() => {}, [currentComments]);

  const updateComments = async () => {
    let url = `https://dev.ylytic.com/ylytic/test`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setComments(parsedData.comments);
    setLoading(false);
  };

  //divide comments in pages
  function array_into_chunks(comments, perPage) {
    const arr = [];
    while (comments.length > 0) {
      const chunk = comments.splice(0, perPage);
      arr.push(chunk);
    }
    return arr;
  }

  //arrow btn on click handler
  function sortAndToggle(key) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  return (
    <div className="table-container">
      <div className="comments">Comments per page - {perPage}</div>
      <table>
        <thead>
          <tr>
            <th className="table-header" key="at" label="At">
              At
              <ArrowBtn
                className="arrow-btn"
                allIcon="◆"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("at")}
              />
            </th>
            <th className="table-header" key="author" label="Author">
              Author
              <ArrowBtn
                className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("author")}
              />
            </th>
            <th className="table-header" key="reply" label="Reply">
              Reply
              <ArrowBtn
                className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("reply")}
              />
            </th>
            <th className="table-header" key="like" label="Like">
              Like
              <ArrowBtn
                className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("like")}
              />
            </th>
            <th className="table-header" key="text" label="Text">
              Text
              <ArrowBtn
                className="arrow-btn"
                sortOrder={sortOrder}
                onClick={() => sortAndToggle("text")}
              />
            </th>
          </tr>
        </thead>

        {currentComments?.[currentPage]
          ?.filter((item) => {
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
      <div className="spinner">
        {loading && <Spinner className="spinner-comp" />}
      </div>
    </div>
  );
};

export default CommentTable;
