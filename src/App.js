// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Documents from "./Pages/Documents";
import TextEditor from "./Pages/TextEditor";
import TextViewer from "./Pages/TextViewer";
import withAuthProtection from "./Components/withAuthProtection";

// const TextEditorWithAuth = withAuthProtection(TextEditor);
// const DocumentsWithAuth = withAuthProtection(Documents);
// const TextViewerWithAuth = withAuthProtection(TextViewer);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/TextEditor" element={<TextEditor />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/TextViewer" element={<TextViewer />} />
          {/* <Route path="/TextEditor" element={<TextEditorWithAuth />} />
          <Route path="/documents" element={<DocumentsWithAuth />} />
          <Route path="/TextViewer" element={<TextViewerWithAuth />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
