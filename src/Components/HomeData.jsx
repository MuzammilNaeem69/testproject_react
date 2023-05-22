import GetNews from "./GetNews";
import Search from "./Search";
import "./Style.css";
import React, { useState } from "react";

const HomeData = ({ category }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <h3 className="obtain">Top Headlines</h3>
      <Search onSearch={handleSearch} />
      <GetNews category={category} query={query} />
    </div>
  );
};

export default HomeData;
