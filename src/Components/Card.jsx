import "./Style.css";
import React, { useState } from "react";

function Card({ item }) {
  function truncateWords(text, maxWords) {
    if (!text) {
      return "";
    }

    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }

    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(" ") + " ...";
  }

  const defaultImageUrl =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";
  const [imageSrc, setImageSrc] = useState(item.urlToImage || defaultImageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc(defaultImageUrl);
      setHasError(true);
      localStorage.setItem("defaultImage", defaultImageUrl);
    }
  };

  return (
    <div className="card" style={{ width: "19rem" }}>
      <img
        src={item.urlToImage ? item.urlToImage : imageSrc}
        className={`card-img-top ${hasError ? "default-image" : ""}`}
        alt=""
        onError={handleImageError}
      />
      <div className="card-body">
        <h4 className="card-title">{truncateWords(item.title, 10)}</h4>
        <p className="card-text card-description">
          {truncateWords(item.description, 13)}
        </p>
        <div className="card-button">
          <a href={item.url} className="btn btn-primary" target="_blank">
            View Detail
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
