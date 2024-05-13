import React from "react";
import "../styles/Documents.css";

const ViewerDocumentCard = ({
  docID,
  docName,
  authorName,
  content,
  bold,
  italic,
  editors,
  viewers,
}) => {
  const onOpen = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://collabbackend.onrender.com/content/${docID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to open document");
      }
      console.log(response + "response");
      const responseData = await response.json(); // Parse response JSON
      console.log(response + "response");
      console.log(responseData);
      window.location.href = `/TextEditor?docID=${docID}&content=${responseData}`;
      console.log("Document opened successfully");
    } catch (error) {
      console.log("error");
      displayErrorMessage(error.message);
      console.error(error);
      return;
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
      <button onClick={onOpen}>Open</button>
    </div>
  );
};

export default ViewerDocumentCard;
