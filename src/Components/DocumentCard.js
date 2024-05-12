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
  // const [content, setContent] = useState([]);
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
      // const responseData = await response.json(); // Parse response JSON
      content = response.data;
      window.location.href = `/TextEditor?docID=${encodeURIComponent(
        docID
      )}&content=${encodeURIComponent(content)}`;
      console.log("Document opened successfully");
    } catch (error) {
      console.log("error");
      displayErrorMessage(error.message);
      console.error(error);
      return;
    }
  };
  const onShare = async (e) => {
    e.preventDefault();
    const recipient = prompt(
      "Enter username of the user you want to share the document with:"
    );
    if (!recipient) {
      // User cancelled sharing
      return;
    }
    const permission = prompt(
      "Select permission level: \n1. Editor\n2. Viewer"
    );

    if (!permission) {
      return;
    }

    let permissionLevel;
    switch (parseInt(permission)) {
      case 1:
        permissionLevel = "editor";
        break;
      case 2:
        permissionLevel = "viewer";
        break;
      default:
        console.log("Invalid permission level selected.");
        return;
    }

    try {
      // Make the share request with recipient and permission
      const response = await fetch(
        `https://collabbackend.onrender.com/share/${permissionLevel}/${recipient}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docID: docID,
            docName: "",
            authorName: "",
            content: "",
            bold: [],
            italic: [],
            editors: [],
            viewers: [],
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized: You are trying to share this document with its owner."
          );
        } else if (response.status === 404) {
          throw new Error("Not Found: The user is not found.");
        } else if (response.status === 409) {
          throw new Error(
            "Conflict: The document is already shared with the specified user."
          );
        } else {
          throw new Error("Failed to share document.");
        }
      }
      console.log("Document shared successfully.");
    } catch (error) {
      console.error("Error sharing document:", error);
      displayErrorMessage(error.message);
      return;
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
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
      <button onClick={onOpen}>Open</button>
      <button onClick={onRename}>Rename</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onShare}>Share</button>
    </div>
  );
}

export default DocumentCard;
