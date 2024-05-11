import React from "react";
import "../styles/Documents.css";

function DocumentCard({
  docID,
  docName,
  authorName,
  content,
  bold,
  italic,
  editors,
  viewers,
}) {
  const onOpen = (docID) => {};
  const onDelete = async (e) => {
    e.preventDefault();
    const docName = prompt("Enter document name:");
    if (docName) {
      try {
        const response = await fetch(
          `https://collabbackend.onrender.com/delete/${docID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete document");
        }
        console.log("Document deleted successfully");
      } catch (error) {
        console.log("error");
        displayErrorMessage(error.message);
        console.error(error);
        return;
      }
    }
  };
  const onRename = async (e) => {
    e.preventDefault();
    const docName = prompt("Enter document name:");
    if (docName) {
      try {
        const response = await fetch(
          "https://collabbackend.onrender.com/rename",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docID: docID,
              docName: docName,
              authorName: authorName,
              content: "",
              bold: [],
              italic: [],
              editors: [],
              viewers: [],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Document cannot be renamed, you have a document with the same name"
          );
        }
      } catch (error) {
        console.log("error");
        displayErrorMessage(error.message);
        console.error(error);
        return;
      }
    }
  };
  const displayErrorMessage = (message) => {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
  };
  return (
    <div className="document-card">
      <div className="document-info">
        <h3 className="document-title">{docName}</h3>
        <p className="document-type">{authorName}</p>
        {/* <p className="document-date">{docID}</p> */}
      </div>
      <button onClick={() => onOpen(docID)}>Open</button>
      <button onClick={onRename}>Rename</button>
      <button onClick={() => onDelete(docID)}>Delete</button>
    </div>
  );
}

export default DocumentCard;
