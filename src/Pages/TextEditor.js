import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
const TextEditor = ({ value, onChange }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const docID = params.get("docID");
  const initialContent = params.get("content") || ""; // Get initial content from URL query string
  const [content, setContent] = useState(initialContent);
  const toolbarOptions = [["bold", "italic"]];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleChange = (value) => {
    setContent(value);
  };
  return (
    <div className="container">
      <h1>Text Editor</h1>
      <ReactQuill modules={module} value={content} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;
