import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = ({ value, onChange }) => {
  return (
    <div className="container">
      <h1>React Quill Text Editor</h1>
      <ReactQuill value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
