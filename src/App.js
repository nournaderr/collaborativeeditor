import React, { useState, useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import UserDocuments from "./Components/UserDocuments";
import DocumentEditor from "./Components/DocumentEditor";
import TextEditor from "./Pages/TextEditor";
const dummyUserDocs = [
  // Dummy data for user documents
  { id: 1, name: "Document 1", owner: true },
  { id: 2, name: "Document 2", owner: true },
  { id: 3, name: "Shared Document 1", owner: false },
  { id: 4, name: "Shared Document 2", owner: false },
];
const App = () => {
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(() => {
    // Fetch user's documents from the server
    setUserDocuments(dummyUserDocs); // Consider fetching actual data from the server
  }, []);

  const handleDeleteDocument = (id) => {
    // Delete document with the given id from the server
    setUserDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleRenameDocument = (id) => {
    // Rename document with the given id
    console.log("Renaming document:", id);
  };

  const handleShareDocument = (id) => {
    // Share document with the given id
    console.log("Sharing document:", id);
  };

  const handleOpenDocument = (id) => {
    // Open document with the given id
    console.log("Opening document:", id);
  };
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/TextEditor"
            element={<TextEditor value={text} onChange={handleChange} />}
          />
          <Route
            path="/documents"
            element={
              <UserDocuments
                documents={userDocuments}
                onDelete={handleDeleteDocument}
                onRename={handleRenameDocument}
                onShare={handleShareDocument}
                onOpen={handleOpenDocument}
              />
            }
          />
          <Route path="/document/:id" element={<DocumentEditor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
