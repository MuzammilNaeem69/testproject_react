import Card from "./Card";
import "./Style.css";
import React from "react";

function CardGrid({ newData }) {
  return (
    <div className="card-grid">
      {newData
        ? newData.map((item, index) => <Card key={index} item={item} />)
        : "Loading..."}
    </div>
  );
}

export default CardGrid;
