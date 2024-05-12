import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
const TextEditor = ({ value, onChange }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const docID = params.get("docID");
  const toolbarOptions = [["bold", "italic"]];
  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="container">
      <h1>Text Editor</h1>
      <ReactQuill modules={module} value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
