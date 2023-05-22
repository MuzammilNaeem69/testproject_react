import axios from "axios";
import CardGrid from "./CardGrid";
import React, { useEffect, useReducer } from "react";

const initialState = {
  newData: [],
  error: null,
  currentPage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        newData: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: "Error fetching news. Please try again later.",
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const GetNews = ({ category, query }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { newData, error, currentPage } = state;
  const itemsPerPage = 15;

  const fetchNews = () => {
    const apiUrl = query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=af9dc6656e484b35a8b9a44db5917460`
      : category
      ? `https://newsapi.org/v2/everything?q=${category}&apiKey=af9dc6656e484b35a8b9a44db5917460`
      : `https://newsapi.org/v2/everything?q=USA&apiKey=af9dc6656e484b35a8b9a44db5917460`;

    axios
      .get(apiUrl)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.articles });
        const searchKey = query || "default";

        if (category) {
          const categoryKey = `categoryData_${category}`;
          localStorage.setItem(categoryKey, JSON.stringify(res.data.articles));
        }

        localStorage.setItem(searchKey, JSON.stringify(res.data.articles));
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_ERROR" });
      });
  };

  useEffect(() => {
    const savedNewsData = localStorage.getItem(query || "default");
    if (savedNewsData) {
      dispatch({ type: "FETCH_SUCCESS", payload: JSON.parse(savedNewsData) });
    } else {
      fetchNews();
    }
  }, [query]);

  useEffect(() => {
    const savedCategoryData = localStorage.getItem(`categoryData_${category}`);
    if (category && savedCategoryData) {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: JSON.parse(savedCategoryData),
      });
    } else {
      fetchNews();
    }
  }, [category]);

  const handlePageChange = (pageNumber) => {
    dispatch({ type: "SET_PAGE", payload: pageNumber });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newData.length / itemsPerPage);

  return (
    <div>
      <CardGrid newData={currentItems} />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default GetNews;
