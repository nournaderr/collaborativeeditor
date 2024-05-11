import React from "react";
import "../styles/Documents.css";

const EditorDocumentCard = ({
  docID,
  docName,
  authorName,
  content,
  bold,
  italic,
  editors,
  viewers,
}) => {
  return (
    <div className="document-card">
      <div className="document-info">
        <h3 className="document-title">{docName}</h3>
        <p className="document-type">{authorName}</p>
        {/* <p className="document-date">{docID}</p> */}
      </div>
    </div>
  );
};

export default EditorDocumentCard;
