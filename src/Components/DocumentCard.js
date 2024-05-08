import React from "react";
import "../styles/Documents.css";

const DocumentCard = ({ title, fileType, date, thumbnail }) => {
  return (
    <div className="document-card">
      <img
        src={thumbnail}
        alt="Document Thumbnail"
        className="document-thumbnail"
      />
      <div className="document-info">
        <h3 className="document-title">{title}</h3>
        <p className="document-type">{fileType}</p>
        <p className="document-date">{date}</p>
      </div>
    </div>
  );
};

export default DocumentCard;
